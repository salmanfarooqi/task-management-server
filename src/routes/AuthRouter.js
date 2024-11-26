const express = require('express');
const { createUser, login } = require('../controllers/AuthController');
const validater = require('../middleware/validator');
const userSchema = require('../schemas/UserSchema'); 
const userRouter = express.Router();


userRouter.post('/register', validater(userSchema), createUser);
userRouter.post('/login', login);

module.exports = userRouter;
