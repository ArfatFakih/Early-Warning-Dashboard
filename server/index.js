const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);