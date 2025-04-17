// models/NewsHeadline.js
const mongoose = require('mongoose');

const NewsHeadlineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  published_date: {
    type: String,
    required: true
  },
  fetch_time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NewsHeadline', NewsHeadlineSchema);