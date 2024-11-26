const express = require('express');

const dotenv = require('dotenv');

const router = require('./src/routes');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

app.use(express.json()); 


app.use(router);

connectDB()


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
