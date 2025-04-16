const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const predictRoute = require('./routes/model');

const PORT = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/model', predictRoute);