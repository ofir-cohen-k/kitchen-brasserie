// Footer - כותרת תחתונה
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import './Footer.css';

function Footer() {
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
        </div>

        {/* עמודה 2 - קישורים */}
        <div className="footer-col">
          <h4 className="footer-heading">ניווט מהיר</h4>
          <ul className="footer-links">
            <li><Link to="/">בית</Link></li>
            <li><Link to="/menu">תפריט</Link></li>
            <li><Link to="/events">אירועים</Link></li>
            <li><Link to="/catering">מגשי אירוח</Link></li>
            <li><Link to="/about">אודות</Link></li>
            <li><Link to="/reservation">הזמנת שולחן</Link></li>
            <li>
              <a href="https://wolt.com/en/isr/rishon-lezion-hashfela-area/restaurant/kitchen-by-greg-ness-ziona" target="_blank" rel="noopener noreferrer">
                הזמנה דרך Wolt
              </a>
            </li>
          </ul>
        </div>

        {/* עמודה 3 - פרטי קשר */}
        <div className="footer-col">
          <h4 className="footer-heading">יצירת קשר</h4>
          <div className="footer-contact">
            <div className="footer-contact-row">
              <MapPin size={15} />
              <a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer">האירוסים 53, קניותר, נס ציונה</a>
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
              <span>09:00 – 21:30</span>
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

      </div>

      {/* שורת Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Kitchen Brasserie. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}

export default Footer;
