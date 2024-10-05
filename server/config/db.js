// db.js
const { Pool } = require('pg');

const connectionString = 'postgresql://foms_db_owner:4lMBeRN9xKrP@ep-wispy-fire-a1acikbt.ap-southeast-1.aws.neon.tech/foms_db?sslmode=require';

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
