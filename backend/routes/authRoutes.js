const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists with this email.' });

    const newUser = new User({ name, email, password, role: 'customer' });
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ message: 'Logged in successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Profile Update
router.put('/profile', async (req, res) => {
  try {
    const { userId, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated in MongoDB!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Users (Admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User (Admin)
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted from database.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;