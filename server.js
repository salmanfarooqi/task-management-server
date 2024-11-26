const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes');
const connectDB = require('./src/config/db');
const cors=require('cors')

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(router);


connectDB();




module.exports = app;
