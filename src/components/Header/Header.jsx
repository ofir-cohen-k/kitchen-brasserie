// ========================================
// Header - סרגל הניווט העליון
// קבוע בראש הדף, תפריט המבורגר במובייל
// ========================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);  // האם גוללים למטה?
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // האם תפריט המבורגר פתוח?
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
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
          <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            אירועים
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
          <NavLink to="/reservation" className="nav-link nav-cta">
            הזמנת שולחן
          </NavLink>
        </nav>

        {/* אייקוני פעולה */}
        <div className="header-actions">
          {/* אייקון עגלת קניות */}
          <button
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="פתח סל קניות"
          >
            <ShoppingCart size={20} />
            {/* מספר הפריטים בסל */}
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>

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
          <NavLink to="/events" className="nav-mobile-link" onClick={handleNavClick}>אירועים</NavLink>
          <NavLink to="/catering" className="nav-mobile-link" onClick={handleNavClick}>מגשי אירוח</NavLink>
          <NavLink to="/about" className="nav-mobile-link" onClick={handleNavClick}>אודות</NavLink>
          <NavLink to="/contact" className="nav-mobile-link" onClick={handleNavClick}>צור קשר</NavLink>
          <NavLink to="/reservation" className="nav-mobile-link nav-mobile-cta" onClick={handleNavClick}>
            הזמנת שולחן
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
