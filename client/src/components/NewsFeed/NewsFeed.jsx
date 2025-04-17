import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css'

const NewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/news');
      setNewsItems(response.data.news);
      setLastUpdated(response.data.last_updated);
      setTimeLeft(900); // Reset countdown timer
      setError(null);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Set up automatic refresh every 15 minutes
    const refreshInterval = setInterval(fetchNews, 15 * 60 * 1000);
    
    // Set up countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) return 900;
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>BBC News Headlines</h1>
        <div className="news-meta">
          <p className="last-updated">
            {lastUpdated && (
              <span>Last updated: {formatDate(lastUpdated)}</span>
            )}
          </p>
          <div className="news-controls">
            <p className="next-update">Next update in: {formatTime(timeLeft)}</p>
            <button onClick={fetchNews} className="refresh-button">
              Refresh Now
            </button>
          </div>
        </div>
      </div>

      <div className="news-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-text">Loading news...</div>
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : (
          <div className="news-grid">
            {newsItems.map((item) => (
              <div key={item.id} className="news-item">
                <div className="news-item-header">
                  <div className="news-index">{item.id}</div>
                  <h2 className="news-title">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </h2>
                </div>
                <div className="news-date">
                  Published: {formatDate(item.published_date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="news-footer">
        <p>Data sourced from BBC News RSS</p>
      </div>
    </div>
  );
}

export default NewsFeed