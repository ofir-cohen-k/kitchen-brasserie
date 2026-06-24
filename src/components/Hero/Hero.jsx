// Hero - מקטע הבאנר הגדול בדף הבית
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-label="כותרת ראשית">
      {/* שכבת רקע כהה */}
      <div className="hero-overlay"></div>

      {/* מסגרת קישוטית */}
      <div className="hero-frame"></div>

      {/* תוכן */}
      <div className="hero-content">
        <span className="hero-eyebrow">כשר חלבי ודגים · נס ציונה</span>

        {/* כותרת ראשית */}
        <h1 className="hero-title">kitchen</h1>
        <div className="hero-divider">
          <span>Brasserie</span>
        </div>

        {/* תיאור קצר */}
        <p className="hero-subtitle">
          מסעדת קונספט חלבית ודגים<br />
          ארוחות בוקר · תפריט עשיר · מגשי אירוח
        </p>

        {/* כפתורי פעולה */}
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">
            לתפריט המלא
          </Link>
          <Link to="/reservation" className="btn btn-outline hero-btn-outline">
            הזמינו שולחן
          </Link>
        </div>
      </div>

      {/* חץ גלילה */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;
