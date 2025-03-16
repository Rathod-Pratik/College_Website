const express = require('express');
const Product = require('../models/Products');
const Category = require('../models/Categories');
const ProductRouter = express.Router();

// Get all products
ProductRouter.get('/', async (req, res) => {
    try {
        const data = await Product.find().populate('categoryId');
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a single product by ID
ProductRouter.get('/:id', async (req, res) => {
    try {
        const data = await Product.findById(req.params.id).populate('categoryId');
        if (!data) return res.status(404).send({ error: 'Product not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new product
ProductRouter.post('/', async (req, res) => {
    try {
        const { name, price, categoryId, stock } = req.body;
        if (!name || !price || !categoryId || !stock) {
            return res.status(400).send({ error: 'Name, price, categoryId, and stock are required' });
        }
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).send({ error: 'Category not found' });
        
        const product = await Product.create({ name, price, categoryId, stock });
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a product by ID
ProductRouter.patch('/:id', async (req, res) => {
    try {
        const { name, price, categoryId, stock } = req.body;
        if (!name && !price && !categoryId && !stock) {
            return res.status(400).send({ error: 'At least one field is required to update' });
        }
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) return res.status(404).send({ error: 'Category not found' });
        }
        
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).send({ error: 'Product not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a product by ID
ProductRouter.delete('/:id', async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).send({ error: 'Product not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = ProductRouter;
