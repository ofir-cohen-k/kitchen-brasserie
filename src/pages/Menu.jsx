// ========================================
// דף תפריט - Menu
// ========================================

import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, ChevronRight, ChevronLeft } from 'lucide-react';
import MenuCard from '../components/MenuCard/MenuCard';
import PageTitle from '../components/PageTitle/PageTitle';
import { menuData, categoryLabels } from '../data/menuData';
import './Menu.css';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categoryOrder = Object.keys(categoryLabels);

  const filteredDishes = menuData
    .filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));

  const goNext = useCallback(() =>
    setLightboxIndex(i => (i + 1) % filteredDishes.length),
    [filteredDishes.length]
  );
  const goPrev = useCallback(() =>
    setLightboxIndex(i => (i - 1 + filteredDishes.length) % filteredDishes.length),
    [filteredDishes.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape')      setLightboxIndex(null);
      if (e.key === 'ArrowLeft')   goNext();
      if (e.key === 'ArrowRight')  goPrev();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goPrev();
    else goNext();
  }

  const activeDish = lightboxIndex !== null ? filteredDishes[lightboxIndex] : null;

  return (
    <main style={{ paddingTop: '68px' }}>
      <Helmet>
        <title>תפריט | Kitchen Brasserie — מסעדה כשרה בנס ציונה</title>
        <meta name="description" content="תפריט מלא של Kitchen Brasserie — ארוחות בוקר, פסטות, פיצות, דגים, סלטים וקינוחים. מסעדה כשרה חלבית ודגים בנס ציונה, קניון קניותר." />
        <link rel="canonical" href="https://kitchenbrasserie.com/menu" />
      </Helmet>
      {/* רקע כהה עם כותרת */}
      <div className="menu-hero section-dark">
        <div className="container">
          <PageTitle
            eyebrow="Kitchen Brasserie"
            title="התפריט שלנו"
            subtitle={"מסעדת קונספט חלבית ודגים · כשר בד\"ץ"}
          />
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* שורת פילטרים + חיפוש */}
          <div className="menu-controls">
            {/* כפתורי קטגוריה */}
            <div className="menu-tabs" role="tablist" aria-label="קטגוריות תפריט">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeCategory === key}
                  className={`menu-tab ${activeCategory === key ? 'menu-tab-active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* שדה חיפוש */}
            <div className="menu-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="חיפוש לפי שם מנה..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
                aria-label="חיפוש מנות"
              />
            </div>
          </div>

          {/* גריד מנות */}
          {filteredDishes.length > 0 ? (
            <div className="cards-grid-4">
              {filteredDishes.map((dish, idx) => (
                <MenuCard key={dish.id} dish={dish} onOpen={() => setLightboxIndex(idx)} />
              ))}
            </div>
          ) : (
            /* הודעה אם לא נמצאו תוצאות */
            <div className="menu-no-results">
              <p>לא נמצאו מנות תואמות לחיפוש שלך.</p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => { setActiveCategory('all'); setSearchText(''); }}
              >
                נקה חיפוש
              </button>
            </div>
          )}
        </div>
      </section>
      {activeDish && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="סגור">
            <X size={24} />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={activeDish.image} alt={activeDish.name} className="lightbox-img" />
            <p className="lightbox-name">{activeDish.name}</p>
            <p className="lightbox-price">₪{activeDish.price}</p>
            {activeDish.description && <p className="lightbox-desc">{activeDish.description}</p>}
            <div className="lightbox-nav-row">
              <button className="lightbox-nav" onClick={goPrev} aria-label="הקודם">
                <ChevronRight size={22} />
              </button>
              <span className="lightbox-counter">{lightboxIndex + 1} / {filteredDishes.length}</span>
              <button className="lightbox-nav" onClick={goNext} aria-label="הבא">
                <ChevronLeft size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Menu;
