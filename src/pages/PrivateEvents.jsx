import { useState } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import './PrivateEvents.css';

const tiers = [
  { id: 'silver',   label: 'Silver',   file: '/מנות קיטשן/silver_1.pdf' },
  { id: 'gold',     label: 'Gold',     file: '/מנות קיטשן/gold.pdf' },
  { id: 'platinum', label: 'Platinum', file: '/מנות קיטשן/platinum_2.pdf' },
  { id: 'brunch',   label: 'Brunch',   file: '/מנות קיטשן/אירועי בוקר.pdf' },
];

function PrivateEvents() {
  const [active, setActive] = useState('silver');
  const current = tiers.find(t => t.id === active);

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, אירועי חברה ועוד — בחרו מסלול וגלו מה כלול"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* לשוניות בחירת מסלול */}
          <div className="tier-tabs">
            {tiers.map(t => (
              <button
                key={t.id}
                className={`tier-tab tier-tab--${t.id}${active === t.id ? ' tier-tab--active' : ''}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* מציג PDF */}
          <div className="pdf-viewer-wrap">
            <iframe
              key={current.file}
              src={current.file}
              className="pdf-viewer"
              title={`תפריט ${current.label}`}
            />
            <a
              href={current.file}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-open-link"
            >
              פתח בחלון חדש ↗
            </a>
          </div>

        </div>
      </section>

      <section className="section-alt">
        <div className="container private-events-cta">
          <h2 className="section-title">רוצים לשמוע עוד?</h2>
          <p className="section-subtitle">צרו קשר ונבנה יחד את האירוע המושלם עבורכם</p>
          <a href="tel:0733277207" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            צלצלו עכשיו: 073-327-7207
          </a>
        </div>
      </section>
    </main>
  );
}

export default PrivateEvents;
