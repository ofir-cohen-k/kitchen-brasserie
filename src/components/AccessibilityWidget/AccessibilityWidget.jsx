import { useState, useEffect } from 'react';
import './AccessibilityWidget.css';

const DEFAULTS = {
  fontSize: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  stopAnimations: false,
  readableFont: false,
};

function applySettings(settings) {
  const root = document.documentElement;
  const body = document.body;

  // font size: steps of 10%
  root.style.fontSize = settings.fontSize === 0 ? '' : `${100 + settings.fontSize * 10}%`;

  // classes on body
  body.classList.toggle('a11y-high-contrast', settings.highContrast);
  body.classList.toggle('a11y-grayscale', settings.grayscale);
  body.classList.toggle('a11y-highlight-links', settings.highlightLinks);
  body.classList.toggle('a11y-stop-animations', settings.stopAnimations);
  body.classList.toggle('a11y-readable-font', settings.readableFont);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('a11y') || 'null') || DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    applySettings(settings);
    localStorage.setItem('a11y', JSON.stringify(settings));
  }, [settings]);

  function toggle(key) {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  }

  function changeFontSize(delta) {
    setSettings(s => ({ ...s, fontSize: Math.max(-2, Math.min(4, s.fontSize + delta)) }));
  }

  function reset() {
    setSettings(DEFAULTS);
  }

  return (
    <>
      {/* כפתור פתיחה */}
      <button
        className="a11y-trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="1.5"/>
          <path d="M9 9h6M12 9v5M9 20l3-6 3 6"/>
          <path d="M7.5 14.5c-.8 1.2-1.5 2.8-1.5 4a2 2 0 0 0 4 0"/>
          <path d="M16.5 14.5c.8 1.2 1.5 2.8 1.5 4a2 2 0 0 1-4 0"/>
        </svg>
      </button>

      {/* פאנל */}
      {open && (
        <div className="a11y-panel" role="dialog" aria-label="אפשרויות נגישות" dir="rtl">
          <div className="a11y-panel-header">
            <h2 className="a11y-panel-title">נגישות</h2>
            <button className="a11y-close" onClick={() => setOpen(false)} aria-label="סגור">✕</button>
          </div>

          <div className="a11y-section-title">גודל טקסט</div>
          <div className="a11y-font-row">
            <button className="a11y-btn" onClick={() => changeFontSize(-1)} aria-label="הקטן טקסט">א־</button>
            <span className="a11y-font-level">{settings.fontSize > 0 ? `+${settings.fontSize * 10}%` : settings.fontSize < 0 ? `${settings.fontSize * 10}%` : 'רגיל'}</span>
            <button className="a11y-btn" onClick={() => changeFontSize(1)} aria-label="הגדל טקסט">א+</button>
          </div>

          <div className="a11y-section-title">תצוגה</div>
          <div className="a11y-options">
            <button
              className={`a11y-option ${settings.highContrast ? 'a11y-option-active' : ''}`}
              onClick={() => toggle('highContrast')}
            >
              <span className="a11y-option-icon">◑</span>
              ניגודיות גבוהה
            </button>
            <button
              className={`a11y-option ${settings.grayscale ? 'a11y-option-active' : ''}`}
              onClick={() => toggle('grayscale')}
            >
              <span className="a11y-option-icon">⬛</span>
              גווני אפור
            </button>
            <button
              className={`a11y-option ${settings.highlightLinks ? 'a11y-option-active' : ''}`}
              onClick={() => toggle('highlightLinks')}
            >
              <span className="a11y-option-icon">🔗</span>
              הדגש קישורים
            </button>
            <button
              className={`a11y-option ${settings.stopAnimations ? 'a11y-option-active' : ''}`}
              onClick={() => toggle('stopAnimations')}
            >
              <span className="a11y-option-icon">⏸</span>
              עצור אנימציות
            </button>
            <button
              className={`a11y-option ${settings.readableFont ? 'a11y-option-active' : ''}`}
              onClick={() => toggle('readableFont')}
            >
              <span className="a11y-option-icon">Aa</span>
              פונט קריא
            </button>
          </div>

          <button className="a11y-reset" onClick={reset}>איפוס הגדרות</button>

          <a href="/accessibility" className="a11y-statement-link" onClick={() => setOpen(false)}>
            הצהרת נגישות
          </a>
        </div>
      )}
    </>
  );
}
