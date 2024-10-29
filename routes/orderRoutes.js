const express = require('express');
const { addOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// Route to create a new order
router.post('/addOrder', addOrder);

// Route to fetch all orders for a specific user
router.get('/getUserOrders/:userId', getUserOrders);

module.exports = router;
