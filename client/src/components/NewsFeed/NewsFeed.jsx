import React from 'react'
import './NewsFeed.css'


const eventData = [
    {
      icon: '🔴',
      text: 'Emergency declared in City X due to flooding.',
    },
    {
      icon: '🟡',
      text: 'Caution advised in Region Y for potential storms.',
    },
    {
      icon: '🟢',
      text: 'Stability report shows positive growth in Region Z.',
    },
  ];

const NewsFeed = () => {
    return (
        <div className="news-detail-container">
          {[...Array(5)].map((_, idx) => (
            <div className="news-impact" key={idx}>
              <ul>
                {eventData.map((item, index) => (
                  <li key={index}>
                    <span className="news-icon">{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
}

export default NewsFeed