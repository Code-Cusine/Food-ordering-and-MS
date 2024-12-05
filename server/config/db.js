// db.js
const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // This should generally be set to false for production
  }
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the Neon PostgreSQL database.');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
