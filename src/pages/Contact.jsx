// ========================================
// דף יצירת קשר - Contact
// ========================================

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { isValidPhone, isValidEmail, isNotEmpty } from '../utils/validation';
import { supabase } from '../lib/supabase';
import './Contact.css';

const EJS_SERVICE  = 'service_1n9hlje';
const EJS_TEMPLATE = 'template_658cfl4';
const EJS_KEY      = 'rIR0IVmK1T5H5kpne';

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

    await Promise.allSettled([
      supabase.from('contact_messages').insert({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        message: `נושא: ${subjectLabels[form.subject] || form.subject} | ${form.message}`,
      }),
      emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: form.fullName,
          phone: form.phone,
          from_email: form.email,
          subject: subjectLabels[form.subject] || form.subject,
          message: form.message,
        },
        EJS_KEY
      ),
    ]);

    setIsSuccess(true);
    setIsLoading(false);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
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
                  <p>ראשון–חמישי: 09:00–21:30</p>
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
