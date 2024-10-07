const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes); // Use the auth routes
app.use('/api/orders', orderRoutes); // Use the orders routes

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).send('Something went wrong!'); // Send a generic error message
});

const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
