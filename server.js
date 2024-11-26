const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(router);

// Connect to the database
connectDB();

// Export the app for Vercel
module.exports = app;
