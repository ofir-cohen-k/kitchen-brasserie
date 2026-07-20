import { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PageTitle from '../components/PageTitle/PageTitle';
import './PrivateEvents.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const tiers = [
  { id: 'silver',   label: 'Silver',   file: '/מנות קיטשן/silver_1.pdf' },
  { id: 'gold',     label: 'Gold',     file: '/מנות קיטשן/gold.pdf' },
  { id: 'platinum', label: 'Platinum', file: '/מנות קיטשן/platinum_2.pdf' },
  { id: 'brunch',   label: 'Brunch',   file: '/מנות קיטשן/אירועי בוקר.pdf' },
];

const CARD_WIDTH = Math.min(typeof window !== 'undefined' ? Math.floor((window.innerWidth - 96) / 4) : 280, 320);
const MODAL_WIDTH = Math.min(typeof window !== 'undefined' ? window.innerWidth - 48 : 700, 700);

function TierCard({ tier, onClick }) {
  return (
    <button className="tier-card-btn" onClick={onClick} aria-label={`פתח תפריט ${tier.label}`}>
      <Document
        file={tier.file}
        loading={<div className="card-loading" />}
        error={<div className="card-loading">⚠</div>}
      >
        <Page
          pageNumber={1}
          width={CARD_WIDTH}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="tier-card-page"
        />
      </Document>
      <div className="tier-card-overlay">
        <span className="tier-card-label">{tier.label}</span>
        <span className="tier-card-cta">לחץ לתפריט ←</span>
      </div>
    </button>
  );
}

function MenuModal({ tier, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="סגור">✕</button>
        <Document
          file={tier.file}
          loading={<div className="pdf-loading">טוען תפריט...</div>}
        >
          <Page
            pageNumber={2}
            width={MODAL_WIDTH}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}

function PrivateEvents() {
  const [openTier, setOpenTier] = useState(null);

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, אירועי חברה ועוד — לחצו על מסלול לצפייה בתפריט"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="tiers-row">
            {tiers.map(t => (
              <TierCard key={t.id} tier={t} onClick={() => setOpenTier(t)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container private-events-cta">
          <h2 className="section-title">רוצים לשמוע עוד?</h2>
          <p className="section-subtitle">צרו קשר ונבנה יחד את האירוע המושלם עבורכם</p>
          <a href="tel:0733277207" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            צלצלו עכשיו: 073-327-7207
          </a>
        </div>
      </section>

      {openTier && <MenuModal tier={openTier} onClose={() => setOpenTier(null)} />}
    </main>
  );
}

export default PrivateEvents;
