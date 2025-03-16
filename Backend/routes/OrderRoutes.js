const express = require('express');
const Order = require('../models/Orders');
const Product = require('../models/Products');
const User = require('../models/Users');
const OrderRouter = express.Router();

// Get all orders
OrderRouter.get('/', async (req, res) => {
    try {
        const data = await Order.find().populate('userId', 'name email').populate('items.productId', 'name price');
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a single order by ID
OrderRouter.get('/:id', async (req, res) => {
    try {
        const data = await Order.findById(req.params.id).populate('userId', 'name email').populate('items.productId', 'name price');
        if (!data) return res.status(404).send({ error: 'Order not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new order
OrderRouter.post('/', async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
        if (!userId || !items || !totalAmount) {
            return res.status(400).send({ error: 'User ID, items, and total amount are required' });
        }
        const userExists = await User.findById(userId);
        if (!userExists) return res.status(404).send({ error: 'User not found' });

        for (let item of items) {
            let productExists = await Product.findById(item.productId);
            if (!productExists) return res.status(404).send({ error: `Product ${item.productId} not found` });
        }

        const data = await Order.create({ userId, items, totalAmount, shippingAddress, paymentMethod });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update an order by ID
OrderRouter.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).send({ error: 'Status field is required' });
        }
        const data = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).send({ error: 'Order not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an order by ID
OrderRouter.delete('/:id', async (req, res) => {
    try {
        const data = await Order.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).send({ error: 'Order not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = OrderRouter;
