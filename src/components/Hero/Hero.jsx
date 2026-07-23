// Hero - מקטע הבאנר הגדול בדף הבית
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-label="כותרת ראשית">
      <div className="hero-overlay"></div>
      <div className="hero-frame"></div>

      {/* סרטון — צד שמאל */}
      <div className="hero-video-side">
        <div className="hero-video-phone">
          <video autoPlay muted loop playsInline className="hero-video" poster="/og-image.jpg">
            <source src="/reel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* תוכן — מרכז */}
      <div className="hero-content">
        <span className="hero-eyebrow">כשר חלבי ודגים · נס ציונה</span>
        <h1 className="hero-h1-seo">Kitchen Brasserie — מסעדה כשרה חלבית ודגים בנס ציונה</h1>
        <div className="hero-logo-wrap">
          <img src="/logo.png" alt="Kitchen Brasserie" className="hero-logo-img" fetchpriority="high" />
        </div>
        <p className="hero-subtitle">
          מסעדת קונספט חלבית ודגים<br />
          בראנץ · ארוחות בוקר · תפריט עשיר · מגשי אירוח
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn btn-primary">לתפריט המלא</Link>
          <a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer" className="btn btn-outline hero-btn-outline">הזמינו שולחן</a>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;
