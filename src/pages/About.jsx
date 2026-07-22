// ========================================
// דף אודות - About
// ========================================

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Check, Leaf, ChefHat, ShieldCheck, Heart } from 'lucide-react';
import PageTitle from '../components/PageTitle/PageTitle';
import './About.css';

const slideshowImages = [
  '/מנות קיטשן/בוראטה דה נאפולי.jpg',
  '/מנות קיטשן/שווארמה דג.jpg',
  '/מנות קיטשן/בנדיקט קלאסי.jpg',
  '/מנות קיטשן/שיפוד סלמון טיקה קארי מלזי.jpg',
  '/מנות קיטשן/ספגטי קרבונרה.jpg',
  '/מנות קיטשן/שניצל דג וסמאש פוטטוס.jpg',
  '/מנות קיטשן/טירמיסו.jpg',
];

function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const values = [
    { icon: <Leaf size={28} strokeWidth={1.5} />, title: 'חומרי גלם טריים', desc: 'כל יום מגיעים אלינו ירקות, דגים וגבינות טריים. אנחנו עובדים עם ספקים מקומיים שאנחנו סומכים עליהם ולא מתפשרים על האיכות.' },
    { icon: <ChefHat size={28} strokeWidth={1.5} />, title: 'מכינים במקום', desc: 'הפסטות מתבשלות טריות, הדגים נצרבים במקום והבצק תופח אצלנו. אנחנו לא מחממים, אנחנו מכינים.' },
    { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: 'כשר בד"ץ בית יוסף', desc: 'מסעדה חלבית ודגים בלבד, עובדים תחת השגחת בד"ץ בית יוסף עם בדיקות שוטפות ופיקוח מלא.' },
    { icon: <Heart size={28} strokeWidth={1.5} />, title: 'שירות אישי', desc: 'אנחנו מכירים את האורחים שלנו, שמחים לראות פנים מוכרות ומקפידים שכל אחד יצא מרוצה.' },
  ];

  return (
    <main style={{ paddingTop: '68px' }}>
      <Helmet>
        <title>אודות | Kitchen Brasserie — הסיפור שלנו</title>
        <meta name="description" content="הכירו את Kitchen Brasserie — מסעדת קונספט חלבית ודגים כשרה למהדרין בנס ציונה. הסיפור שלנו, הערכים שלנו והצוות שמאחורי המטבח." />
        <link rel="canonical" href="https://kitchenbrasserie.com/about" />
      </Helmet>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="Kitchen Brasserie"
            title="מי אנחנו"
            subtitle="מסעדת קונספט חלבית ודגים כשרה בנס ציונה"
          />
        </div>
      </div>

      {/* הסיפור שלנו */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-img">
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
              <div className="about-corner tl"></div>
              <div className="about-corner br"></div>
            </div>
            <div className="about-story-text">
              <span className="section-eyebrow">הסיפור שלנו</span>
              <h2 className="section-title">מסעדת קונספט כשרה עם אופי ייחודי</h2>
              <p className="about-body">
                אנחנו מסעדת קונספט חלבית ודגים כשרה למהדרין, הממוקמת בקניון קניותר בנס ציונה. כבר כמה שנים שאנחנו יוצרים מקום נעים, איכותי ומזמין שמתאים לכל שעה ביום, מארוחת בוקר עם חברה ועד ארוחת צהריים עסקית או ערב משפחתי באווירה מיוחדת.
              </p>
              <p className="about-body">
                התפריט שלנו עשיר ומגוון וכולל ארוחות בוקר מפנקות, פסטות, פיצות מהתנור, סלטים טריים, מנות דגים וקינוחים, תוך הקפדה על חומרי גלם איכותיים וטעמים מוקפדים. לצד חוויית המסעדה, אנחנו מציעים גם מגשי אירוח מעוצבים בהתאמה אישית, המתאימים לפגישות עסקיות, אירועים משפחתיים וחגיגות מכל הסוגים.
              </p>
              <p className="about-body">
                בואו ליהנות מחוויה טעימה, נעימה ומדויקת. אצלנו כל ארוחה הופכת לרגע שכיף לחזור אליו.
              </p>
              <div className="about-contact-info">
                <div className="about-row"><MapPin size={15} /><a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer">האירוסים 53, קניותר, נס ציונה</a></div>
                <div className="about-row"><Phone size={15} /><a href="tel:0733277207">073-327-7207</a></div>
                <div className="about-row"><Mail size={15} /><a href="mailto:Kitchbras@gmail.com">Kitchbras@gmail.com</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* הערכים שלנו */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">הערכים שלנו</span>
            <h2 className="section-title">למה לבחור בנו?</h2>
            <div className="ornament"><span>✦</span></div>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* כשרות */}
      <section className="section">
        <div className="container about-kosher">
          <div className="section-header">
            <span className="section-eyebrow">כשרות</span>
            <h2 className="section-title">כשר בד"ץ בית יוסף</h2>
            <p className="section-subtitle">הכשרות שלנו היא לא רק תו — היא חלק מהזהות שלנו. אנחנו פועלים תחת השגחה מחמירה ורציפה, כדי שתוכלו לאכול בנינוחות ובביטחון מלא.</p>
          </div>
          <div className="kosher-details">
            {[
              'כשר בד"ץ בית יוסף — אחת מסמכויות הכשרות המחמירות בישראל',
              'מסעדה חלבית ודגים בלבד — ללא בשר מכל סוג',
              'בדיקות כשרות שוטפות ובלתי מוצהרות',
              'כל המרכיבים והספקים מאושרים ומבוקרים',
              'הכנת המזון תחת פיקוח מלא וצוות מוסמך',
            ].map((item, i) => (
              <div key={i} className="kosher-item">
                <Check size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark" style={{ padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title section-title-light">מוכנים לבוא לבקר?</h2>
          <p className="section-subtitle" style={{ color: 'rgba(248,244,236,0.55)' }}>
            שמרו שולחן, הביאו מישהו שאתם אוהבים — והשאר עלינו
          </p>
          <a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            הזמנת שולחן
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
