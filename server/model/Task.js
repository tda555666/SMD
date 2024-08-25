const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
        },
    content: {
        type: String, 
        required: true },
    tags: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;