const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Function to generate a random ID
function generateId(prefix) {
    return `${prefix}${Math.random().toString(36).substr(2, 8)}`;
}

// Create a new payment
router.post('/', async (req, res) => {
    const {
        orderid,
        custid,
        grandtotal,
        paymenttype,   // Example: 'Credit Card', 'Debit Card', 'Cash', 'UPI'
        paymentstatus  // Example: 'Pending', 'Completed', 'Failed'
    } = req.body;

    if (!orderid || !custid || !grandtotal || !paymenttype || !paymentstatus) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Start a transaction
        await db.query('BEGIN');

        // Check if the order and customer exist
        const orderResult = await db.query('SELECT * FROM orders WHERE orderid = $1 AND custid = $2', [orderid, custid]);
        if (orderResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ message: 'Order or Customer not found' });
        }

        // Generate a unique payment ID
        const paymentid = generateId('P');
        const timeOfPayment = new Date();  // Capture the current timestamp

        // Insert the payment record into the payment table
        await db.query(
            `INSERT INTO payment (paymentid, orderid, custid, grandtotal, paymentstatus, paymenttype, paymentdate) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [paymentid, orderid, custid, grandtotal, paymentstatus, paymenttype, timeOfPayment]
        );

        // Commit the transaction
        await db.query('COMMIT');

        res.status(201).json({
            message: 'Payment recorded successfully',
            paymentid,
            paymentstatus,
            paymenttype,
            grandtotal
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await db.query('ROLLBACK');
        console.error('Payment processing error:', error);
        res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
});

module.exports = router;
