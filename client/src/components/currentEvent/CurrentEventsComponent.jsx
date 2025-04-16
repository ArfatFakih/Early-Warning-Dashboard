import React from "react";
import { Link } from "react-router-dom";
import { events } from "../../data/events";
import './CurrentEventsComponent.css';

const CurrentEventsComponent = () => {
  return (
    <div className="events-container">
      <h2>Summary of Current Events</h2>
      {events.map((event, index) => (
        <div
          className={`event-block ${index % 2 === 0 ? 'odd' : 'even'}`}
          key={event.id}
        >
          <Link to={`/event/${event.id}`} className="event-title">
            {index % 2 === 0 ? (
              <>
                {event.title}
                <span className="arrow">➜</span>
              </>
            ) : (
              <>
                <span className="arrow flip">➜</span>
                {event.title}
              </>
            )}
          </Link>
          <p className="event-details">
            {event.details}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CurrentEventsComponent;
