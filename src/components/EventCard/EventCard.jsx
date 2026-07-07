// EventCard - כרטיס אירוע
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';
import './EventCard.css';

function EventCard({ event }) {
  // פורמט תאריך לעברית
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <article className="event-card">
      {/* תמונה */}
      <div className="event-card-img">
        <img src={event.image} alt={event.title} loading="lazy" />
        {/* תג קטגוריה */}
        <span className="event-card-label">{event.category}</span>
      </div>

      {/* תוכן */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-desc">{event.description}</p>

        {/* פרטי האירוע */}
        <div className="event-card-meta">
          <span className="event-meta-item">
            <Calendar size={13} />
            {formatDate(event.date)}
          </span>
          <span className="event-meta-item">
            <Clock size={13} />
            {event.time}
          </span>
          <span className="event-meta-item">
            <Users size={13} />
            {event.availablePlaces} מקומות פנויים
          </span>
        </div>

        {/* מחיר וכפתור */}
        <div className="event-card-footer">
          <span className="event-card-price">
            {event.price === 0 ? 'כניסה חופשית' : `₪${event.price} לאדם`}
          </span>
          <a
            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label={`הזמן מקום לאירוע ${event.title}`}
          >
            הזמן מקום
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
