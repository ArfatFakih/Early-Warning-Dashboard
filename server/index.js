const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});