// ========================================
// דף תפריט - Menu
// ========================================

import { useState } from 'react';
import { Search } from 'lucide-react';
import MenuCard from '../components/MenuCard/MenuCard';
import PageTitle from '../components/PageTitle/PageTitle';
import { menuData, categoryLabels } from '../data/menuData';
import './Menu.css';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');  // קטגוריה פעילה
  const [searchText, setSearchText] = useState('');             // טקסט חיפוש

  // סינון לפי קטגוריה וחיפוש גם יחד
  const filteredDishes = menuData.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main style={{ paddingTop: '68px' }}>
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
              {filteredDishes.map((dish) => (
                <MenuCard key={dish.id} dish={dish} />
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
    </main>
  );
}

export default Menu;
