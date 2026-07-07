// ========================================
// ׳“׳£ ׳׳•׳“׳•׳× - About
// ========================================

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Check, Leaf, ChefHat, ShieldCheck, Heart } from 'lucide-react';
import PageTitle from '../components/PageTitle/PageTitle';
import './About.css';

const slideshowImages = [
  'https://kitchenm.co.il/wp-content/uploads/2025/05/Ginsburg_KitchenGreg_15.5.24-112-scaled.jpg',
  'https://kitchenm.co.il/wp-content/uploads/2025/05/MOYAL-04908-scaled.jpg',
  'https://kitchenm.co.il/wp-content/uploads/2025/05/Ginsburg_KitchenGreg_15.5.24-69-scaled.jpg',
  'https://kitchenm.co.il/wp-content/uploads/2025/05/MOYAL-05028-scaled.jpg',
  'https://kitchenm.co.il/wp-content/uploads/2025/05/Ginsburg_KitchenGreg_15.5.24-146-scaled.jpg',
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
    { icon: <Leaf size={28} strokeWidth={1.5} />, title: '׳—׳•׳׳¨׳™ ׳’׳׳ ׳˜׳¨׳™׳™׳', desc: '׳›׳ ׳™׳•׳ ׳׳’׳™׳¢׳™׳ ׳׳׳™׳ ׳• ׳™׳¨׳§׳•׳×, ׳“׳’׳™׳ ׳•׳’׳‘׳™׳ ׳•׳× ׳˜׳¨׳™׳™׳. ׳׳ ׳—׳ ׳• ׳¢׳•׳‘׳“׳™׳ ׳¢׳ ׳¡׳₪׳§׳™׳ ׳׳§׳•׳׳™׳™׳ ׳©׳׳ ׳—׳ ׳• ׳¡׳•׳׳›׳™׳ ׳¢׳׳™׳”׳ ׳•׳׳ ׳׳×׳₪׳©׳¨׳™׳ ׳¢׳ ׳”׳׳™׳›׳•׳×.' },
    { icon: <ChefHat size={28} strokeWidth={1.5} />, title: '׳׳›׳™׳ ׳™׳ ׳‘׳׳§׳•׳', desc: '׳”׳₪׳¡׳˜׳•׳× ׳׳×׳‘׳©׳׳•׳× ׳˜׳¨׳™׳•׳×, ׳”׳“׳’׳™׳ ׳ ׳¦׳¨׳‘׳™׳ ׳‘׳׳§׳•׳ ׳•׳”׳‘׳¦׳§ ׳×׳•׳₪׳— ׳׳¦׳׳ ׳•. ׳׳ ׳—׳ ׳• ׳׳ ׳׳—׳׳׳™׳, ׳׳ ׳—׳ ׳• ׳׳›׳™׳ ׳™׳.' },
    { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: '׳›׳©׳¨ ׳‘׳“"׳¥ ׳‘׳™׳× ׳™׳•׳¡׳£', desc: '׳׳¡׳¢׳“׳” ׳—׳׳‘׳™׳× ׳•׳“׳’׳™׳ ׳‘׳׳‘׳“, ׳¢׳•׳‘׳“׳™׳ ׳×׳—׳× ׳”׳©׳’׳—׳× ׳‘׳“"׳¥ ׳‘׳™׳× ׳™׳•׳¡׳£ ׳¢׳ ׳‘׳“׳™׳§׳•׳× ׳©׳•׳˜׳₪׳•׳× ׳•׳₪׳™׳§׳•׳— ׳׳׳.' },
    { icon: <Heart size={28} strokeWidth={1.5} />, title: '׳©׳™׳¨׳•׳× ׳׳™׳©׳™', desc: '׳׳ ׳—׳ ׳• ׳׳›׳™׳¨׳™׳ ׳׳× ׳”׳׳•׳¨׳—׳™׳ ׳©׳׳ ׳•, ׳©׳׳—׳™׳ ׳׳¨׳׳•׳× ׳₪׳ ׳™׳ ׳׳•׳›׳¨׳•׳× ׳•׳׳§׳₪׳™׳“׳™׳ ׳©׳›׳ ׳׳—׳“ ׳™׳¦׳ ׳׳¨׳•׳¦׳”.' },
  ];

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="Kitchen Brasserie"
            title="׳׳™ ׳׳ ׳—׳ ׳•"
            subtitle="׳׳¡׳¢׳“׳× ׳§׳•׳ ׳¡׳₪׳˜ ׳—׳׳‘׳™׳× ׳•׳“׳’׳™׳ ׳›׳©׳¨׳” ׳‘׳ ׳¡ ׳¦׳™׳•׳ ׳”"
          />
        </div>
      </div>

      {/* ׳”׳¡׳™׳₪׳•׳¨ ׳©׳׳ ׳• */}
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
              <span className="section-eyebrow">׳”׳¡׳™׳₪׳•׳¨ ׳©׳׳ ׳•</span>
              <h2 className="section-title">׳׳¡׳¢׳“׳× ׳§׳•׳ ׳¡׳₪׳˜ ׳›׳©׳¨׳” ׳¢׳ ׳׳•׳₪׳™ ׳™׳™׳—׳•׳“׳™</h2>
              <p className="about-body">
                ׳׳ ׳—׳ ׳• ׳׳¡׳¢׳“׳× ׳§׳•׳ ׳¡׳₪׳˜ ׳—׳׳‘׳™׳× ׳•׳“׳’׳™׳ ׳›׳©׳¨׳” ׳׳׳”׳“׳¨׳™׳, ׳”׳׳׳•׳§׳׳× ׳‘׳§׳ ׳™׳•׳ ׳§׳ ׳™׳•׳×׳¨ ׳‘׳ ׳¡ ׳¦׳™׳•׳ ׳”. ׳›׳‘׳¨ ׳›׳׳” ׳©׳ ׳™׳ ׳©׳׳ ׳—׳ ׳• ׳™׳•׳¦׳¨׳™׳ ׳׳§׳•׳ ׳ ׳¢׳™׳, ׳׳™׳›׳•׳×׳™ ׳•׳׳–׳׳™׳ ׳©׳׳×׳׳™׳ ׳׳›׳ ׳©׳¢׳” ׳‘׳™׳•׳, ׳׳׳¨׳•׳—׳× ׳‘׳•׳§׳¨ ׳¢׳ ׳—׳‘׳¨׳” ׳•׳¢׳“ ׳׳¨׳•׳—׳× ׳¦׳”׳¨׳™׳™׳ ׳¢׳¡׳§׳™׳× ׳׳• ׳¢׳¨׳‘ ׳׳©׳₪׳—׳×׳™ ׳‘׳׳•׳•׳™׳¨׳” ׳׳™׳•׳—׳“׳×.
              </p>
              <p className="about-body">
                ׳”׳×׳₪׳¨׳™׳˜ ׳©׳׳ ׳• ׳¢׳©׳™׳¨ ׳•׳׳’׳•׳•׳ ׳•׳›׳•׳׳ ׳׳¨׳•׳—׳•׳× ׳‘׳•׳§׳¨ ׳׳₪׳ ׳§׳•׳×, ׳₪׳¡׳˜׳•׳×, ׳₪׳™׳¦׳•׳× ׳׳”׳×׳ ׳•׳¨, ׳¡׳׳˜׳™׳ ׳˜׳¨׳™׳™׳, ׳׳ ׳•׳× ׳“׳’׳™׳ ׳•׳§׳™׳ ׳•׳—׳™׳, ׳×׳•׳ ׳”׳§׳₪׳“׳” ׳¢׳ ׳—׳•׳׳¨׳™ ׳’׳׳ ׳׳™׳›׳•׳×׳™׳™׳ ׳•׳˜׳¢׳׳™׳ ׳׳•׳§׳₪׳“׳™׳. ׳׳¦׳“ ׳—׳•׳•׳™׳™׳× ׳”׳׳¡׳¢׳“׳”, ׳׳ ׳—׳ ׳• ׳׳¦׳™׳¢׳™׳ ׳’׳ ׳׳’׳©׳™ ׳׳™׳¨׳•׳— ׳׳¢׳•׳¦׳‘׳™׳ ׳‘׳”׳×׳׳׳” ׳׳™׳©׳™׳×, ׳”׳׳×׳׳™׳׳™׳ ׳׳₪׳’׳™׳©׳•׳× ׳¢׳¡׳§׳™׳•׳×, ׳׳™׳¨׳•׳¢׳™׳ ׳׳©׳₪׳—׳×׳™׳™׳ ׳•׳—׳’׳™׳’׳•׳× ׳׳›׳ ׳”׳¡׳•׳’׳™׳.
              </p>
              <p className="about-body">
                ׳‘׳•׳׳• ׳׳™׳”׳ ׳•׳× ׳׳—׳•׳•׳™׳” ׳˜׳¢׳™׳׳”, ׳ ׳¢׳™׳׳” ׳•׳׳“׳•׳™׳§׳×. ׳׳¦׳׳ ׳• ׳›׳ ׳׳¨׳•׳—׳” ׳”׳•׳₪׳›׳× ׳׳¨׳’׳¢ ׳©׳›׳™׳£ ׳׳—׳–׳•׳¨ ׳׳׳™׳•.
              </p>
              <div className="about-contact-info">
                <div className="about-row"><MapPin size={15} /><span>׳”׳׳™׳¨׳•׳¡׳™׳ 53, ׳§׳ ׳™׳•׳×׳¨, ׳ ׳¡ ׳¦׳™׳•׳ ׳”</span></div>
                <div className="about-row"><Phone size={15} /><a href="tel:0733277207">073-327-7207</a></div>
                <div className="about-row"><Mail size={15} /><a href="mailto:Kitchbras@gmail.com">Kitchbras@gmail.com</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ׳”׳¢׳¨׳›׳™׳ ׳©׳׳ ׳• */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">׳”׳¢׳¨׳›׳™׳ ׳©׳׳ ׳•</span>
            <h2 className="section-title">׳׳׳” ׳׳‘׳—׳•׳¨ ׳‘׳ ׳•?</h2>
            <div className="ornament"><span>ג¦</span></div>
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

      {/* ׳›׳©׳¨׳•׳× */}
      <section className="section">
        <div className="container about-kosher">
          <div className="section-header">
            <span className="section-eyebrow">׳›׳©׳¨׳•׳×</span>
            <h2 className="section-title">׳›׳©׳¨ ׳‘׳“"׳¥ ׳‘׳™׳× ׳™׳•׳¡׳£</h2>
            <p className="section-subtitle">׳”׳›׳©׳¨׳•׳× ׳©׳׳ ׳• ׳”׳™׳ ׳׳ ׳¨׳§ ׳×׳• ג€” ׳”׳™׳ ׳—׳׳§ ׳׳”׳–׳”׳•׳× ׳©׳׳ ׳•. ׳׳ ׳—׳ ׳• ׳₪׳•׳¢׳׳™׳ ׳×׳—׳× ׳”׳©׳’׳—׳” ׳׳—׳׳™׳¨׳” ׳•׳¨׳¦׳™׳₪׳”, ׳›׳“׳™ ׳©׳×׳•׳›׳׳• ׳׳׳›׳•׳ ׳‘׳ ׳™׳ ׳•׳—׳•׳× ׳•׳‘׳‘׳™׳˜׳—׳•׳ ׳׳׳.</p>
          </div>
          <div className="kosher-details">
            {[
              '׳›׳©׳¨ ׳‘׳“"׳¥ ׳‘׳™׳× ׳™׳•׳¡׳£ ג€” ׳׳—׳× ׳׳¡׳׳›׳•׳™׳•׳× ׳”׳›׳©׳¨׳•׳× ׳”׳׳—׳׳™׳¨׳•׳× ׳‘׳™׳©׳¨׳׳',
              '׳׳¡׳¢׳“׳” ׳—׳׳‘׳™׳× ׳•׳“׳’׳™׳ ׳‘׳׳‘׳“ ג€” ׳׳׳ ׳‘׳©׳¨ ׳׳›׳ ׳¡׳•׳’',
              '׳‘׳“׳™׳§׳•׳× ׳›׳©׳¨׳•׳× ׳©׳•׳˜׳₪׳•׳× ׳•׳‘׳׳×׳™ ׳׳•׳¦׳”׳¨׳•׳×',
              '׳›׳ ׳”׳׳¨׳›׳™׳‘׳™׳ ׳•׳”׳¡׳₪׳§׳™׳ ׳׳׳•׳©׳¨׳™׳ ׳•׳׳‘׳•׳§׳¨׳™׳',
              '׳”׳›׳ ׳× ׳”׳׳–׳•׳ ׳×׳—׳× ׳₪׳™׳§׳•׳— ׳׳׳ ׳•׳¦׳•׳•׳× ׳׳•׳¡׳׳',
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
          <h2 className="section-title section-title-light">׳׳•׳›׳ ׳™׳ ׳׳‘׳•׳ ׳׳‘׳§׳¨?</h2>
          <p className="section-subtitle" style={{ color: 'rgba(248,244,236,0.55)' }}>
            ׳©׳׳¨׳• ׳©׳•׳׳—׳, ׳”׳‘׳™׳׳• ׳׳™׳©׳”׳• ׳©׳׳×׳ ׳׳•׳”׳‘׳™׳ ג€” ׳•׳”׳©׳׳¨ ׳¢׳׳™׳ ׳•
          </p>
          <a href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            ׳”׳–׳׳ ׳× ׳©׳•׳׳—׳
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
