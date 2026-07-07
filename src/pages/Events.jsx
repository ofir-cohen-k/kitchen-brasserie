// ========================================
// דף אירועים - Events
// ========================================

import EventCard from '../components/EventCard/EventCard';
import PageTitle from '../components/PageTitle/PageTitle';
import { eventsData } from '../data/eventsData';
import './Events.css';

function Events() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '1.2rem 0 1.5rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים קרובים"
            subtitle="אירועים מיוחדים, ערבי שף, מוסיקה חיה ועוד"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* בנר CTA */}
      <section className="section-alt">
        <div className="container events-cta">
          <h2 className="section-title">מעוניינים לארח אירוע פרטי?</h2>
          <p className="section-subtitle">ניתן להזמין את המסעדה לאירועים פרטיים, חגיגות משפחתיות ואירועי חברה</p>
          <a href="tel:0733277207" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            צלצלו עכשיו: 073-327-7207
          </a>
        </div>
      </section>
    </main>
  );
}

export default Events;
