// ========================================
// דף הבית - Home
// ========================================

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Truck, MapPin, Phone, Clock, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero/Hero';
import MenuCard from '../components/MenuCard/MenuCard';
// import EventCard from '../components/EventCard/EventCard'; // קונספטים מוסתר זמנית
import { menuData } from '../data/menuData';
// import { eventsData } from '../data/eventsData'; // קונספטים מוסתר זמנית
import './Home.css';

const REVIEWS = [
  { name: 'מיכל צ׳', text: 'שירות מעולה, אוכל אנין טעם — פשוט מעולה. תודה רבה!' },
  { name: 'סיון פ׳', text: 'אנחנו אוכלים פה קבוע ואין פעם שלא יוצאים מרוצים. קבלת פנים מאירת עיניים, המקום מדהים וכל הצוות פשוט מדהים.' },
  { name: 'Ezra Y.', text: 'ארוחת הבוקר הייתה מעולה — עשירה ומפנקת, שירות מצוין. אהבנו מאוד, בהחלט נחזור לפה.' },
  { name: 'יצחק ב׳', text: 'אוכל טעים מאוד, מנות מכובדות ולא בקמצנות, שירות נעים ואדיב. נהנינו אני ואשתי מאוד.' },
  { name: 'Sapir C.', text: 'מסעדה מדהימה! אהבנו ממש את האוכל ואת כל חוויית השירות. בטוחה שאחזור :)' },
  { name: 'Shoval T.', text: 'המקום האהוב עליי ועל בעלי — רמה גבוהה מאוד ושירות מושלם!!!' },
  { name: 'מירב ג׳', text: 'הזמנו פסטות, דגים ופיצה — הכל היה מאוד טעים. האוכל הגיע מהר והמלצרים שירותיים. מומלץ בחום :)' },
  { name: 'Shay M.', text: 'יצאנו לדייט בחמישי בערב — אווירה נעימה וקלילה, אוכל טעים במיוחד הסלטים והפסטות, שירות אדיב. לגמרי נחזור!' },
  { name: 'גלית ג׳', text: 'חגגנו יום הולדת 40 עם 30 אנשים — תענוג אחד גדול מהרגע הראשון. אוכל מדהים, שירות מושלם, ועוד כשר למהדרין. ואנחנו נחזור... והרבה ❤️' },
];

function TestimonialsMarquee() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const touchStartXRef = useRef(null);
  const touchStartPosRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    // start at -halfWidth so first visible cards are the duplicates (seamless from the start)
    posRef.current = 0;
    track.style.transform = `translateX(-${halfWidth}px)`;

    function step() {
      if (!pausedRef.current) {
        posRef.current += 0.6;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;
        // pos goes 0→halfWidth, transform goes -halfWidth→0 (cards move RIGHT)
        track.style.transform = `translateX(${posRef.current - halfWidth}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="home-testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">הלקוחות שלנו מספרים</span>
          <h2 className="section-title">מה אומרים עלינו</h2>
          <div className="ornament"><span>✦</span></div>
        </div>
      </div>
      <div
        className="testimonials-marquee-wrap"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={(e) => {
          touchStartXRef.current = e.touches[0].clientX;
          touchStartPosRef.current = posRef.current;
          pausedRef.current = true;
        }}
        onTouchMove={(e) => {
          if (touchStartXRef.current === null) return;
          const track = trackRef.current;
          if (!track) return;
          const halfWidth = track.scrollWidth / 2;
          const delta = e.touches[0].clientX - touchStartXRef.current;
          let newPos = touchStartPosRef.current + delta;
          newPos = ((newPos % halfWidth) + halfWidth) % halfWidth;
          posRef.current = newPos;
          track.style.transform = `translateX(${newPos - halfWidth}px)`;
        }}
        onTouchEnd={() => {
          touchStartXRef.current = null;
          touchStartPosRef.current = null;
          pausedRef.current = false;
        }}
      >
        <div className="testimonials-marquee-track" ref={trackRef}>
          {[...REVIEWS, ...REVIEWS].map(({ name, text }, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{text}</p>
              <div className="testimonial-footer">
                <span className="testimonial-stars">★★★★★</span>
                <span className="testimonial-name">— {name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ dishes, index, onClose, onPrev, onNext }) {
  const dish = dishes[index];
  const touchStartX = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNext();
      if (e.key === 'ArrowRight') onPrev();
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [index]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onPrev() : onNext();
    }
    touchStartX.current = null;
  }

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="סגור"><X size={18} /></button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={dish.image} alt={dish.name} className="lightbox-img" />
        <div className="lightbox-name">{dish.name}</div>
        <div className="lightbox-price">₪{dish.price}</div>
        {dish.description && <p className="lightbox-desc">{dish.description}</p>}
        <div className="lightbox-nav-row">
          <button className="lightbox-nav" onClick={onPrev} aria-label="הקודם"><ChevronRight size={20} /></button>
          <span className="lightbox-counter">{index + 1} / {dishes.length}</span>
          <button className="lightbox-nav" onClick={onNext} aria-label="הבא"><ChevronLeft size={20} /></button>
        </div>
      </div>
    </div>
  );
}

const slideshowImages = [
  { src: '/מנות קיטשן/בוראטה דה נאפולי.jpg',          alt: 'בוראטה דה נאפולי — Kitchen Brasserie נס ציונה' },
  { src: '/מנות קיטשן/שווארמה דג.jpg',                alt: 'שווארמה דג — מסעדה כשרה נס ציונה' },
  { src: '/מנות קיטשן/בנדיקט קלאסי.jpg',              alt: 'בנדיקט קלאסי — ארוחת בוקר Kitchen Brasserie' },
  { src: '/מנות קיטשן/שיפוד סלמון טיקה קארי מלזי.jpg', alt: 'שיפוד סלמון טיקה קארי מלזי — Kitchen Brasserie' },
  { src: '/מנות קיטשן/ספגטי קרבונרה.jpg',             alt: 'ספגטי קרבונרה — פסטה כשרה נס ציונה' },
  { src: '/מנות קיטשן/שניצל דג וסמאש פוטטוס.jpg',     alt: 'שניצל דג וסמאש פוטטוס — Kitchen Brasserie' },
  { src: '/מנות קיטשן/טירמיסו.jpg',                   alt: 'טירמיסו — קינוח Kitchen Brasserie נס ציונה' },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lbIdx, setLbIdx] = useState(null);
  const slideTotal = slideshowImages.length;
  const slideTouchX = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const recommendedDishes = menuData.filter((dish) => dish.isFeatured);

  // const featuredEvents = eventsData.slice(0, 2); // קונספטים מוסתר זמנית

  return (
    <main>
      <Helmet>
        <title>Kitchen Brasserie | מסעדה כשרה חלבית ודגים בנס ציונה</title>
        <meta name="description" content="מסעדת קונספט חלבית ודגים כשרה למהדרין בנס ציונה. ארוחות בוקר מפנקות, פסטות, פיצות, דגים ומגשי אירוח. כשר בד״ץ בית יוסף — קניון קניותר." />
        <link rel="canonical" href="https://kitchenbrasserie.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "האם Kitchen Brasserie כשרה?", "acceptedAnswer": { "@type": "Answer", "text": "כן. אנחנו מסעדה חלבית ודגים כשרה למהדרין תחת השגחת בד״ץ בית יוסף." } },
            { "@type": "Question", "name": "מה שעות הפתיחה של Kitchen Brasserie?", "acceptedAnswer": { "@type": "Answer", "text": "ראשון עד חמישי 09:00–22:30, שישי 09:00–15:00. שבת — סגור." } },
            { "@type": "Question", "name": "איפה נמצאת Kitchen Brasserie?", "acceptedAnswer": { "@type": "Answer", "text": "האירוסים 53, קניון קניותר, נס ציונה. יש חניה חינמית בקניון." } },
            { "@type": "Question", "name": "האם אפשר להזמין שולחן ב-Kitchen Brasserie?", "acceptedAnswer": { "@type": "Answer", "text": "כן, ניתן להזמין שולחן דרך האתר או בטלפון 073-327-7207." } },
            { "@type": "Question", "name": "האם יש מגשי אירוח ב-Kitchen Brasserie?", "acceptedAnswer": { "@type": "Answer", "text": "כן, מגשי אירוח מעוצבים לאירועים עסקיים ומשפחתיים — כריכונים, פוקאצ׳ות, סלטים ועוד." } },
            { "@type": "Question", "name": "האם ניתן לקיים אירועים פרטיים ב-Kitchen Brasserie?", "acceptedAnswer": { "@type": "Answer", "text": "כן, אירועי בוטיק עד 60 אורחים — בר/בת מצווה, ימי הולדת, אירועי חברה ועוד." } },
          ]
        })}</script>
      </Helmet>
      {/* Hero - מקטע ראשי */}
      <Hero />

      {/* ===== כרטיסי ניווט מהיר ===== */}
      <section className="home-cards-section">
        <div className="home-cards container reveal">
          <div className="home-card">
            <span className="home-card-icon"><Star size={28} strokeWidth={1.5} /></span>
            <h3>אירועים פרטיים</h3>
            <p>בר/בת מצווה, ימי הולדת, אירועי חברה ועוד</p>
            <Link to="/private-events" className="btn btn-outline btn-sm">לפרטים ותפריטים</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon"><ShoppingBasket size={28} strokeWidth={1.5} /></span>
            <h3>מגשי אירוח</h3>
            <p>כריכונים, פוקאצ'ות, סלטים לכל אירוע</p>
            <Link to="/catering" className="btn btn-outline btn-sm">לכל המגשים</Link>
          </div>
          <div className="home-card">
            <span className="home-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </span>
            <h3>עקבו אחרינו</h3>
            <p>תמונות, סטוריז ועדכונים שוטפים מהמטבח שלנו</p>
            <a href="https://www.instagram.com/kitchbras" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">@kitchbras</a>
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
          <div className="section-header reveal">
            <span className="section-eyebrow">kitchen Brasserie</span>
            <h2 className="section-title">המנות המומלצות שלנו</h2>
            <p className="section-subtitle">מנות שהאורחים שלנו הכי אוהבים — מוכנות בחומרי גלם טריים</p>
            <div className="ornament"><span>✦</span></div>
          </div>
          <div className="cards-grid-4">
            {recommendedDishes.map((dish, i) => (
              <MenuCard key={dish.id} dish={dish} onOpen={() => setLbIdx(i)} />
            ))}
          </div>
          {lbIdx !== null && (
            <Lightbox
              dishes={recommendedDishes}
              index={lbIdx}
              onClose={() => setLbIdx(null)}
              onPrev={() => setLbIdx((lbIdx - 1 + recommendedDishes.length) % recommendedDishes.length)}
              onNext={() => setLbIdx((lbIdx + 1) % recommendedDishes.length)}
            />
          )}
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
            <div className="home-about-text reveal">
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
                  <a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>האירוסים 53, קניותר, נס ציונה</a>
                </div>
                <div className="home-about-row">
                  <Phone size={15} />
                  <a href="tel:073-327-7207" style={{ color: 'inherit' }}>073-327-7207</a>
                </div>
                <div className="home-about-row">
                  <Clock size={15} />
                  <span>ראשון–חמישי 09:00–22:30, שישי 09:00–15:00</span>
                </div>
              </div>
              <span className="home-kosher-badge">✦ כשר בד"ץ בית יוסף</span>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/about" className="btn btn-primary">קרא עוד עלינו</Link>
              </div>
            </div>
            <div
              className="home-about-img reveal reveal-delay-2"
              onTouchStart={e => { slideTouchX.current = e.touches[0].clientX; }}
              onTouchEnd={e => {
                if (slideTouchX.current === null) return;
                const diff = slideTouchX.current - e.changedTouches[0].clientX;
                slideTouchX.current = null;
                if (Math.abs(diff) < 40) return;
                setCurrentSlide(prev => diff > 0
                  ? (prev + 1) % slideTotal
                  : (prev - 1 + slideTotal) % slideTotal);
              }}
            >
              {slideshowImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
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

      {/* אירועים קרובים — מוסתר זמנית */}

      {/* ===== עדויות לקוחות ===== */}
      <TestimonialsMarquee />

      {/* ===== למה לבחור בנו ===== */}
      <section className="home-why-section">
        <div className="container">
          <div className="home-why-header reveal">
            <span className="section-eyebrow">Kitchen Brasserie</span>
            <h2 className="section-title section-title-light">מה מייחד אותנו</h2>
            <div className="ornament ornament-light"><span>✦</span></div>
          </div>
          <div className="home-why-grid reveal reveal-delay-1">
            <div className="home-why-item">
              <span className="home-why-icon">✦</span>
              <h3 className="home-why-title">כשר למהדרין</h3>
              <p className="home-why-sub">בד״ץ בית יוסף</p>
            </div>
            <div className="home-why-item">
              <span className="home-why-icon">✦</span>
              <h3 className="home-why-title">קולינריה מוקפדת</h3>
              <p className="home-why-sub">חומרי גלם טריים</p>
            </div>
            <div className="home-why-item">
              <span className="home-why-icon">✦</span>
              <h3 className="home-why-title">חניה גדולה</h3>
              <p className="home-why-sub">חופשית בחינם</p>
            </div>
            <div className="home-why-item">
              <span className="home-why-icon">✦</span>
              <h3 className="home-why-title">אירועים ומגשי אירוח</h3>
              <p className="home-why-sub">הכל במקום אחד</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== שאלות נפוצות ===== */}
      <section className="section home-faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Kitchen Brasserie</span>
            <h2 className="section-title">שאלות נפוצות</h2>
            <div className="ornament"><span>✦</span></div>
          </div>
          <div className="home-faq-grid reveal">
            {[
              { q: 'האם Kitchen Brasserie כשרה?', a: 'כן. אנחנו מסעדה חלבית ודגים כשרה למהדרין תחת השגחת בד״ץ בית יוסף — אחת מסמכויות הכשרות המחמירות בישראל.' },
              { q: 'מה שעות הפתיחה?', a: 'ראשון עד חמישי 09:00–22:30, שישי 09:00–15:00. שבת — סגור.' },
              { q: 'איפה נמצאת המסעדה?', a: 'האירוסים 53, קניון קניותר, נס ציונה. יש חניה חינמית בקניון.' },
              { q: 'האם אפשר לעשות בראנץ ב-Kitchen Brasserie?', a: 'בהחלט! אנחנו מגישים ארוחות בוקר ובראנץ עשירים בימים ראשון עד שישי. התפריט כולל מנות חלביות, ביצים בהכנות שונות, מאפים טריים ועוד — הכל כשר בד״ץ בית יוסף.' },
              { q: 'האם אפשר להזמין שולחן מראש?', a: 'כן, ניתן להזמין שולחן דרך האתר שלנו או בטלפון 073-327-7207.' },
              { q: 'האם יש מגשי אירוח?', a: 'כן! אנחנו מכינים מגשי אירוח מעוצבים לאירועים עסקיים ומשפחתיים — כריכונים, פוקאצ׳ות, סלטים ועוד. ניתן לבקש הצעת מחיר דרך עמוד מגשי האירוח.' },
              { q: 'האם ניתן לקיים אירועים פרטיים?', a: 'כן, אנחנו מארחים אירועי בוטיק עד 60 אורחים — בר/בת מצווה, ימי הולדת, אירועי חברה ועוד. צרו קשר לפרטים.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{q}</summary>
                <p className="faq-answer">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - הזמנת שולחן ===== */}
      <section className="section home-cta-section">
        <div className="container">
          <div className="home-cta reveal">
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
