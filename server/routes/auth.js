// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Make sure this is the correct path to your db connection
const router = express.Router();

// Register a New User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';

    // Insert the user into the database
    const result = await db.query(sql, [name, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error); // Log any unexpected errors
    if (error.code === '23505') { // Unique violation error
      return res.status(400).json({ message: 'Email already in use.' });
    }
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  const sql = 'SELECT * FROM users WHERE email = $1';
  try {
    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (err) {
    console.error('Login error:', err); // Improved error logging
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
