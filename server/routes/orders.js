const express = require('express');
const router = express.Router();
const db = require('../config/db');
const paymentRoutes = require('./payment'); // Ensure payments route is imported

// Function to generate a random ID
function generateId(prefix) {
    return `${prefix}${Math.random().toString(36).substr(2, 8)}`;
}

// Create a new order
router.post('/', async (req, res) => {
    const {
        custname,
        contactno,
        items,  // This is an array of items
        paymenttype  // Payment type can be included in the order request
    } = req.body;

    if (!custname || !contactno || !items || items.length === 0) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Start a transaction
        await db.query('BEGIN');

        // Check if the customer exists, or insert a new one
        let customerResult = await db.query(
            'SELECT * FROM customer WHERE contactno = $1',
            [contactno]
        );

        let custid;
        let visits = 1;

        if (customerResult.rows.length > 0) {
            // Existing customer
            const customer = customerResult.rows[0];
            custid = customer.custid;
            visits = customer.noofvisits + 1;

            // Update visits for the existing customer
            await db.query(
                'UPDATE customer SET noofvisits = $1 WHERE custid = $2',
                [visits, custid]
            );
        } else {
            // New customer
            custid = generateId('C');
            await db.query(
                'INSERT INTO customer (custid, custname, noofvisits, contactno) VALUES ($1, $2, $3, $4)',
                [custid, custname, 1, contactno]
            );
        }

        // Generate a unique orderid for the whole order
        const orderid = generateId('O');

        // Insert the order into the orders table (one record per order)
        const timeOfOrder = new Date();  // Capture the current timestamp
        await db.query(
            'INSERT INTO orders (orderid, custid, time_of_order) VALUES ($1, $2, $3)',
            [orderid, custid, timeOfOrder]
        );

        // Insert each item into the order_items table
        for (const item of items) {
            console.log('Inserting item:', item);  // Debugging

            await db.query(
                `INSERT INTO order_items 
                (orderid, itemid, quantity, price, foodtype, custid, itemname) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [orderid, item.itemid, item.quantity, item.price, item.foodtype, custid, item.itemname]
            );
        }

        // If the payment type is cash, process the payment here
        if (paymenttype === 'Cash') {
            const grandtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
            const paymentstatus = 'Completed'; // Assuming cash payment is immediately completed

            // Call the payment route directly
            const paymentResponse = await db.query(
                `INSERT INTO payment (paymentid, orderid, custid, grandtotal, paymentstatus, paymenttype, paymentdate) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [generateId('P'), orderid, custid, grandtotal, paymentstatus, paymenttype, new Date()]
            );

            if (!paymentResponse) {
                await db.query('ROLLBACK');
                return res.status(500).json({ message: 'Error recording payment for cash order' });
            }
        }

        // Commit the transaction
        await db.query('COMMIT');

        res.status(201).json({
            message: 'Order created successfully',
            custid,
            orderid,
            visits
        });
    } catch (error) {
        // Rollback the transaction in case of an error
        await db.query('ROLLBACK');
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

module.exports = router;
