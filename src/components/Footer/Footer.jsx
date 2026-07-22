import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, X } from 'lucide-react';
import './Footer.css';

const WF_KEY = 'c5909312-9ecf-44e6-99a8-74d15e66d0dc';

const JOBS = ['מלצר/ית', 'טבח/ית', 'בריסטה', 'שוטף/ת כלים', 'אחמ"ש'];

const EMPTY = { fullName: '', phone: '', email: '', role: '', notes: '' };

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function openModal() {
    setModalOpen(true);
    setForm(EMPTY);
    setSuccess(false);
  }

  function closeModal() {
    setModalOpen(false);
    setSuccess(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WF_KEY,
          name: form.fullName,
          email: form.email || 'לא צוין',
          phone: form.phone,
          subject: `[Kitchen Brasserie] מועמדות — ${form.role}`,
          message: [
            `תפקיד: ${form.role}`,
            `שם: ${form.fullName}`,
            `טלפון: ${form.phone}`,
            `אימייל: ${form.email || 'לא צוין'}`,
            form.notes ? `הערות: ${form.notes}` : '',
          ].filter(Boolean).join('\n'),
        }),
      });
      if (!r.ok) throw new Error();
      setSuccess(true);
    } catch {
      alert('אירעה שגיאה, נסו שנית.');
    }
    setLoading(false);
  }

  return (
    <footer className="footer">
      <div className="footer-inner container">

        {/* עמודה 1 - לוגו ותיאור */}
        <div className="footer-col">
          <div className="footer-logo">
            <span className="footer-logo-text">KITCHEN BRASSERIE</span>
          </div>
          <p className="footer-desc">
            מסעדת קונספט חלבית ודגים כשרה למהדרין בנס ציונה. ארוחות בוקר מפנקות, תפריט עשיר ומגשי אירוח מרשימים.
          </p>
          <p className="footer-kosher">✦ כשר בד"ץ בית יוסף</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/kitchbras" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם של Kitchen Brasserie" className="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>

        {/* עמודה 2 - קישורים */}
        <div className="footer-col">
          <h4 className="footer-heading">ניווט מהיר</h4>
          <ul className="footer-links">
            <li><Link to="/">בית</Link></li>
            <li><Link to="/menu">תפריט</Link></li>
            <li><Link to="/private-events">אירועים</Link></li>
            <li><Link to="/events">קונספטים</Link></li>
            <li><Link to="/catering">מגשי אירוח</Link></li>
            <li><Link to="/about">אודות</Link></li>
            <li><a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer">הזמנת שולחן</a></li>
            <li><a href="https://wolt.com/en/isr/rishon-lezion-hashfela-area/restaurant/kitchen-by-greg-ness-ziona" target="_blank" rel="noopener noreferrer">הזמנה דרך Wolt</a></li>
          </ul>
        </div>

        {/* עמודה 3 - פרטי קשר */}
        <div className="footer-col">
          <h4 className="footer-heading">יצירת קשר</h4>
          <div className="footer-contact">
            <div className="footer-contact-row">
              <MapPin size={15} />
              <a href="https://waze.com/ul/hsv8txue5s" target="_blank" rel="noopener noreferrer">האירוסים 53, קניותר, נס ציונה</a>
            </div>
            <div className="footer-contact-row">
              <Phone size={15} />
              <a href="tel:0733277207">073-327-7207</a>
            </div>
            <div className="footer-contact-row">
              <Phone size={15} />
              <a href="https://wa.me/972557218413" target="_blank" rel="noopener noreferrer">WhatsApp עסקי: 055-721-8413</a>
            </div>
            <div className="footer-contact-row">
              <Mail size={15} />
              <a href="mailto:Kitchbras@gmail.com">Kitchbras@gmail.com</a>
            </div>
          </div>
        </div>

        {/* עמודה 4 - שעות פעילות */}
        <div className="footer-col">
          <h4 className="footer-heading">שעות פעילות</h4>
          <div className="footer-hours">
            <div className="footer-hours-row">
              <span>ראשון – חמישי</span>
              <span>09:00 – 22:30</span>
            </div>
            <div className="footer-hours-row">
              <span>שישי</span>
              <span>09:00 – 15:00</span>
            </div>
            <div className="footer-hours-row">
              <span>שבת</span>
              <span>סגור</span>
            </div>
          </div>
        </div>

        {/* עמודה 5 - דרושים */}
        <div className="footer-col">
          <h4 className="footer-heading">דרושים</h4>
          <ul className="footer-links">
            <li>
              <button className="footer-job-btn" onClick={openModal}>
                הגש מועמדות ←
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* שורת Copyright */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 Kitchen Brasserie. כל הזכויות שמורות.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">מדיניות פרטיות</Link>
            <Link to="/accessibility">הצהרת נגישות</Link>
          </div>
        </div>
        <p className="footer-disclaimer">* התמונות באתר להמחשה בלבד ואינן מייצגות בהכרח את המוצר הסופי</p>
      </div>

      {/* מודאל מועמדות */}
      {modalOpen && (
        <div className="jobs-backdrop" onClick={closeModal}>
          <div className="jobs-modal" onClick={e => e.stopPropagation()} dir="rtl">
            <button className="jobs-modal-close" onClick={closeModal} aria-label="סגור"><X size={19} /></button>

            {success ? (
              <div className="jobs-success">
                <span className="jobs-success-icon">✓</span>
                <h3>הפרטים נשלחו!</h3>
                <p>נחזור אליך בהקדם.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop: '1.25rem' }} onClick={closeModal}>סגור</button>
              </div>
            ) : (
              <>
                <h3 className="jobs-modal-title">הגשת מועמדות</h3>
                <p className="jobs-modal-sub">נשמח לשמוע מכם — נחזור בהקדם.</p>
                <form onSubmit={handleSubmit} noValidate className="jobs-form">
                  <div className="jf-field">
                    <label>תפקיד מבוקש *</label>
                    <select name="role" value={form.role} onChange={handleChange} required>
                      <option value="">בחר/י תפקיד...</option>
                      {JOBS.map(job => <option key={job} value={job}>{job}</option>)}
                    </select>
                  </div>
                  <div className="jf-field">
                    <label>שם מלא *</label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="ישראל ישראלי" />
                  </div>
                  <div className="jf-field">
                    <label>טלפון *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="050-000-0000" />
                  </div>
                  <div className="jf-field">
                    <label>אימייל</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@mail.com" />
                  </div>
                  <div className="jf-field">
                    <label>משהו שכדאי שנדע</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="ניסיון, זמינות..." />
                  </div>
                  <button type="submit" className="btn btn-primary jf-submit" disabled={loading}>
                    {loading ? 'שולח...' : 'שלח מועמדות'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
