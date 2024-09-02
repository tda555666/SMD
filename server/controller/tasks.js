const task = require("../model/Task");

const TaskController = {
// Create task
createTask: async (req, res) => {
    // userid from current user
    const { userId } = req.params;
    const { title, content, tags } = req.body;

    // Combine into a single object
    const combinedData = {userId,title,content,tags};
    try {
        // Add task to the database
        const result = await task.create(combinedData);
        res.status(201).json({ message: 'Task added successfully', taskId: result.insertId });
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
},
getTasks: async (req, res) => {
    // userid from current user
    let userId = req.params.userId;
    try {
        // Add task to the database
        const result = await task.find({userId});
        res.send(result);
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
},
}

module.exports = TaskController;