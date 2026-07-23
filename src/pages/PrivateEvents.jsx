import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle/PageTitle';
import './PrivateEvents.css';

const WF_KEY = 'c5909312-9ecf-44e6-99a8-74d15e66d0dc';

const tiers = [
  { id: 'silver',   label: 'Silver',   cover: '/covers/cover-silver.jpg',   menu: '/covers/menu-silver.jpg'   },
  { id: 'gold',     label: 'Gold',     cover: '/covers/cover-gold.jpg',     menu: '/covers/menu-gold.jpg'     },
  { id: 'platinum', label: 'Platinum', cover: '/covers/cover-platinum.jpg', menu: '/covers/menu-platinum.jpg' },
  { id: 'brunch',   label: 'Brunch',   cover: '/covers/cover-brunch.jpg',   menu: '/covers/menu-brunch.jpg'   },
];

const WHATSAPP_HREF = 'https://api.whatsapp.com/send?phone=972557218413&text=היי,+אנחנו+מעוניינים+לקיים+אירוע+פרטי+בקיטשן,+נשמח+לקבל+פרטים.';

const WA_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EMPTY_FORM = {
  fullName: '', phone: '', email: '',
  eventType: '', eventDate: '', guestCount: '',
  menuTier: '', notes: '',
};

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
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const message = [
        `סוג אירוע: ${form.eventType || 'לא צוין'}`,
        `תאריך: ${form.eventDate || 'לא צוין'}`,
        `מספר משתתפים: ${form.guestCount || 'לא צוין'}`,
        `מסלול תפריט: ${form.menuTier || 'טרם הוחלט'}`,
        form.notes ? `הערות: ${form.notes}` : '',
      ].filter(Boolean).join('\n');

      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WF_KEY,
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: `[Kitchen Brasserie] פנייה לאירוע פרטי — ${form.eventType || 'אירוע'}`,
          message,
        }),
      });
      if (!r.ok) throw new Error();
      setSuccess(true);
      setForm(EMPTY_FORM);
    } catch {
      alert('אירעה שגיאה, נסו שנית או פנו בוואטסאפ.');
    }
    setLoading(false);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <Helmet>
        <title>אירועים פרטיים | Kitchen Brasserie — בר מצווה, ימי הולדת ואירועי חברה</title>
        <meta name="description" content="אירועים פרטיים ב-Kitchen Brasserie — בר/בת מצווה, ימי הולדת, אירועי חברה ועוד. חבילות Silver, Gold ו-Platinum. מסעדה כשרה בנס ציונה." />
        <link rel="canonical" href="https://kitchenbrasserie.com/private-events" />
      </Helmet>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, אירועי חברה ועוד — לחצו על מסלול לצפייה בתפריט"
          />
        </div>
      </div>

      {/* ===== מבוא + כרטיסי תפריט ===== */}
      <section className="section" style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="private-events-intro">
            <span className="section-eyebrow">Kitchen Brasserie</span>
            <h2 className="section-title private-events-intro-title">האירוע שלכם מתחיל כאן</h2>
            <div className="ornament"><span>✦</span></div>
            <p className="private-events-tagline">קולינריה מוקפדת, אווירה אלגנטית ושירות מכל הלב.</p>
            <p className="private-events-body">
              ב־Kitchen Brasserie תוכלו לחגוג אירועי בוטיק עד 60 אורחים, אירועים משפחתיים ועסקיים באווירה ייחודית,
              עם מגוון תפריטי אירוח עשירים ואפשרות לבניית תפריט בהתאמה אישית.
            </p>
            <p className="private-events-cta-line">בחרו את התפריט המתאים לכם והתחילו לתכנן את האירוע שלכם.</p>
            <div className="private-events-arrow"><span>▼</span></div>
          </div>

          <div className="tiers-row">
            {tiers.map(t => (
              <button key={t.id} className="tier-card-btn" onClick={() => setOpenTier(t)} aria-label={`פתח תפריט ${t.label}`}>
                <img src={t.cover} alt={t.label} className="tier-card-img" />
                <div className="tier-card-overlay">
                  <span className="tier-card-label">{t.label}</span>
                  <span className="tier-card-cta">לחץ לתפריט ←</span>
                </div>
              </button>
            ))}
          </div>

          <div className="private-events-unified-cta">
            <p className="private-events-below-title">מעוניינים בתפריט בהתאמה אישית?</p>
            <p className="private-events-below-body">נבנה עבורכם חוויה קולינרית המותאמת בדיוק לאופי האירוע, להעדפות ולתקציב שלכם.</p>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary whatsapp-btn">
              {WA_SVG}
              שלחו לנו וואטסאפ
            </a>
          </div>
        </div>
      </section>

      {/* ===== טופס ליד ===== */}
      <section className="section-alt event-form-section">
        <div className="container">
          <div className="event-form-header">
            <div className="event-form-or"><span>או</span></div>
            <h2 className="section-title event-form-main-title">השאירו פרטים</h2>
            <p className="event-form-sub-title">ונחזור אליכם בהקדם האפשרי</p>
            <div className="ornament"><span>✦</span></div>
          </div>

          {success ? (
            <div className="event-form-success">
              <span className="event-form-success-icon">✓</span>
              <p>קיבלנו את פנייתכם! נציג שלנו יצור איתכם קשר בהקדם.</p>
              <button className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }} onClick={() => setSuccess(false)}>
                שליחת פנייה נוספת
              </button>
            </div>
          ) : (
            <form className="event-form" onSubmit={handleSubmit} noValidate dir="rtl">
              <div className="event-form-grid">
                <div className="event-form-field">
                  <label>שם מלא *</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="ישראל ישראלי" />
                </div>
                <div className="event-form-field">
                  <label>טלפון *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="050-000-0000" />
                </div>
                <div className="event-form-field">
                  <label>אימייל *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="example@mail.com" />
                </div>
                <div className="event-form-field">
                  <label>סוג האירוע</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange}>
                    <option value="">בחרו סוג אירוע</option>
                    <option>בר/בת מצווה</option>
                    <option>ברית/בריתה</option>
                    <option>יום הולדת</option>
                    <option>אירוע חברה</option>
                    <option>מותאם אישית</option>
                    <option>אחר</option>
                  </select>
                </div>
                <div className="event-form-field">
                  <label>תאריך האירוע</label>
                  <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
                </div>
                <div className="event-form-field">
                  <label>מספר משתתפים</label>
                  <input type="number" name="guestCount" value={form.guestCount} onChange={handleChange} min="1" placeholder="כמה אורחים?" />
                </div>
                <div className="event-form-field">
                  <label>מסלול תפריט</label>
                  <select name="menuTier" value={form.menuTier} onChange={handleChange}>
                    <option value="">טרם החלטתי</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Brunch</option>
                    <option>מותאם אישית</option>
                  </select>
                </div>
                <div className="event-form-field event-form-full">
                  <label>הערות נוספות</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="בקשות מיוחדות, שאלות, דרישות תזונתיות..." />
                </div>
              </div>
              <div className="event-form-footer">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'שולח...' : 'שליחת פנייה'}
                </button>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-outline whatsapp-btn">
                  {WA_SVG}
                  או שלחו וואטסאפ
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* קישורים פנימיים */}
      <section className="section-alt" style={{ padding: '2rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginBottom: '1rem' }}>
            מחפשים גם מגשי אירוח לאירוע? <Link to="/catering" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>לעמוד מגשי האירוח ←</Link>
          </p>
        </div>
      </section>

      {openTier && <MenuModal tier={openTier} onClose={() => setOpenTier(null)} />}
    </main>
  );
}

export default PrivateEvents;
