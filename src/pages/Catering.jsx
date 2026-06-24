// ========================================
// דף מגשי אירוח - Catering
// ========================================

import { useState } from 'react';
import CateringCard from '../components/CateringCard/CateringCard';
import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { cateringData } from '../data/cateringData';
import { isValidPhone, isValidEmail, isNotEmpty, isFutureDate } from '../utils/validation';
import useLocalStorage from '../hooks/useLocalStorage';
import './Catering.css';

function Catering() {
  const [cateringRequests, setCateringRequests] = useLocalStorage('cateringRequests', []);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    guests: '',
    eventType: '',
    packageName: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  // לחיצה על "קבל פרטים" בכרטיס
  function handleRequest(pkg) {
    setSelectedPackage(pkg);
    setForm((prev) => ({ ...prev, packageName: pkg.name }));
    // גלילה לטופס
    setTimeout(() => {
      document.getElementById('catering-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const newErrors = {};
    if (!isNotEmpty(form.fullName)) newErrors.fullName = 'נא להזין שם מלא';
    if (!isValidPhone(form.phone)) newErrors.phone = 'מספר טלפון לא תקין';
    if (!isValidEmail(form.email)) newErrors.email = 'כתובת אימייל לא תקינה';
    if (!form.eventDate) newErrors.eventDate = 'נא לבחור תאריך';
    else if (!isFutureDate(form.eventDate)) newErrors.eventDate = 'לא ניתן לבחור תאריך שעבר';
    if (!isNotEmpty(form.guests)) newErrors.guests = 'נא להזין מספר אורחים';
    if (!isNotEmpty(form.eventType)) newErrors.eventType = 'נא לבחור סוג אירוע';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const newRequest = {
        id: `CAT-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        ...form,
        status: 'ממתין לטיפול',
      };
      setCateringRequests((prev) => [...prev, newRequest]);
      setIsSuccess(true);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '2.5rem 0 3rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="קייטרינג"
            title="מגשי אירוח"
            subtitle="מגשים מעוצבים ויוקרתיים לכל סוג אירוע"
          />
        </div>
      </div>

      {/* חבילות */}
      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {cateringData.map((pkg) => (
              <CateringCard key={pkg.id} package={pkg} onRequest={handleRequest} />
            ))}
          </div>
        </div>
      </section>

      {/* טופס בקשה */}
      <section className="section-alt" id="catering-form">
        <div className="container catering-form-wrap">
          <div className="section-header">
            <span className="section-eyebrow">צור קשר</span>
            <h2 className="section-title">בקשת הצעת מחיר</h2>
            <p className="section-subtitle">מלאו את הפרטים ואחד מהצוות שלנו יחזור אליך</p>
            <div className="ornament"><span>✦</span></div>
          </div>

          {isSuccess ? (
            <SuccessMessage
              title="הבקשה נשלחה!"
              message="תודה! אנחנו נחזור אליך בהקדם עם הצעת מחיר מותאמת."
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="form-box">
              {selectedPackage && (
                <div className="catering-selected-pkg">
                  <span>חבילה נבחרת: </span>
                  <strong>{selectedPackage.name}</strong>
                </div>
              )}
              <div className="form-grid">
                <FormInput label="שם מלא" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
                <FormInput label="טלפון" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                <FormInput label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                <FormInput label="תאריך האירוע" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} error={errors.eventDate} required />
                <FormInput label="מספר אורחים" name="guests" type="number" value={form.guests} onChange={handleChange} error={errors.guests} placeholder="כמות משוערת" required />
                <FormInput label="סוג האירוע">
                  <select name="eventType" value={form.eventType} onChange={handleChange} className={`form-select ${errors.eventType ? 'error' : ''}`}>
                    <option value="">בחר סוג אירוע</option>
                    <option value="wedding">חתונה</option>
                    <option value="barmitzvah">בר/בת מצווה</option>
                    <option value="corporate">אירוע חברה</option>
                    <option value="birthday">יום הולדת</option>
                    <option value="meeting">פגישה עסקית</option>
                    <option value="other">אחר</option>
                  </select>
                  {errors.eventType && <span className="form-error">{errors.eventType}</span>}
                </FormInput>
                <div className="form-grid-full">
                  <FormInput label="הערות ובקשות מיוחדות">
                    <textarea name="notes" value={form.notes} onChange={handleChange} className="form-textarea" placeholder="ספרי לנו על האירוע שלך..." />
                  </FormInput>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isLoading}>
                {isLoading ? <span className="spinner"></span> : 'שלח בקשה'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Catering;
