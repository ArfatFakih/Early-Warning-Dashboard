// services/newsService.js
const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const NewsHeadline = require('../models/news');

const parser = new Parser();

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

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
    
    // Save to JSON file in data directory to avoid nodemon restarts
    const newsData = newsItems.map(item => ({
      index: item.id,
      title: item.title,
      link: item.link
    }));

    fs.writeFileSync(
      path.join(dataDir, 'BBC_SCRAPE.JSON'),
      JSON.stringify(newsData, null, 4)
    );

    console.log(`News data updated at ${currentTime}`);
  } catch (error) {
    console.error(`Error fetching news: ${error.message}`);
  }
}

module.exports = { fetchNews };