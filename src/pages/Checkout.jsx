// ========================================
// דף סיום הזמנה - Checkout
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { isValidPhone, isValidEmail, isNotEmpty } from '../utils/validation';
import useLocalStorage from '../hooks/useLocalStorage';
import './Checkout.css';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // שמירת ההזמנות ב-LocalStorage
  const [orders, setOrders] = useLocalStorage('foodOrders', []);

  // מצב הטופס
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
    deliveryType: 'delivery', // delivery / pickup
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState({});   // שגיאות טופס
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null); // מספר הזמנה לאחר אישור

  // אם הסל ריק - הפניה לתפריט
  if (cartItems.length === 0 && !orderNumber) {
    return (
      <main style={{ paddingTop: '68px' }}>
        <div className="section container">
          <div className="checkout-empty">
            <p>הסל שלך ריק. לא ניתן לבצע הזמנה.</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              לתפריט
            </button>
          </div>
        </div>
      </main>
    );
  }

  // עדכון שדה בטופס
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // מנקה שגיאה בשדה שהמשתמש עורך
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  // בדיקת תקינות
  function validate() {
    const newErrors = {};
    if (!isNotEmpty(form.fullName)) newErrors.fullName = 'נא להזין שם מלא';
    if (!isValidPhone(form.phone)) newErrors.phone = 'מספר טלפון לא תקין';
    if (!isValidEmail(form.email)) newErrors.email = 'כתובת אימייל לא תקינה';
    if (form.deliveryType === 'delivery' && !isNotEmpty(form.address)) {
      newErrors.address = 'נא להזין כתובת למשלוח';
    }
    if (form.deliveryType === 'delivery' && !isNotEmpty(form.city)) {
      newErrors.city = 'נא להזין עיר';
    }
    return newErrors;
  }

  // שליחת הטופס
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // יצירת מספר הזמנה אקראי
    const newOrderNumber = `KB-${Date.now().toString().slice(-6)}`;

    // יצירת אובייקט ההזמנה
    const newOrder = {
      id: newOrderNumber,
      date: new Date().toISOString(),
      customer: form,
      items: cartItems,
      totalPrice,
      status: 'ממתין לאישור',
    };

    // שמירה ב-LocalStorage
    setTimeout(() => {
      setOrders((prev) => [...prev, newOrder]);
      clearCart();
      setOrderNumber(newOrderNumber);
      setIsLoading(false);
    }, 1000);
  }

  // הצגת הצלחה
  if (orderNumber) {
    return (
      <main style={{ paddingTop: '68px' }}>
        <section className="section">
          <div className="container checkout-success-wrap">
            <SuccessMessage
              title="ההזמנה נשלחה בהצלחה! 🎉"
              message="תודה על הזמנתך. אנחנו נחזור אליך בקרוב לאישור."
              extra={`מספר הזמנה: ${orderNumber}`}
            />
            <button
              className="btn btn-primary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => navigate('/menu')}
            >
              חזרה לתפריט
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="סיום הזמנה"
            title="פרטי ההזמנה"
            subtitle="מלאו את הפרטים ואנחנו נדאג לכל השאר"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="checkout-grid">

            {/* טופס */}
            <div className="checkout-form-col">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-box">
                  <h3 className="checkout-section-title">פרטים אישיים</h3>
                  <div className="form-grid">
                    <FormInput
                      label="שם מלא"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      placeholder="ישראל ישראלי"
                      required
                    />
                    <FormInput
                      label="טלפון"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="050-1234567"
                      required
                    />
                    <div className="form-grid-full">
                      <FormInput
                        label="אימייל"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-box" style={{ marginTop: '1.5rem' }}>
                  <h3 className="checkout-section-title">אופן קבלה</h3>
                  <div className="delivery-options">
                    <label className={`delivery-option ${form.deliveryType === 'delivery' ? 'delivery-option-active' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="delivery"
                        checked={form.deliveryType === 'delivery'}
                        onChange={handleChange}
                      />
                      🚗 משלוח לבית
                    </label>
                    <label className={`delivery-option ${form.deliveryType === 'pickup' ? 'delivery-option-active' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={form.deliveryType === 'pickup'}
                        onChange={handleChange}
                      />
                      🏠 איסוף עצמי
                    </label>
                  </div>

                  {form.deliveryType === 'delivery' && (
                    <div className="form-grid" style={{ marginTop: '1rem' }}>
                      <FormInput
                        label="כתובת"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                        placeholder="רחוב ומספר בית"
                        required
                      />
                      <FormInput
                        label="עיר"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        error={errors.city}
                        placeholder="שם העיר"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="form-box" style={{ marginTop: '1.5rem' }}>
                  <h3 className="checkout-section-title">תשלום (הדגמה בלבד)</h3>
                  <div className="payment-options">
                    {[
                      { value: 'cash', label: '💵 מזומן' },
                      { value: 'credit', label: '💳 כרטיס אשראי' },
                      { value: 'bit', label: '📱 ביט' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`payment-option ${form.paymentMethod === opt.value ? 'payment-option-active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.value}
                          checked={form.paymentMethod === opt.value}
                          onChange={handleChange}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <p className="checkout-payment-note">* זהו מנגנון הדגמה בלבד. לא מתבצע תשלום אמיתי.</p>
                </div>

                <div className="form-box" style={{ marginTop: '1.5rem' }}>
                  <FormInput label="הערות להזמנה">
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="אלרגיות, בקשות מיוחדות..."
                      className="form-textarea"
                    />
                  </FormInput>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  style={{ marginTop: '1.5rem', padding: '1rem' }}
                  disabled={isLoading}
                >
                  {isLoading ? <span className="spinner"></span> : 'אישור הזמנה'}
                </button>
              </form>
            </div>

            {/* סיכום הזמנה */}
            <div className="checkout-summary-col">
              <div className="form-box checkout-summary">
                <h3 className="checkout-section-title">סיכום הזמנה</h3>
                <ul className="summary-items">
                  {cartItems.map((item) => (
                    <li key={item.id} className="summary-item">
                      <span className="summary-name">{item.name} × {item.quantity}</span>
                      <span className="summary-price">₪{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="summary-total">
                  <span>סה"כ לתשלום</span>
                  <span>₪{totalPrice}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
