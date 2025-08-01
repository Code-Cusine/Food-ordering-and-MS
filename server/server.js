const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { Pool } = require('pg');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment'); // Import payment routes

const app = express();

// Database connection with better error handling
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
});

// Handle pool errors to prevent crashes
pool.on('error', (err) => {
    console.error('💥 Database pool error:', err.message);
    // Don't exit the process, just log the error
});

// Test database connection with retry logic
const testConnection = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const client = await pool.connect();
            console.log('✅ Connected to Neon database successfully!');
            client.release();
            return true;
        } catch (err) {
            console.error(`❌ Database connection attempt ${i + 1}/${retries} failed:`, err.message);
            if (i === retries - 1) {
                console.error('💀 All database connection attempts failed. Server will continue but database features may not work.');
                return false;
            }
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

// Test connection on startup
testConnection();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health endpoint to keep database active
app.get('/health', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time, 1 as status');
        res.status(200).json({ 
            status: 'Database is alive', 
            timestamp: new Date(),
            db_time: result.rows[0].current_time
        });
        // Only log if it's a manual health check, not from cron
        if (req.headers['user-agent'] && !req.headers['x-cron-ping']) {
            console.log('💚 Manual database health check at:', new Date().toLocaleString());
        }
    } catch (error) {
        console.error('❌ Database ping failed:', error.message);
        res.status(500).json({ 
            status: 'Database error', 
            error: error.message,
            timestamp: new Date()
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Routes
app.use('/api', authRoutes); // Use the auth routes
app.use('/api/orders', orderRoutes); // Use the orders routes
app.use('/api/payments', paymentRoutes); // Use the payments routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something went wrong!'); // Send a generic error message
});

// Cron job to keep Neon database active (runs every 5 minutes)
// This prevents the database from going inactive on the free tier
const keepAliveJob = cron.schedule('*/5 * * * *', async () => {
    let client;
    try {
        client = await pool.connect();
        await client.query('SELECT 1');
        console.log('🔄 Database keep-alive ping sent at:', new Date().toLocaleString());
    } catch (error) {
        console.error('❌ Database keep-alive ping failed:', error.message);
        // Try to reconnect the pool if there's a connection issue
        if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN' || error.code === 'ECONNREFUSED') {
            console.log('🔄 Attempting to refresh database connection...');
            // Give it a moment before next ping
        }
    } finally {
        if (client) {
            client.release();
        }
    }
}, {
    scheduled: false // Don't start immediately
});

const PORT = 5000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log('📊 Health check available at: http://localhost:5000/health');
    console.log('🔄 Starting database keep-alive job (every 5 minutes)...');
    
    // Start the cron job after server starts
    keepAliveJob.start();
});

// Graceful shutdown - stops cron job when server closes
process.on('SIGTERM', () => {
    console.log('🛑 Stopping database keep-alive job...');
    keepAliveJob.stop();
    server.close(() => {
        console.log('🔴 Server stopped');
        pool.end().then(() => {
            console.log('🔌 Database pool closed');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('🛑 Stopping database keep-alive job...');
    keepAliveJob.stop();
    server.close(() => {
        console.log('🔴 Server stopped');
        pool.end().then(() => {
            console.log('🔌 Database pool closed');
            process.exit(0);
        });
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process for database connection issues
});

// Export pool for use in routes
module.exports = { app, pool };
