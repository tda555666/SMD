const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Your database setup
const db = require('../db/db');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

// Create task
router.post('/', verifyToken, async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        // Add task to the database
        const result = await db.query('INSERT INTO tasks (title, content, tags, user_id) VALUES (?, ?, ?, ?)', [title, content, JSON.stringify(tags), req.userId]);
        res.status(200).json({ message: 'Task added successfully', taskId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add task', error });
    }
});

module.exports = router;
