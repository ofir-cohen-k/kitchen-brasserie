// ========================================
// ׳“׳£ ׳׳™׳¨׳•׳¢׳™׳ - Events
// ========================================

import EventCard from '../components/EventCard/EventCard';
import PageTitle from '../components/PageTitle/PageTitle';
import { eventsData } from '../data/eventsData';
import './Events.css';

function Events() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="׳׳™׳¨׳•׳¢׳™׳"
            title="׳׳™׳¨׳•׳¢׳™׳ ׳§׳¨׳•׳‘׳™׳"
            subtitle="׳׳™׳¨׳•׳¢׳™׳ ׳׳™׳•׳—׳“׳™׳, ׳¢׳¨׳‘׳™ ׳©׳£, ׳׳•׳¡׳™׳§׳” ׳—׳™׳” ׳•׳¢׳•׳“"
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

      {/* ׳‘׳ ׳¨ CTA */}
      <section className="section-alt">
        <div className="container events-cta">
          <h2 className="section-title">׳׳¢׳•׳ ׳™׳™׳ ׳™׳ ׳׳׳¨׳— ׳׳™׳¨׳•׳¢ ׳₪׳¨׳˜׳™?</h2>
          <p className="section-subtitle">׳ ׳™׳×׳ ׳׳”׳–׳׳™׳ ׳׳× ׳”׳׳¡׳¢׳“׳” ׳׳׳™׳¨׳•׳¢׳™׳ ׳₪׳¨׳˜׳™׳™׳, ׳—׳’׳™׳’׳•׳× ׳׳©׳₪׳—׳×׳™׳•׳× ׳•׳׳™׳¨׳•׳¢׳™ ׳—׳‘׳¨׳”</p>
          <a href="tel:0733277207" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            ׳¦׳׳¦׳׳• ׳¢׳›׳©׳™׳•: 073-327-7207
          </a>
        </div>
      </section>
    </main>
  );
}

export default Events;
