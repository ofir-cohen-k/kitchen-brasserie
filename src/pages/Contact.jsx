// ========================================
// דף יצירת קשר - Contact
// ========================================

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { isValidPhone, isValidEmail, isNotEmpty } from '../utils/validation';
import { supabase } from '../lib/supabase';
import './Contact.css';

const WF_KEY = 'c5909312-9ecf-44e6-99a8-74d15e66d0dc';

function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

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
    if (!isNotEmpty(form.subject)) newErrors.subject = 'נא לבחור נושא';
    if (!isNotEmpty(form.message)) newErrors.message = 'נא לכתוב הודעה';
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

    const subjectLabels = {
      reservation: 'הזמנת שולחן',
      catering: 'מגשי אירוח',
      menu: 'שאלה על תפריט',
      general: 'כללי',
    };

    const [dbResult, ejsResult] = await Promise.allSettled([
      supabase.from('contact_messages').insert({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        message: `נושא: ${subjectLabels[form.subject] || form.subject} | ${form.message}`,
      }),
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WF_KEY,
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: `[Kitchen Brasserie] ${subjectLabels[form.subject] || form.subject}`,
          message: form.message,
        }),
      }).then(r => { if (!r.ok) throw new Error(`web3forms ${r.status}`); return r.json(); }),
    ]);
    if (dbResult.status === 'rejected') console.error('Supabase error:', dbResult.reason);
    if (ejsResult.status === 'rejected') console.error('EmailJS error:', ejsResult.reason);

    setIsSuccess(true);
    setIsLoading(false);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <Helmet>
        <title>צור קשר | Kitchen Brasserie — נס ציונה</title>
        <meta name="description" content="צרו קשר עם Kitchen Brasserie — האירוסים 53, קניון קניותר, נס ציונה. טלפון: 073-327-7207. שעות פעילות: א׳-ה׳ 09:00-22:30, ו׳ 09:00-15:00." />
        <link rel="canonical" href="https://kitchenbrasserie.com/contact" />
      </Helmet>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="צור קשר"
            title="נשמח לשמוע ממך"
            subtitle="מלאו את הפרטים ואנחנו נחזור אליכם בהקדם"
          />
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">

          {/* פרטי קשר */}
          <div className="contact-info-col">
            <h2 className="contact-info-title">פרטי יצירת קשר</h2>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon"><MapPin size={18} /></div>
                <div>
                  <strong>כתובת</strong>
                  <p><a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer">האירוסים 53, קניותר, נס ציונה</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <div>
                  <strong>טלפון</strong>
                  <p><a href="tel:0733277207">073-327-7207</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <div>
                  <strong>WhatsApp עסקי</strong>
                  <p><a href="https://wa.me/972557218413" target="_blank" rel="noopener noreferrer">055-721-8413</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Mail size={18} /></div>
                <div>
                  <strong>אימייל</strong>
                  <p><a href="mailto:Kitchbras@gmail.com">Kitchbras@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Clock size={18} /></div>
                <div>
                  <strong>שעות פעילות</strong>
                  <p>ראשון–חמישי: 09:00–22:30</p>
                  <p>שישי: 09:00–15:00</p>
                  <p>שבת: סגור</p>
                </div>
              </div>
            </div>
          </div>

          {/* טופס */}
          <div className="contact-form-col">
            {isSuccess ? (
              <SuccessMessage
                title="ההודעה נשלחה!"
                message="תודה על פנייתך. אנחנו נחזור אליכם בהקדם האפשרי."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="form-box">
                <h3 className="contact-form-title">שלח הודעה</h3>
                <div className="form-grid">
                  <FormInput label="שם מלא" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
                  <FormInput label="טלפון" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                  <FormInput label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                  <FormInput label="נושא">
                    <select name="subject" value={form.subject} onChange={handleChange} className={`form-select ${errors.subject ? 'error' : ''}`}>
                      <option value="">בחר נושא</option>
                      <option value="reservation">הזמנת שולחן</option>
                      <option value="catering">מגשי אירוח</option>
                      <option value="menu">שאלה על תפריט</option>
                      <option value="general">כללי</option>
                    </select>
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </FormInput>
                  <div className="form-grid-full">
                    <FormInput label="הודעה" error={errors.message}>
                      <textarea name="message" value={form.message} onChange={handleChange} className={`form-textarea ${errors.message ? 'error' : ''}`} placeholder="כתבי את הודעתך כאן..." />
                    </FormInput>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isLoading}>
                  {isLoading ? <span className="spinner"></span> : 'שלח הודעה'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Contact;
