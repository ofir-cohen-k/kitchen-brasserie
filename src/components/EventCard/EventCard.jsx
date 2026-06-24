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
          <Link
            to={`/reservation?event=${encodeURIComponent(event.title)}`}
            className="btn btn-primary btn-sm"
            aria-label={`הזמן מקום לאירוע ${event.title}`}
          >
            הזמן מקום
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
