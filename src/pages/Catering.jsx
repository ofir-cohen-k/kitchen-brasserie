import { useState, useMemo, useEffect } from 'react';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import CateringCard from '../components/CateringCard/CateringCard';
import PageTitle from '../components/PageTitle/PageTitle';
import { cateringData } from '../data/cateringData';
import './Catering.css';

const WF_KEY = 'c5909312-9ecf-44e6-99a8-74d15e66d0dc';

const categoryLabels = {
  all:        'הכל',
  sandwiches: 'כריכונים',
  produce:    'ירקות ומטבלים',
  salads:     'סלטים',
  hot:        'מנות חמות',
  pizza:      'מהטאבון',
  sweets:     'מתוקים',
  drinks:     'שתייה',
};

const WA_HREF = 'https://api.whatsapp.com/send?phone=972557218413&text=היי,+אנחנו+מעוניינים+במגשי+אירוח,+נשמח+לקבל+פרטים.';
const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EMPTY_FORM = { fullName: '', phone: '', email: '', eventDate: '', notes: '' };

function Catering() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const lock = () => {
      const locked = window.innerWidth > 960;
      document.documentElement.style.overflow = locked ? 'hidden' : '';
      document.body.style.overflow = locked ? 'hidden' : '';
    };
    lock();
    window.addEventListener('resize', lock);
    return () => {
      window.removeEventListener('resize', lock);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const filteredItems = useMemo(() =>
    activeCategory === 'all'
      ? cateringData
      : cateringData.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const cartItems = useMemo(() =>
    cateringData
      .filter(item => (cart[item.id] || 0) > 0)
      .map(item => ({ ...item, quantity: cart[item.id] })),
    [cart]
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + item.startingPrice * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function updateCart(id, delta) {
    setCart(prev => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }

  function removeFromCart(id) {
    setCart(prev => { const { [id]: _, ...rest } = prev; return rest; });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const itemsList = cartItems
        .map(item => `• ${item.name} ×${item.quantity} — ₪${item.startingPrice * item.quantity}`)
        .join('\n');
      const message = [
        `מגשים שנבחרו:\n${itemsList}`,
        `סה"כ משוער: ₪${cartTotal}`,
        form.notes ? `הערות: ${form.notes}` : '',
      ].filter(Boolean).join('\n\n');

      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WF_KEY,
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: `[Kitchen Brasserie] בקשת מגשי אירוח — ${form.fullName}`,
          message,
          event_date: form.eventDate || 'לא צוין',
        }),
      });
      if (!r.ok) throw new Error();
      setSuccess(true);
      setCart({});
      setForm(EMPTY_FORM);
    } catch {
      alert('אירעה שגיאה, נסו שנית או פנו בוואטסאפ.');
    }
    setLoading(false);
  }

  function openModal() {
    setShowDrawer(false);
    setShowModal(true);
  }

  const CartContent = ({ onSend }) => (
    <>
      {cartItems.length === 0 ? (
        <div className="cc-empty">
          <ShoppingCart size={32} strokeWidth={1.2} />
          <p>הסל ריק</p>
          <p className="cc-empty-sub">הוסיפו מגשים מהרשימה</p>
        </div>
      ) : (
        <>
          <ul className="cc-list">
            {cartItems.map(item => (
              <li key={item.id} className="cc-item">
                <img src={item.image} alt={item.name} className="cc-item-img" />
                <div className="cc-item-info">
                  <p className="cc-item-name">{item.name}</p>
                  <p className="cc-item-price">₪{item.startingPrice * item.quantity}</p>
                </div>
                <div className="cc-qty">
                  <button onClick={() => updateCart(item.id, -1)} aria-label="הפחת"><Minus size={13} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCart(item.id, 1)} aria-label="הוסף"><Plus size={13} /></button>
                </div>
                <button className="cc-remove" onClick={() => removeFromCart(item.id)} aria-label="הסר"><X size={13} /></button>
              </li>
            ))}
          </ul>
          <div className="cc-total">
            <span>סה"כ משוער</span>
            <span className="cc-total-price">₪{cartTotal}</span>
          </div>
          <button className="btn btn-primary cc-send-btn" onClick={onSend}>
            שלח בקשה
          </button>
          <p className="cc-note">* המחירים משוערים ועשויים להשתנות לאחר אישור</p>
        </>
      )}
    </>
  );

  return (
    <main className="catering-page">

      {/* כותרת */}
      <div className="section-dark catering-page-hero">
        <div className="container">
          <PageTitle
            eyebrow="קייטרינג"
            title="מגשי אירוח"
            subtitle="מגשים מעוצבים ויוקרתיים לכל סוג אירוע"
          />
        </div>
      </div>

      {/* 3 עמודות */}
      <div className="catering-cols">

        {/* ימין — קטגוריות */}
        <nav className="catering-cats-col" aria-label="קטגוריות">
          <h3 className="catering-cats-title">התפריט שלנו</h3>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`catering-cat-btn${activeCategory === key ? ' catering-cat-active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* אמצע — מגשים */}
        <div className="catering-products-col">
          <p className="catering-col-intro">מתכננים אירוע? בחרו מגשים, ציינו תאריך ואנחנו נחזור אליכם עם הצעת מחיר.</p>
          <div className="catering-grid">
            {filteredItems.map(item => (
              <CateringCard
                key={item.id}
                package={item}
                quantity={cart[item.id] || 0}
                onAdd={() => updateCart(item.id, 1)}
                onUpdate={delta => updateCart(item.id, delta)}
              />
            ))}
          </div>
        </div>

        {/* שמאל — סל */}
        <aside className="catering-cart-col">
          <div className="cc-header">
            <ShoppingCart size={17} />
            <span>הסל שלי</span>
            {cartCount > 0 && <span className="cc-badge">{cartCount}</span>}
          </div>
          <div className="cc-body">
            <CartContent onSend={openModal} />
          </div>
        </aside>

      </div>

      {/* כפתור מובייל */}
      {cartCount > 0 && (
        <button className="catering-fab" onClick={() => setShowDrawer(true)}>
          <ShoppingCart size={19} />
          <span>הסל שלי ({cartCount})</span>
          <span className="catering-fab-total">₪{cartTotal}</span>
        </button>
      )}

      {/* מגירת מובייל */}
      {showDrawer && (
        <div className="catering-backdrop" onClick={() => setShowDrawer(false)}>
          <div className="catering-drawer" onClick={e => e.stopPropagation()} dir="rtl">
            <div className="catering-drawer-header">
              <span>הסל שלי</span>
              <button onClick={() => setShowDrawer(false)}><X size={20} /></button>
            </div>
            <CartContent onSend={openModal} />
          </div>
        </div>
      )}

      {/* מודאל שליחה */}
      {showModal && (
        <div className="catering-backdrop catering-modal-backdrop" onClick={() => { if (!success) setShowModal(false); }}>
          <div className="catering-modal" onClick={e => e.stopPropagation()} dir="rtl">
            <button className="catering-modal-close" onClick={() => { setShowModal(false); setSuccess(false); }}><X size={19} /></button>

            {success ? (
              <div className="catering-success">
                <span className="catering-success-icon">✓</span>
                <h3>הבקשה נשלחה!</h3>
                <p>קיבלנו את פרטיכם ונחזור אליכם בהקדם לאישור ותיאום.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop: '1.25rem' }} onClick={() => { setShowModal(false); setSuccess(false); }}>
                  סגור
                </button>
              </div>
            ) : (
              <>
                <h3 className="catering-modal-title">שליחת בקשה</h3>
                <p className="catering-modal-sub">נחזור אליכם תוך 24 שעות לאישור ותיאום</p>

                <div className="catering-modal-summary">
                  {cartItems.map(item => (
                    <div key={item.id} className="catering-summary-row">
                      <span>{item.name} ×{item.quantity}</span>
                      <span>₪{item.startingPrice * item.quantity}</span>
                    </div>
                  ))}
                  <div className="catering-summary-row catering-summary-total">
                    <span>סה"כ משוער</span>
                    <span>₪{cartTotal}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="catering-modal-form">
                  <div className="catering-modal-grid">
                    <div className="cm-field">
                      <label>שם מלא *</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="ישראל ישראלי" />
                    </div>
                    <div className="cm-field">
                      <label>טלפון *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="050-000-0000" />
                    </div>
                    <div className="cm-field">
                      <label>אימייל *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="example@mail.com" />
                    </div>
                    <div className="cm-field">
                      <label>תאריך האירוע</label>
                      <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
                    </div>
                    <div className="cm-field cm-full">
                      <label>הערות</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="בקשות מיוחדות, מספר משתתפים..." />
                    </div>
                  </div>
                  <div className="catering-modal-footer">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'שולח...' : 'שליחת בקשה'}
                    </button>
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-outline catering-wa-btn">
                      {WA_ICON} וואטסאפ
                    </a>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Catering;
