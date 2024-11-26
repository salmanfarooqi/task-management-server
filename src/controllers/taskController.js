
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
   

    const tasks = await Task.find({});

   
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      error: error.message,
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
  
    res.status(500).json({ message: error.message || "unknow error" });
  }
};




const updateTaskById = async (req, res) => {
  const taskId = req.params.id; 
  const { title, description, dueDate, status } = req.body; 

  try {
   
    const task = await Task.findByPk(taskId); 

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

 
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

  
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || "unknow error" });
  }
};


module.exports = { createTask, getTasks, deleteTask,getTaskById,updateTaskById };
