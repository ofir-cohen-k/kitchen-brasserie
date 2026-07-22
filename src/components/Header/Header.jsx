// ========================================
// Header - סרגל הניווט העליון
// קבוע בראש הדף, תפריט המבורגר במובייל
// ========================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const WOLT_URL = 'https://wolt.com/en/isr/rishon-lezion-hashfela-area/restaurant/kitchen-by-greg-ness-ziona';

import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);  // האם גוללים למטה?
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // האם תפריט המבורגר פתוח?
  const location = useLocation();
  const isHome = location.pathname === '/';

  // מאזין לגלילה כדי להוסיף צל לסרגל
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // סגירת התפריט בלחיצה על קישור
  function handleNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-inner container">
        {/* לוגו */}
        <Link to="/" className="logo" onClick={handleNavClick}>
          <img src="/logo.png" alt="Kitchen Brasserie" className={`logo-img ${isHome ? 'logo-img-light' : ''}`} />
        </Link>

        {/* תפריט ניווט - מחשב */}
        <nav className="nav-desktop" aria-label="תפריט ניווט ראשי">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
            בית
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            תפריט
          </NavLink>
          <NavLink to="/private-events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            אירועים
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            קונספטים
          </NavLink>
          <NavLink to="/catering" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            מגשי אירוח
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            אודות
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            צור קשר
          </NavLink>
          <a
            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-cta"
          >
            הזמנת שולחן
          </a>
        </nav>

        {/* אייקוני פעולה */}
        <div className="header-actions">
          {/* אינסטגרם */}
          <a
            href="https://www.instagram.com/kitchbras"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn"
            aria-label="אינסטגרם של Kitchen Brasserie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>

          {/* וולט */}
          <a
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wolt-btn"
            aria-label="הזמנה דרך Wolt"
            title="הזמנה דרך Wolt"
          >
            <span className="wolt-icon-pill">
              <img src="/wolt-icon.png" alt="Wolt" />
            </span>
          </a>

          {/* כפתור תפריט המבורגר - רק במובייל */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* תפריט מובייל */}
      {isMenuOpen && (
        <nav className="nav-mobile" aria-label="תפריט ניווט מובייל">
          <NavLink to="/" className="nav-mobile-link" onClick={handleNavClick} end>בית</NavLink>
          <NavLink to="/menu" className="nav-mobile-link" onClick={handleNavClick}>תפריט</NavLink>
          <NavLink to="/private-events" className="nav-mobile-link" onClick={handleNavClick}>אירועים</NavLink>
          <NavLink to="/events" className="nav-mobile-link" onClick={handleNavClick}>קונספטים</NavLink>
          <NavLink to="/catering" className="nav-mobile-link" onClick={handleNavClick}>מגשי אירוח</NavLink>
          <NavLink to="/about" className="nav-mobile-link" onClick={handleNavClick}>אודות</NavLink>
          <NavLink to="/contact" className="nav-mobile-link" onClick={handleNavClick}>צור קשר</NavLink>
          <a
            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mobile-link nav-mobile-cta"
            onClick={handleNavClick}
          >
            הזמנת שולחן
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
