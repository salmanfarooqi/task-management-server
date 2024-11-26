// src/validators/taskValidator.js
const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Due date must be a valid date"
  }).transform(val => new Date(val)),

});

module.exports = { createTaskSchema };
