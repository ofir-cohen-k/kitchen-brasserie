import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AccessibilityWidget.css';

const DEFAULTS = {
  fontSize: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  stopAnimations: false,
  readableFont: false,
};
const BTN = 52;

function applySettings(settings) {
  const root = document.documentElement;
  const body = document.body;
  root.style.fontSize = settings.fontSize === 0 ? '' : `${100 + settings.fontSize * 10}%`;
  body.classList.toggle('a11y-high-contrast', settings.highContrast);
  body.classList.toggle('a11y-grayscale', settings.grayscale);
  body.classList.toggle('a11y-highlight-links', settings.highlightLinks);
  body.classList.toggle('a11y-stop-animations', settings.stopAnimations);
  body.classList.toggle('a11y-readable-font', settings.readableFont);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('a11y') || 'null') || DEFAULTS; }
    catch { return DEFAULTS; }
  });
  const [pos, setPos] = useState(null); // { left, top } px — null until mounted
  const btnRef = useRef(null);
  const drag = useRef(null);

  // Init position after mount (needs window.innerWidth)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('a11y-btn-pos'));
      if (saved && typeof saved.left === 'number') { setPos(saved); return; }
    } catch {}
    setPos({ left: window.innerWidth - BTN - 24, top: 80 });
  }, []);

  useEffect(() => {
    if (pos) localStorage.setItem('a11y-btn-pos', JSON.stringify(pos));
  }, [pos]);

  useEffect(() => {
    applySettings(settings);
    localStorage.setItem('a11y', JSON.stringify(settings));
  }, [settings]);

  // ── Mouse drag ──
  function onMouseDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    const r = btnRef.current.getBoundingClientRect();
    drag.current = { sx: e.clientX, sy: e.clientY, sl: r.left, st: r.top, moved: false };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) d.moved = true;
    if (!d.moved) return;
    d.cl = Math.max(0, Math.min(window.innerWidth - BTN, d.sl + dx));
    d.ct = Math.max(0, Math.min(window.innerHeight - BTN, d.st + dy));
    if (btnRef.current) {
      btnRef.current.style.left = d.cl + 'px';
      btnRef.current.style.top  = d.ct + 'px';
    }
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    const d = drag.current; drag.current = null; if (!d) return;
    if (d.moved && d.cl !== undefined) setPos({ left: d.cl, top: d.ct });
    else setOpen(o => !o);
  }

  // ── Touch drag ──
  function onTouchStart(e) {
    const t = e.touches[0];
    const r = btnRef.current.getBoundingClientRect();
    drag.current = { sx: t.clientX, sy: t.clientY, sl: r.left, st: r.top, moved: false };
  }

  function onTouchMove(e) {
    const d = drag.current; if (!d) return;
    const t = e.touches[0];
    const dx = t.clientX - d.sx, dy = t.clientY - d.sy;
    if (!d.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) d.moved = true;
    if (!d.moved) return;
    e.preventDefault();
    d.cl = Math.max(0, Math.min(window.innerWidth - BTN, d.sl + dx));
    d.ct = Math.max(0, Math.min(window.innerHeight - BTN, d.st + dy));
    if (btnRef.current) {
      btnRef.current.style.left = d.cl + 'px';
      btnRef.current.style.top  = d.ct + 'px';
    }
  }

  function onTouchEnd() {
    const d = drag.current; drag.current = null; if (!d) return;
    if (d.moved && d.cl !== undefined) setPos({ left: d.cl, top: d.ct });
    else setOpen(o => !o);
  }

  function toggle(key) { setSettings(s => ({ ...s, [key]: !s[key] })); }
  function changeFontSize(d) { setSettings(s => ({ ...s, fontSize: Math.max(-2, Math.min(4, s.fontSize + d)) })); }
  function reset() { setSettings(DEFAULTS); }

  // Panel placement: prefer left of button; fallback right; clamp to viewport
  function panelStyle() {
    if (!pos) return {};
    const W = window.innerWidth, H = window.innerHeight;
    const PW = 280, PH = 430;
    let left = pos.left - PW - 8;
    if (left < 8) left = pos.left + BTN + 8;
    if (left + PW > W - 8) left = W - PW - 8;
    let top = pos.top;
    if (top + PH > H - 8) top = H - PH - 8;
    if (top < 8) top = 8;
    return { left, top, bottom: 'auto', right: 'auto' };
  }

  return (
    <>
      {/* כפתור גרירה */}
      <button
        ref={btnRef}
        className="a11y-trigger"
        style={pos
          ? { left: pos.left, top: pos.top, bottom: 'auto', right: 'auto', cursor: 'grab' }
          : { opacity: 0, pointerEvents: 'none' }
        }
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label="פתח תפריט נגישות"
        title="גרור להזזה • לחץ לפתיחה"
      >
        <svg viewBox="0 0 100 100" fill="white" aria-hidden="true">
          <circle cx="50" cy="16" r="11"/>
          <path d="M50 30 C30 30 18 42 18 42 L30 44 L26 72 L38 72 L42 55 L58 55 L62 72 L74 72 L70 44 L82 42 C82 42 70 30 50 30Z"/>
        </svg>
      </button>

      {/* פאנל */}
      {open && pos && (
        <div className="a11y-panel" style={panelStyle()} role="dialog" aria-label="אפשרויות נגישות" dir="rtl">
          <div className="a11y-panel-header">
            <h2 className="a11y-panel-title">נגישות</h2>
            <button className="a11y-close" onClick={() => setOpen(false)} aria-label="סגור">✕</button>
          </div>

          <div className="a11y-section-title">גודל טקסט</div>
          <div className="a11y-font-row">
            <button className="a11y-btn" onClick={() => changeFontSize(-1)} aria-label="הקטן טקסט">א־</button>
            <span className="a11y-font-level">
              {settings.fontSize > 0 ? `+${settings.fontSize * 10}%` : settings.fontSize < 0 ? `${settings.fontSize * 10}%` : 'רגיל'}
            </span>
            <button className="a11y-btn" onClick={() => changeFontSize(1)} aria-label="הגדל טקסט">א+</button>
          </div>

          <div className="a11y-section-title">תצוגה</div>
          <div className="a11y-options">
            <button className={`a11y-option ${settings.highContrast ? 'a11y-option-active' : ''}`} onClick={() => toggle('highContrast')}>
              <span className="a11y-option-icon">◑</span>ניגודיות גבוהה
            </button>
            <button className={`a11y-option ${settings.grayscale ? 'a11y-option-active' : ''}`} onClick={() => toggle('grayscale')}>
              <span className="a11y-option-icon">⬛</span>גווני אפור
            </button>
            <button className={`a11y-option ${settings.highlightLinks ? 'a11y-option-active' : ''}`} onClick={() => toggle('highlightLinks')}>
              <span className="a11y-option-icon">🔗</span>הדגש קישורים
            </button>
            <button className={`a11y-option ${settings.stopAnimations ? 'a11y-option-active' : ''}`} onClick={() => toggle('stopAnimations')}>
              <span className="a11y-option-icon">⏸</span>עצור אנימציות
            </button>
            <button className={`a11y-option ${settings.readableFont ? 'a11y-option-active' : ''}`} onClick={() => toggle('readableFont')}>
              <span className="a11y-option-icon">Aa</span>פונט קריא
            </button>
          </div>

          <button className="a11y-reset" onClick={reset}>איפוס הגדרות</button>
          <Link to="/accessibility" className="a11y-statement-link" onClick={() => setOpen(false)}>
            הצהרת נגישות
          </Link>
        </div>
      )}
    </>
  );
}
