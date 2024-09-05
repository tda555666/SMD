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
    // const taskId = req.body
    let userId = req.params.userId;
    try {
        // Add task to the database
        const result = await task.find({userId});
        res.send(result);
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
},

//need to get the user id and the task id
deleteTask: async (req, res) => {
    // userid from current user
    let {taskId} = req.body
    try {
        const result = await task.findByIdAndDelete(taskId);
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
},
editTask: async (req, res) => {
    const { userId, taskId } = req.params;
    const { title, content, tags } = req.body;

    try {
        const task = await task.findById(taskId);

        if (title !== undefined) task.title = title;
        if (content !== undefined) task.content = content;
        if (tags !== undefined) task.tags = tags;
        const updatedTask = await task.save();

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
}
}


module.exports = TaskController;