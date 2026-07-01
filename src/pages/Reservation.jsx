// ========================================
// דף הזמנת שולחן - Reservation
// ========================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { isValidPhone, isValidEmail, isNotEmpty, isFutureDate, isValidGuestCount } from '../utils/validation';
import { supabase } from '../lib/supabase';
import './Reservation.css';

function Reservation() {
  const [searchParams] = useSearchParams(); // קריאת פרמטרים מה-URL (שם אירוע)

  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // אתחול הטופס
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    seating: 'inside',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  // אם הגיע מדף אירועים - ממלא את שם האירוע בהערות
  useEffect(() => {
    const eventName = searchParams.get('event');
    if (eventName) {
      setForm((prev) => ({ ...prev, notes: `הזמנה לאירוע: ${eventName}` }));
    }
  }, [searchParams]);

  // עדכון שדה
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  // בדיקת תקינות
  function validate() {
    const newErrors = {};
    if (!isNotEmpty(form.fullName)) newErrors.fullName = 'נא להזין שם מלא';
    if (!isValidPhone(form.phone)) newErrors.phone = 'מספר טלפון לא תקין';
    if (!isValidEmail(form.email)) newErrors.email = 'כתובת אימייל לא תקינה';
    if (!form.date) newErrors.date = 'נא לבחור תאריך';
    else if (!isFutureDate(form.date)) newErrors.date = 'לא ניתן לבחור תאריך שעבר';
    if (!form.time) newErrors.time = 'נא לבחור שעה';
    if (!isValidGuestCount(form.guests)) newErrors.guests = 'מספר סועדים חייב להיות בין 1 ל-20';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const newConfirmNumber = `RES-${Date.now().toString().slice(-6)}`;

    const { error } = await supabase.from('reservations').insert({
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      notes: `${form.seating ? 'ישיבה: ' + form.seating : ''}${form.notes ? ' | ' + form.notes : ''}`,
    });

    if (error) {
      console.error(error);
    }
    setConfirmNumber(newConfirmNumber);
    setIsSuccess(true);
    setIsLoading(false);
  }

  // הצגת הצלחה
  if (isSuccess) {
    return (
      <main style={{ paddingTop: '68px' }}>
        <section className="section">
          <div className="container reservation-success">
            <SuccessMessage
              title="ההזמנה נשלחה בהצלחה!"
              message="אנחנו נאשר את ההזמנה שלך בהקדם."
              extra={`מספר אישור: ${confirmNumber}`}
            />
            <button
              className="btn btn-outline"
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setIsSuccess(false);
                setForm({ fullName: '', phone: '', email: '', date: '', time: '', guests: '2', seating: 'inside', notes: '' });
              }}
            >
              הזמנה חדשה
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '2.5rem 0 3rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="הזמנת שולחן"
            title="הזמינו אצלנו"
            subtitle="מלאו את הפרטים ואנחנו נאשר את ההזמנה"
          />
        </div>
      </div>

      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <a
            href="https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}
          >
            הזמנה מהירה דרך Tabit
          </a>
          <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
            או מלאו את הטופס למטה
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container reservation-wrap">
          <form onSubmit={handleSubmit} noValidate className="form-box">

            <h3 className="res-section-title">פרטים אישיים</h3>
            <div className="form-grid">
              <FormInput label="שם מלא" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="ישראל ישראלי" required />
              <FormInput label="טלפון" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="050-1234567" required />
              <div className="form-grid-full">
                <FormInput label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" required />
              </div>
            </div>

            <h3 className="res-section-title" style={{ marginTop: '1.5rem' }}>פרטי ההזמנה</h3>
            <div className="form-grid">
              <FormInput label="תאריך" name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} required />
              <FormInput label="שעה" name="time" type="time" value={form.time} onChange={handleChange} error={errors.time} required />
              <FormInput label="מספר סועדים (1-20)" name="guests" type="number" value={form.guests} onChange={handleChange} error={errors.guests} required />
              <FormInput label="אזור ישיבה">
                <select name="seating" value={form.seating} onChange={handleChange} className="form-select">
                  <option value="inside">פנים המסעדה</option>
                  <option value="outside">חוץ / גינה</option>
                  <option value="bar">בר</option>
                  <option value="private">חדר פרטי</option>
                </select>
              </FormInput>
              <div className="form-grid-full">
                <FormInput label="הערות מיוחדות">
                  <textarea name="notes" value={form.notes} onChange={handleChange} className="form-textarea" placeholder="אלרגיות, בקשות מיוחדות, אירוע מיוחד..." />
                </FormInput>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '1.5rem', padding: '0.85rem 2.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? <span className="spinner"></span> : 'שלח הזמנה'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Reservation;
