const express = require('express');
const Feedback = require('../models/Feedbacks');
const Product = require('../models/Products');
const User = require('../models/Users');
const FeedbackRouter = express.Router();

// Get all feedbacks
FeedbackRouter.get('/', async (req, res) => {
    try {
        const data = await Feedback.find().populate('userId').populate('productId');
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get feedbacks by product ID
FeedbackRouter.get('/product/:productId', async (req, res) => {
    try {
        const data = await Feedback.find({ productId: req.params.productId }).populate('userId');
        if (!data.length) return res.status(404).send({ error: 'No feedback found for this product' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get feedbacks by user ID
FeedbackRouter.get('/user/:userId', async (req, res) => {
    try {
        const data = await Feedback.find({ userId: req.params.userId }).populate('productId');
        if (!data.length) return res.status(404).send({ error: 'No feedback found for this user' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new feedback
FeedbackRouter.post('/', async (req, res) => {
    try {
        const { userId, productId, rating, review } = req.body;
        if (!userId || !productId || !rating) {
            return res.status(400).send({ error: 'User ID, Product ID, and Rating are required' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ error: 'Rating must be between 1 and 5' });
        }
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).send({ error: 'User not found' });
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ error: 'Product not found' });
        
        const feedback = new Feedback({ userId, productId, rating, review });
        await feedback.save();
        res.send(feedback);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a feedback by ID
FeedbackRouter.patch('/:id', async (req, res) => {
    try {
        const { rating, review } = req.body;
        if (!rating && !review) {
            return res.status(400).send({ error: 'At least one field (rating or review) is required to update' });
        }
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).send({ error: 'Rating must be between 1 and 5' });
        }
        
        const data = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).send({ error: 'Feedback not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a feedback by ID
FeedbackRouter.delete('/:id', async (req, res) => {
    try {
        const data = await Feedback.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).send({ error: 'Feedback not found' });
        res.send({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = FeedbackRouter;