import { useState, useCallback } from 'react';
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

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = useCallback(({ numPages }) => setNumPages(numPages), []);

  return (
    <div className="pdf-doc">
      <Document
        file={file}
        onLoadSuccess={onLoadSuccess}
        loading={<div className="pdf-loading">טוען תפריט...</div>}
        error={<div className="pdf-loading">שגיאה בטעינת התפריט</div>}
      >
        {numPages && Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            className="pdf-page"
            width={Math.min(window.innerWidth - 48, 860)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}

function PrivateEvents() {
  const [active, setActive] = useState('silver');
  const current = tiers.find(t => t.id === active);

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, אירועי חברה ועוד — בחרו מסלול וגלו מה כלול"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">

          <div className="tier-tabs">
            {tiers.map(t => (
              <button
                key={t.id}
                className={`tier-tab tier-tab--${t.id}${active === t.id ? ' tier-tab--active' : ''}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pdf-viewer-wrap">
            <PdfViewer key={current.file} file={current.file} />
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
    </main>
  );
}

export default PrivateEvents;
