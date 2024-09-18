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
    const { taskId } = req.params;

    try {
        const result = await task.findByIdAndDelete(taskId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
editTask: async (req, res) => {
    const { taskId } = req.params;
    const { title, content, tags } = req.body;

    try {
        const tasked = await task.findById(taskId); 

        if (!tasked) {
            return res.status(404).json({ message: 'Task not found' }); 
        }

        // Update fields only if they are defined
        if (title !== undefined) tasked.title = title;
        if (content !== undefined) tasked.content = content;
        if (tags !== undefined) tasked.tags = tags;

        const updatedTask = await tasked.save(); 

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
},
getTask: async( req, res) => {
    const { taskId } = req.params ;
    try{
        const result = task.findById(taskId);
        res.send(result);
    }catch (error) {
    res.status(500).json({ message:  error.message });
}
}
}


module.exports = TaskController;