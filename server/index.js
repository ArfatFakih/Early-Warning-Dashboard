const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const mongoose = require('mongoose');
const Parser = require('rss-parser');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// Import existing routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const predictRoute = require('./routes/model');

const PORT = process.env.PORT || 5000;
const parser = new Parser();

// Connect to database
connectDb();

// Create news headline schema
const NewsHeadlineSchema = new mongoose.Schema({
  id: Number,
  title: String,
  link: String,
  published_date: String,
  fetch_time: String
});

// Create model (only if it doesn't already exist)
const NewsHeadline = mongoose.models.NewsHeadline || 
                      mongoose.model('NewsHeadline', NewsHeadlineSchema);

// Fetch news function
async function fetchNews() {
  try {
    const feed = await parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml');
    const currentTime = new Date().toISOString();

    // Clear existing entries
    await NewsHeadline.deleteMany({});

    // Prepare news items for insertion
    const newsItems = feed.items.slice(0, 10).map((item, i) => ({
      id: i + 1,
      title: item.title,
      link: item.link,
      published_date: item.pubDate || currentTime,
      fetch_time: currentTime
    }));

    // Insert new headlines
    await NewsHeadline.insertMany(newsItems);
    
    // Also save to JSON file as backup
    const newsData = newsItems.map(item => ({
      index: item.id,
      title: item.title,
      link: item.link
    }));

    fs.writeFileSync(
      path.join(__dirname, 'BBC_SCRAPE.JSON'),
      JSON.stringify(newsData, null, 4)
    );

    console.log(`News data updated at ${currentTime}`);
  } catch (error) {
    console.error(`Error fetching news: ${error.message}`);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize news data and set up cron job
// Fetch news on server start
fetchNews();
// Schedule news fetching every 15 minutes
cron.schedule('*/15 * * * *', fetchNews);

// Create news API route
app.get('/api/news', async (req, res) => {
  try {
    const newsItems = await NewsHeadline.find().sort({ id: 1 });
    const firstItem = await NewsHeadline.findOne().sort({ id: 1 });
    
    res.json({
      news: newsItems,
      last_updated: firstItem ? firstItem.fetch_time : 'N/A',
      current_time: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Existing routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/model', predictRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});