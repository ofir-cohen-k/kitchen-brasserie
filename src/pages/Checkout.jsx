// ========================================
// ׳“׳£ ׳¡׳™׳•׳ ׳”׳–׳׳ ׳” - Checkout
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

  // ׳©׳׳™׳¨׳× ׳”׳”׳–׳׳ ׳•׳× ׳‘-LocalStorage
  const [orders, setOrders] = useLocalStorage('foodOrders', []);

  // ׳׳¦׳‘ ׳”׳˜׳•׳₪׳¡
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

  const [errors, setErrors] = useState({});   // ׳©׳’׳™׳׳•׳× ׳˜׳•׳₪׳¡
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null); // ׳׳¡׳₪׳¨ ׳”׳–׳׳ ׳” ׳׳׳—׳¨ ׳׳™׳©׳•׳¨

  // ׳׳ ׳”׳¡׳ ׳¨׳™׳§ - ׳”׳₪׳ ׳™׳” ׳׳×׳₪׳¨׳™׳˜
  if (cartItems.length === 0 && !orderNumber) {
    return (
      <main style={{ paddingTop: '68px' }}>
        <div className="section container">
          <div className="checkout-empty">
            <p>׳”׳¡׳ ׳©׳׳ ׳¨׳™׳§. ׳׳ ׳ ׳™׳×׳ ׳׳‘׳¦׳¢ ׳”׳–׳׳ ׳”.</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              ׳׳×׳₪׳¨׳™׳˜
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ׳¢׳“׳›׳•׳ ׳©׳“׳” ׳‘׳˜׳•׳₪׳¡
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // ׳׳ ׳§׳” ׳©׳’׳™׳׳” ׳‘׳©׳“׳” ׳©׳”׳׳©׳×׳׳© ׳¢׳•׳¨׳
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  // ׳‘׳“׳™׳§׳× ׳×׳§׳™׳ ׳•׳×
  function validate() {
    const newErrors = {};
    if (!isNotEmpty(form.fullName)) newErrors.fullName = '׳ ׳ ׳׳”׳–׳™׳ ׳©׳ ׳׳׳';
    if (!isValidPhone(form.phone)) newErrors.phone = '׳׳¡׳₪׳¨ ׳˜׳׳₪׳•׳ ׳׳ ׳×׳§׳™׳';
    if (!isValidEmail(form.email)) newErrors.email = '׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳׳ ׳×׳§׳™׳ ׳”';
    if (form.deliveryType === 'delivery' && !isNotEmpty(form.address)) {
      newErrors.address = '׳ ׳ ׳׳”׳–׳™׳ ׳›׳×׳•׳‘׳× ׳׳׳©׳׳•׳—';
    }
    if (form.deliveryType === 'delivery' && !isNotEmpty(form.city)) {
      newErrors.city = '׳ ׳ ׳׳”׳–׳™׳ ׳¢׳™׳¨';
    }
    return newErrors;
  }

  // ׳©׳׳™׳—׳× ׳”׳˜׳•׳₪׳¡
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // ׳™׳¦׳™׳¨׳× ׳׳¡׳₪׳¨ ׳”׳–׳׳ ׳” ׳׳§׳¨׳׳™
    const newOrderNumber = `KB-${Date.now().toString().slice(-6)}`;

    // ׳™׳¦׳™׳¨׳× ׳׳•׳‘׳™׳™׳§׳˜ ׳”׳”׳–׳׳ ׳”
    const newOrder = {
      id: newOrderNumber,
      date: new Date().toISOString(),
      customer: form,
      items: cartItems,
      totalPrice,
      status: '׳׳׳×׳™׳ ׳׳׳™׳©׳•׳¨',
    };

    // ׳©׳׳™׳¨׳” ׳‘-LocalStorage
    setTimeout(() => {
      setOrders((prev) => [...prev, newOrder]);
      clearCart();
      setOrderNumber(newOrderNumber);
      setIsLoading(false);
    }, 1000);
  }

  // ׳”׳¦׳’׳× ׳”׳¦׳׳—׳”
  if (orderNumber) {
    return (
      <main style={{ paddingTop: '68px' }}>
        <section className="section">
          <div className="container checkout-success-wrap">
            <SuccessMessage
              title="׳”׳”׳–׳׳ ׳” ׳ ׳©׳׳—׳” ׳‘׳”׳¦׳׳—׳”! נ‰"
              message="׳×׳•׳“׳” ׳¢׳ ׳”׳–׳׳ ׳×׳. ׳׳ ׳—׳ ׳• ׳ ׳—׳–׳•׳¨ ׳׳׳™׳ ׳‘׳§׳¨׳•׳‘ ׳׳׳™׳©׳•׳¨."
              extra={`׳׳¡׳₪׳¨ ׳”׳–׳׳ ׳”: ${orderNumber}`}
            />
            <button
              className="btn btn-primary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => navigate('/menu')}
            >
              ׳—׳–׳¨׳” ׳׳×׳₪׳¨׳™׳˜
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
            eyebrow="׳¡׳™׳•׳ ׳”׳–׳׳ ׳”"
            title="׳₪׳¨׳˜׳™ ׳”׳”׳–׳׳ ׳”"
            subtitle="׳׳׳׳• ׳׳× ׳”׳₪׳¨׳˜׳™׳ ׳•׳׳ ׳—׳ ׳• ׳ ׳“׳׳’ ׳׳›׳ ׳”׳©׳׳¨"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="checkout-grid">

            {/* ׳˜׳•׳₪׳¡ */}
            <div className="checkout-form-col">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-box">
                  <h3 className="checkout-section-title">׳₪׳¨׳˜׳™׳ ׳׳™׳©׳™׳™׳</h3>
                  <div className="form-grid">
                    <FormInput
                      label="׳©׳ ׳׳׳"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      placeholder="׳™׳©׳¨׳׳ ׳™׳©׳¨׳׳׳™"
                      required
                    />
                    <FormInput
                      label="׳˜׳׳₪׳•׳"
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
                        label="׳׳™׳׳™׳™׳"
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
                  <h3 className="checkout-section-title">׳׳•׳₪׳ ׳§׳‘׳׳”</h3>
                  <div className="delivery-options">
                    <label className={`delivery-option ${form.deliveryType === 'delivery' ? 'delivery-option-active' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="delivery"
                        checked={form.deliveryType === 'delivery'}
                        onChange={handleChange}
                      />
                      נ— ׳׳©׳׳•׳— ׳׳‘׳™׳×
                    </label>
                    <label className={`delivery-option ${form.deliveryType === 'pickup' ? 'delivery-option-active' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={form.deliveryType === 'pickup'}
                        onChange={handleChange}
                      />
                      נ  ׳׳™׳¡׳•׳£ ׳¢׳¦׳׳™
                    </label>
                  </div>

                  {form.deliveryType === 'delivery' && (
                    <div className="form-grid" style={{ marginTop: '1rem' }}>
                      <FormInput
                        label="׳›׳×׳•׳‘׳×"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                        placeholder="׳¨׳—׳•׳‘ ׳•׳׳¡׳₪׳¨ ׳‘׳™׳×"
                        required
                      />
                      <FormInput
                        label="׳¢׳™׳¨"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        error={errors.city}
                        placeholder="׳©׳ ׳”׳¢׳™׳¨"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="form-box" style={{ marginTop: '1.5rem' }}>
                  <h3 className="checkout-section-title">׳×׳©׳׳•׳ (׳”׳“׳’׳׳” ׳‘׳׳‘׳“)</h3>
                  <div className="payment-options">
                    {[
                      { value: 'cash', label: 'נ’µ ׳׳–׳•׳׳' },
                      { value: 'credit', label: 'נ’³ ׳›׳¨׳˜׳™׳¡ ׳׳©׳¨׳׳™' },
                      { value: 'bit', label: 'נ“± ׳‘׳™׳˜' },
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
                  <p className="checkout-payment-note">* ׳–׳”׳• ׳׳ ׳’׳ ׳•׳ ׳”׳“׳’׳׳” ׳‘׳׳‘׳“. ׳׳ ׳׳×׳‘׳¦׳¢ ׳×׳©׳׳•׳ ׳׳׳™׳×׳™.</p>
                </div>

                <div className="form-box" style={{ marginTop: '1.5rem' }}>
                  <FormInput label="׳”׳¢׳¨׳•׳× ׳׳”׳–׳׳ ׳”">
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="׳׳׳¨׳’׳™׳•׳×, ׳‘׳§׳©׳•׳× ׳׳™׳•׳—׳“׳•׳×..."
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
                  {isLoading ? <span className="spinner"></span> : '׳׳™׳©׳•׳¨ ׳”׳–׳׳ ׳”'}
                </button>
              </form>
            </div>

            {/* ׳¡׳™׳›׳•׳ ׳”׳–׳׳ ׳” */}
            <div className="checkout-summary-col">
              <div className="form-box checkout-summary">
                <h3 className="checkout-section-title">׳¡׳™׳›׳•׳ ׳”׳–׳׳ ׳”</h3>
                <ul className="summary-items">
                  {cartItems.map((item) => (
                    <li key={item.id} className="summary-item">
                      <span className="summary-name">{item.name} ֳ— {item.quantity}</span>
                      <span className="summary-price">ג‚×{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="summary-total">
                  <span>׳¡׳”"׳› ׳׳×׳©׳׳•׳</span>
                  <span>ג‚×{totalPrice}</span>
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
