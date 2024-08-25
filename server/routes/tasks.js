

// Your database setup
const db = require('../db/db');

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
