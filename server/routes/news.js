// routes/news.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get the NewsHeadline model
const NewsHeadline = mongoose.model('NewsHeadline');

// Get all news headlines
router.get('/', async (req, res) => {
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

// Get a single news headline by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await NewsHeadline.findOne({ id: req.params.id });
    
    if (!newsItem) {
      return res.status(404).json({ message: 'News headline not found' });
    }
    
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;