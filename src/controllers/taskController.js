
const Task = require('../models/task');



const createTask = async (req, res) => {
  try {
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


const getTasks = async (req, res) => {
  try {
    const { search, status, dueDate } = req.query;

    let query = Task.find();

    if (search) {
      const searchRegex = new RegExp(search, 'i');  
      query = query.or([
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ]);
    }


    if (status) {
      query = query.where('status').equals(status);
    }

    if (dueDate) {
      
      const validDate = new Date(dueDate);
      if (!isNaN(validDate)) {
        query = query.where('dueDate').equals(validDate);
      }
    }

    const tasks = await query.exec();

   
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      error: 'An error occurred while retrieving tasks',
    });
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;



  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; 

    const task = await Task.findByPk(taskId);


    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }


    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
  
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createTask, getTasks, deleteTask,getTaskById };
