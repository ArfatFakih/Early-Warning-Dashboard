import React from 'react'
import { useParams } from "react-router-dom";
import { events } from "../../data/events";
import './EventDetails.css';
import Navbar from '../Navbar/Navbar';

const EventDetails = () => {
    const { id } = useParams();
    const event = events.find((e) => e.id.toString() === id);
  
    if (!event) return <div>Event not found</div>;
  
    return (
        <>
        <div className="event-details-navbar">
            <Navbar />
        </div>
        <div className="event-detail-container">
            <h2>Event Title: {event.title}</h2>
            <p className='p-container'><strong>Date:</strong> {event.date}</p>
    
            <div className="event-section">
            <p><strong>Description:</strong><br />{event.details}</p>
            </div>
    
            <div className="event-section event-impact">
            <p><strong>Key Insights:</strong></p>
            <ul>
                {event.insights?.map((insight, idx) => (
                <li key={idx}>{insight}</li>
                ))}
            </ul>
            </div>
    
            <div className="event-section event-impact-1">
            <p><strong>Related Events:</strong></p>
            <ul>
                {event.relatedEvents?.map((related, idx) => (
                <li key={idx}>Event {idx + 1}: {related}</li>
                ))}
            </ul>
            </div>
    
            <button className="download-button">Download Detailed Report</button>
    
            <div className="event-section event-map">
            <p><strong>Visual Representation:</strong></p>
            <img
                src={event.image || "/default-map.png"}
                alt="Visual representation"
                className="event-image"
            />
            </div>
        </div>
      </>
    );
}

export default EventDetails