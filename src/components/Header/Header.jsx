// ========================================
// Header - סרגל הניווט העליון
// קבוע בראש הדף, תפריט המבורגר במובייל
// ========================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const WOLT_URL = 'https://wolt.com/en/isr/rishon-lezion-hashfela-area/restaurant/kitchen-by-greg-ness-ziona';
const WAZE_URL = 'https://waze.com/ul/hsv8txue5s';

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

  function handleNavClick() {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
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
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick} end>בית</NavLink>
          <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick}>תפריט</NavLink>
          <NavLink to="/private-events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick}>אירועים</NavLink>
          {false && <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>קונספטים</NavLink>}
          <NavLink to="/catering" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick}>מגשי אירוח</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick}>אודות</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={handleNavClick}>צור קשר</NavLink>
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

          {/* וייז */}
          <a
            href={WAZE_URL}
            className="waze-btn"
            aria-label="נווט אלינו בוויז"
            title="נווט אלינו בוויז"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z"/>
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
              <img src="/wolt-logo.png" alt="Wolt" />
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
          {false && <NavLink to="/events" className="nav-mobile-link" onClick={handleNavClick}>קונספטים</NavLink>}
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
