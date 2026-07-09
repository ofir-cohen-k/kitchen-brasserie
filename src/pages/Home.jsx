// ========================================
// דף הבית - Home
// ========================================

import { Link } from 'react-router-dom';
import { Utensils, ShoppingBasket, CalendarDays, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import Hero from '../components/Hero/Hero';
import MenuCard from '../components/MenuCard/MenuCard';
import EventCard from '../components/EventCard/EventCard';
import { menuData } from '../data/menuData';
import { eventsData } from '../data/eventsData';
import './Home.css';

const slideshowImages = [
  '/מנות קיטשן/בוקר זוגית.jpg',
  '/מנות קיטשן/פילה סלמון.jpg',
  '/מנות קיטשן/קרוק מאדם.jpg',
  '/מנות קיטשן/פיצה פרסקה.jpg',
  '/מנות קיטשן/ריזוטו פטריות וכמהין.jpg',
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  // מנות מומלצות - רק אלו עם isRecommended=true, עד 4
  const recommendedDishes = menuData
    .filter((dish) => dish.isRecommended)
    .slice(0, 4);

  // שני אירועים ראשונים לדף הבית
  const featuredEvents = eventsData.slice(0, 2);

  return (
    <main>
      {/* Hero - מקטע ראשי */}
      <Hero />

      {/* ===== כרטיסי ניווט מהיר ===== */}
      <section className="home-cards-section">
        <div className="home-cards container">
          <div className="home-card">
            <span className="home-card-icon"><Utensils size={28} strokeWidth={1.5} /></span>
            <h3>התפריט שלנו</h3>
            <p>סלטים, פסטות, פיצות, עיקריות דגים ועוד</p>
            <Link to="/menu" className="btn btn-outline btn-sm">לתפריט המלא</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon"><ShoppingBasket size={28} strokeWidth={1.5} /></span>
            <h3>מגשי אירוח</h3>
            <p>כריכונים, פוקאצ'ות, סלטים לכל אירוע</p>
            <Link to="/catering" className="btn btn-outline btn-sm">לכל המגשים</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon"><CalendarDays size={28} strokeWidth={1.5} /></span>
            <h3>הזמנת שולחן</h3>
            <p>האירוסים 53, קניותר, נס ציונה</p>
            <a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">להזמנה מהירה</a>
          </div>
          <div className="home-card">
            <span className="home-card-icon"><Truck size={28} strokeWidth={1.5} /></span>
            <h3>הזמנה דרך Wolt</h3>
            <p>הזמינו מהתפריט שלנו עם משלוח עד הבית</p>
            <a href="https://wolt.com/en/isr/rishon-lezion-hashfela-area/restaurant/kitchen-by-greg-ness-ziona" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">להזמנה ב-Wolt</a>
          </div>
        </div>
      </section>

      {/* ===== מנות מומלצות ===== */}
      <section className="section" id="recommended">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">kitchen Brasserie</span>
            <h2 className="section-title">המנות המומלצות שלנו</h2>
            <p className="section-subtitle">מנות שהאורחים שלנו הכי אוהבים — מוכנות בחומרי גלם טריים</p>
            <div className="ornament"><span>✦</span></div>
          </div>
          <div className="cards-grid-4">
            {recommendedDishes.map((dish) => (
              <MenuCard key={dish.id} dish={dish} />
            ))}
          </div>
          <div className="home-see-all">
            <Link to="/menu" className="btn btn-outline">
              לכל התפריט
            </Link>
          </div>
        </div>
      </section>

      {/* ===== על המסעדה ===== */}
      <section className="section-alt" id="about-preview">
        <div className="container">
          <div className="home-about">
            <div className="home-about-text">
              <span className="section-eyebrow">Kitchen Brasserie</span>
              <h2 className="section-title">מסעדת קונספט כשרה<br />עם אופי ייחודי</h2>
              <p className="home-about-body">
                Kitchen Brasserie היא מסעדה חלבית ודגים הממוקמת בנס ציונה. אנחנו מגישים
                ארוחות בוקר מפנקות, תפריט עשיר ומגשי אירוח מרשימים לכל אירוע.
              </p>
              <p className="home-about-body">
                כל מנה מוכנה מחומרי גלם איכותיים, מהבריוש הטרי ועד לסלמון הצרוב,
                בתשומת לב אמיתית לפרטים.
              </p>
              <div className="home-about-details">
                <div className="home-about-row">
                  <MapPin size={15} />
                  <span>האירוסים 53, קניותר, נס ציונה</span>
                </div>
                <div className="home-about-row">
                  <Phone size={15} />
                  <span>073-327-7207</span>
                </div>
                <div className="home-about-row">
                  <Clock size={15} />
                  <span>ראשון–חמישי 09:00–21:30, שישי 09:00–15:00</span>
                </div>
              </div>
              <span className="home-kosher-badge">✦ כשר בד"ץ בית יוסף</span>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/about" className="btn btn-primary">קרא עוד עלינו</Link>
              </div>
            </div>
            <div className="home-about-img">
              {slideshowImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Kitchen Brasserie"
                  className={`slideshow-img ${i === currentSlide ? 'active' : ''}`}
                />
              ))}
              <div className="slideshow-dots">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    className={`slideshow-dot ${i === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
              <div className="home-about-corner tl-corner"></div>
              <div className="home-about-corner br-corner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== אירועים קרובים ===== */}
      <section className="section-dark" id="events-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow" style={{ color: 'rgba(184,154,94,0.9)' }}>אירועים</span>
            <h2 className="section-title section-title-light">אירועים קרובים</h2>
            <p className="section-subtitle" style={{ color: 'rgba(248,244,236,0.55)' }}>
              אירועים מיוחדים, ערבי שף, מוסיקה חיה ועוד
            </p>
            <div className="ornament ornament-light"><span>✦</span></div>
          </div>
          <div className="cards-grid">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="home-see-all">
            <Link to="/events" className="btn btn-outline home-events-btn">
              לכל האירועים
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA - הזמנת שולחן ===== */}
      <section className="section home-cta-section">
        <div className="container">
          <div className="home-cta">
            <h2 className="section-title">מוכנים לארוחה מיוחדת?</h2>
            <p className="section-subtitle">הזמינו שולחן עכשיו ותהנו מחוויה קולינרית יוקרתית</p>
            <div className="home-cta-btns">
              <a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer" className="btn btn-primary">הזמנת שולחן</a>
              <Link to="/menu" className="btn btn-outline">לתפריט</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
