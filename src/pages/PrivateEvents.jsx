import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import './PrivateEvents.css';

const tiers = [
  { id: 'silver',   label: 'Silver',   cover: '/covers/cover-silver.jpg',   menu: '/covers/menu-silver.jpg'   },
  { id: 'gold',     label: 'Gold',     cover: '/covers/cover-gold.jpg',     menu: '/covers/menu-gold.jpg'     },
  { id: 'platinum', label: 'Platinum', cover: '/covers/cover-platinum.jpg', menu: '/covers/menu-platinum.jpg' },
  { id: 'brunch',   label: 'Brunch',   cover: '/covers/cover-brunch.jpg',   menu: '/covers/menu-brunch.jpg'   },
];

function MenuModal({ tier, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="סגור">✕</button>
        <img src={tier.menu} alt={`תפריט ${tier.label}`} className="modal-img" />
      </div>
    </div>
  );
}

function PrivateEvents() {
  const [openTier, setOpenTier] = useState(null);

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, אירועי חברה ועוד — לחצו על מסלול לצפייה בתפריט"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="tiers-row">
            {tiers.map(t => (
              <button
                key={t.id}
                className="tier-card-btn"
                onClick={() => setOpenTier(t)}
                aria-label={`פתח תפריט ${t.label}`}
              >
                <img src={t.cover} alt={t.label} className="tier-card-img" />
                <div className="tier-card-overlay">
                  <span className="tier-card-label">{t.label}</span>
                  <span className="tier-card-cta">לחץ לתפריט ←</span>
                </div>
              </button>
            ))}
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

      {openTier && <MenuModal tier={openTier} onClose={() => setOpenTier(null)} />}
    </main>
  );
}

export default PrivateEvents;
