const express=require('express')
const userRouter = require('./Auth')
const taskRouter = require('./taskRouter')
const router=express.Router()
router.use('/user',userRouter)
router.use('/task',taskRouter)

module.exports=router