const express = require('express');
const Category = require('../models/Categories');
const CategoryRouter = express.Router();

// Get all categories
CategoryRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a single category by ID
CategoryRouter.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send({ error: 'Category not found' });
        res.send(category);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new category
CategoryRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).send({ error: 'Name is required' });
        }
        const category = await Category.create({ name, description });
        res.send(category);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a category by ID
CategoryRouter.patch('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name && !description) {
            return res.status(400).send({ error: 'At least one field is required to update' });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).send({ error: 'Category not found' });
        res.send(category);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a category by ID
CategoryRouter.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send({ error: 'Category not found' });
        res.send(category);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = CategoryRouter;
