const Order = require('../models/Order');

// Create a new order
exports.addOrder = async (req, res) => {
    try {
        const { user, products, totalPrice, address, paymentMethod, userDetails } = req.body;

        const newOrder = new Order({
            user,
            products,
            totalPrice,
            address,
            paymentMethod,
            userDetails // Include userDetails in the order schema
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};


// Get all orders for a specific user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
