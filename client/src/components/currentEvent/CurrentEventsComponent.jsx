import React from "react";
import { Link } from "react-router-dom";
import { events } from "../../data/events";
import './CurrentEventsComponent.css';

const CurrentEventsComponent = () => {
  return (
    <div className="events-container">
      <h2>Summary of Current Events</h2>
      {events.map((event) => (
        <div className="event-block" key={event.id}>
          <Link to={`/event/${event.id}`} className="event-title">
            {event.title}
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
