// src/controllers/taskController.js
const Task = require('../models/task');


// Create a new task
const createTask = async (req, res) => {
  try {
    // const validatedData = createTaskSchema.parse(req.body);
    const {title,description,dueDate}=req.body
        const userId=req.user.userId
        console.log("user id",req.user)
    const newTask = new Task({
      title,
      description,
      dueDate,
      userId
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, deleteTask };
