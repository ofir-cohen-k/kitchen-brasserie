// Hero - מקטע הבאנר הגדול בדף הבית
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-label="כותרת ראשית">
      <div className="hero-overlay"></div>
      <div className="hero-frame"></div>

      <div className="hero-inner">
        {/* צד שמאל — סרטון */}
        <div className="hero-video-side">
          <div className="hero-video-phone">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
            >
              <source src="/מנות קיטשן/reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* צד ימין — תוכן */}
        <div className="hero-content">
          <span className="hero-eyebrow">כשר חלבי ודגים · נס ציונה</span>

          <div className="hero-logo-wrap">
            <img src="/logo.png" alt="Kitchen Brasserie" className="hero-logo-img" />
          </div>

          <p className="hero-subtitle">
            מסעדת קונספט חלבית ודגים<br />
            ארוחות בוקר · תפריט עשיר · מגשי אירוח
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">
              לתפריט המלא
            </Link>
            <Link to="/reservation" className="btn btn-outline hero-btn-outline">
              הזמינו שולחן
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;
