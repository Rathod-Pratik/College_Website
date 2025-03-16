const express = require('express');
const Cart = require('../models/Carts');
const Product = require('../models/Products');
const User = require('../models/Users');
const CartRouter = express.Router();

// Get cart by user ID
CartRouter.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) return res.status(404).send({ error: 'Cart not found' });
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create or update cart
CartRouter.post('/', async (req, res) => {
    try {
        const { userId, items } = req.body;
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists, update it instead of creating a new one
            req.method = 'PATCH'; // Change request to PATCH
            return CartRouter.handle(req, res);
        }

        const cartTotalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
        cart = new Cart({ userId, items, cartTotalPrice });
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update cart (merged PUT and PATCH)
CartRouter.patch('/:userId', async (req, res) => {
    try {
        const { items } = req.body;
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).send({ error: 'Cart not found' });

        cart.items = items.filter(item => item.quantity > 0); // Remove items with 0 quantity
        cart.cartTotalPrice = cart.items.reduce((total, i) => total + i.totalPrice, 0);

        if (cart.items.length === 0) {
            // If cart becomes empty, delete it
            await Cart.findOneAndDelete({ userId: req.params.userId });
            return res.send({ message: 'Cart deleted as it was empty' });
        }

        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete cart
CartRouter.delete('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
        if (!cart) return res.status(404).send({ error: 'Cart not found' });
        res.send({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = CartRouter;
