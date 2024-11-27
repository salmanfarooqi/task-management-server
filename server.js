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

app.get("/", (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f8ff;
                }
                .message {
                    text-align: center;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    font-size: 24px;
                    color: #333;
                }
                h1 {
                    color: #4CAF50;
                }
            </style>
        </head>
        <body>
            <div class="message">
                <h1>Welcome to Our Website!</h1>
                <p>We are glad to have you here. Enjoy your visit!</p>
            </div>
        </body>
        </html>
    `;
    res.send(htmlContent);
});
app.listen(5000,()=>{
    console.log("server is runing on ")
})

module.exports = app;
