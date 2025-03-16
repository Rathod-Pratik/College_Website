const express = require('express');
const User = require('../models/Users');
const UserRouter = express.Router();
var jwt = require('jsonwebtoken');

// Get all users
UserRouter.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a single user using Id
UserRouter.get('/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) return res.status(404).send({ error: 'User not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new User
UserRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ error: 'Name, email, and password are required' });
        }
        const data = await User.create({ name, email, password });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a user by ID
UserRouter.patch('/:_id', async (req, res) => {
    try {
        const { name, email, password, role, address } = req.body;
        if (!name && !email && !password && !role && !address) {
            return res.status(400).send({ error: 'At least one field is required to update' });
        }
        const data = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!data) return res.status(404).send({ error: 'User not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a user by ID
UserRouter.delete('/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).send({ error: 'User not found' });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Login API
UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'Name and password are required' });
        }
        const data = await User.findOne({ email, password });

        if (data) {
            var token = jwt.sign({ ...data.toObject() }, process.env.jwtSecret);
            res.send({
                isValid: true,
                msg: "Welcome",
                token: token,
                user:data
            });
        } else {
            res.status(401).send({
                isValid: false,
                msg: "Name/password does not match"
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = UserRouter;