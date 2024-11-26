
const express = require('express');
const taskRouter = express.Router();
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

taskRouter.post('/', authenticate, createTask);


taskRouter.get('/', getTasks);


taskRouter.delete('/:id', authenticate, deleteTask);

module.exports = taskRouter;
