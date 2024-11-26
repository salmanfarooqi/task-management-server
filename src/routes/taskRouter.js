
const express = require('express');
const taskRouter = express.Router();
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');
const validater = require('../middleware/validator');
const { createTaskSchema } = require('../schemas/taskSchema');

taskRouter.post('/', authenticate,  validater(createTaskSchema), createTask);


taskRouter.get('/', getTasks);


taskRouter.delete('/:id', authenticate, deleteTask);

module.exports = taskRouter;
