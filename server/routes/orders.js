const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Function to generate a random ID
function generateId(prefix) {
    return `${prefix}${Math.random().toString(36).substr(2, 8)}`;
}

// Create a new order
router.post('/', async (req, res) => {
    const {
        custname,
        contactno,
        ordername,
        quantity,
        price,
        foodtype
    } = req.body;

    try {
        // Start a transaction
        await db.query('BEGIN');

        // Check if customer exists and get or create customer
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

            // Update visits
            await db.query(
                'UPDATE CUSTOMER SET noofvisits = $1 WHERE custid = $2',
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

        // Create order
        const orderid = generateId('O');
        const orderResult = await db.query(
            `INSERT INTO orders 
            (orderid, ordername, time_of_order, quantity, price, foodtype) 
            VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) 
            RETURNING orderid, time_of_order`,
            [orderid, ordername, quantity, price, foodtype]
        );

        await db.query('COMMIT');

        res.status(201).json({
            orderid: orderResult.rows[0].orderid,
            ordertime: orderResult.rows[0].time_of_order,
            custid,
            visits,
            message: 'Order created successfully'
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
});

module.exports = router;
