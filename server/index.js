const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const cron = require('node-cron');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const predictRoute = require('./routes/model');
const newsRoutes = require('./routes/news'); 
const newsService = require('./service/newsService'); 

const PORT = process.env.PORT || 5000;


connectDb();

app.use(cors());
app.use(express.json());


try {
  newsService.fetchNews();
  cron.schedule('0 * * * *', newsService.fetchNews);
} catch (error) {
  console.error("Error setting up news service:", error);
}

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/model', predictRoute);
app.use('/api/news', newsRoutes); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});