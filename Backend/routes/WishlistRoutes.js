const express = require('express');
const Wishlist = require('../models/Wishists');
const Product = require('../models/Products');
const WishlistRouter = express.Router();

// Get all wishlists
WishlistRouter.get('/', async (req, res) => {
    try {
        const data = await Wishlist.find().populate('userId').populate('productId');
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get wishlist by user ID
WishlistRouter.get('/:userId', async (req, res) => {
    try {
        const data = await Wishlist.find({ userId: req.params.userId }).populate('productId');
        if (!data.length) return res.status(404).send({ error: 'No wishlist found for this user' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add a product to wishlist
WishlistRouter.post('/', async (req, res) => {
    try {
        const { _id, product } = req.body;
        if (!_id || !product) {
            return res.status(400).send({ error: 'User ID and Product ID are required' });
        }
        const wishlist = new Wishlist({ userId:_id, product });
        await wishlist.save();
        res.send(wishlist);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a wishlist entry
WishlistRouter.patch('/:id', async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).send({ error: 'Product ID is required to update' });
        }
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ error: 'Product not found' });
        
        const data = await Wishlist.findByIdAndUpdate(req.params.id, { productId }, { new: true });
        if (!data) return res.status(404).send({ error: 'Wishlist entry not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Remove a product from wishlist
WishlistRouter.delete('/:userId/:productId', async (req, res) => {
    try {
        const data = await Wishlist.findOneAndDelete({ userId: req.params.userId, productId: req.params.productId });
        if (!data) return res.status(404).send({ error: 'Wishlist item not found' });
        res.send({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = WishlistRouter;
