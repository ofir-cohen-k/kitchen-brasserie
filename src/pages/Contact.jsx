// ========================================
// ׳“׳£ ׳™׳¦׳™׳¨׳× ׳§׳©׳¨ - Contact
// ========================================

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import FormInput from '../components/FormInput/FormInput';
import SuccessMessage from '../components/SuccessMessage/SuccessMessage';
import PageTitle from '../components/PageTitle/PageTitle';
import { isValidPhone, isValidEmail, isNotEmpty } from '../utils/validation';
import { supabase } from '../lib/supabase';
import './Contact.css';

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
    if (!isNotEmpty(form.fullName)) newErrors.fullName = '׳ ׳ ׳׳”׳–׳™׳ ׳©׳ ׳׳׳';
    if (!isValidPhone(form.phone)) newErrors.phone = '׳׳¡׳₪׳¨ ׳˜׳׳₪׳•׳ ׳׳ ׳×׳§׳™׳';
    if (!isValidEmail(form.email)) newErrors.email = '׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳׳ ׳×׳§׳™׳ ׳”';
    if (!isNotEmpty(form.subject)) newErrors.subject = '׳ ׳ ׳׳‘׳—׳•׳¨ ׳ ׳•׳©׳';
    if (!isNotEmpty(form.message)) newErrors.message = '׳ ׳ ׳׳›׳×׳•׳‘ ׳”׳•׳“׳¢׳”';
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
    const { error } = await supabase.from('contact_messages').insert({
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      message: `׳ ׳•׳©׳: ${form.subject} | ${form.message}`,
    });
    if (error) console.error(error);
    setIsSuccess(true);
    setIsLoading(false);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="׳¦׳•׳¨ ׳§׳©׳¨"
            title="׳ ׳©׳׳— ׳׳©׳׳•׳¢ ׳׳׳"
            subtitle="׳׳׳׳• ׳׳× ׳”׳₪׳¨׳˜׳™׳ ׳•׳׳ ׳—׳ ׳• ׳ ׳—׳–׳•׳¨ ׳׳׳™׳ ׳‘׳”׳§׳“׳"
          />
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">

          {/* ׳₪׳¨׳˜׳™ ׳§׳©׳¨ */}
          <div className="contact-info-col">
            <h2 className="contact-info-title">׳₪׳¨׳˜׳™ ׳™׳¦׳™׳¨׳× ׳§׳©׳¨</h2>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon"><MapPin size={18} /></div>
                <div>
                  <strong>׳›׳×׳•׳‘׳×</strong>
                  <p><a href="https://waze.com/ul?q=׳”׳׳™׳¨׳•׳¡׳™׳+53+׳ ׳¡+׳¦׳™׳•׳ ׳”&navigate=yes" target="_blank" rel="noopener noreferrer">׳”׳׳™׳¨׳•׳¡׳™׳ 53, ׳§׳ ׳™׳•׳×׳¨, ׳ ׳¡ ׳¦׳™׳•׳ ׳”</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <div>
                  <strong>׳˜׳׳₪׳•׳</strong>
                  <p><a href="tel:0733277207">073-327-7207</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <div>
                  <strong>WhatsApp ׳¢׳¡׳§׳™</strong>
                  <p><a href="https://wa.me/972557218413" target="_blank" rel="noopener noreferrer">055-721-8413</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Mail size={18} /></div>
                <div>
                  <strong>׳׳™׳׳™׳™׳</strong>
                  <p><a href="mailto:Kitchbras@gmail.com">Kitchbras@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Clock size={18} /></div>
                <div>
                  <strong>׳©׳¢׳•׳× ׳₪׳¢׳™׳׳•׳×</strong>
                  <p>׳¨׳׳©׳•׳ג€“׳—׳׳™׳©׳™: 09:00ג€“21:30</p>
                  <p>׳©׳™׳©׳™: 09:00ג€“15:00</p>
                  <p>׳©׳‘׳×: ׳¡׳’׳•׳¨</p>
                </div>
              </div>
            </div>
          </div>

          {/* ׳˜׳•׳₪׳¡ */}
          <div className="contact-form-col">
            {isSuccess ? (
              <SuccessMessage
                title="׳”׳”׳•׳“׳¢׳” ׳ ׳©׳׳—׳”!"
                message="׳×׳•׳“׳” ׳¢׳ ׳₪׳ ׳™׳™׳×׳. ׳׳ ׳—׳ ׳• ׳ ׳—׳–׳•׳¨ ׳׳׳™׳ ׳‘׳”׳§׳“׳ ׳”׳׳₪׳©׳¨׳™."
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="form-box">
                <h3 className="contact-form-title">׳©׳׳— ׳”׳•׳“׳¢׳”</h3>
                <div className="form-grid">
                  <FormInput label="׳©׳ ׳׳׳" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
                  <FormInput label="׳˜׳׳₪׳•׳" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                  <FormInput label="׳׳™׳׳™׳™׳" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                  <FormInput label="׳ ׳•׳©׳">
                    <select name="subject" value={form.subject} onChange={handleChange} className={`form-select ${errors.subject ? 'error' : ''}`}>
                      <option value="">׳‘׳—׳¨ ׳ ׳•׳©׳</option>
                      <option value="reservation">׳”׳–׳׳ ׳× ׳©׳•׳׳—׳</option>
                      <option value="catering">׳׳’׳©׳™ ׳׳™׳¨׳•׳—</option>
                      <option value="menu">׳©׳׳׳” ׳¢׳ ׳×׳₪׳¨׳™׳˜</option>
                      <option value="general">׳›׳׳׳™</option>
                    </select>
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </FormInput>
                  <div className="form-grid-full">
                    <FormInput label="׳”׳•׳“׳¢׳”" error={errors.message}>
                      <textarea name="message" value={form.message} onChange={handleChange} className={`form-textarea ${errors.message ? 'error' : ''}`} placeholder="׳›׳×׳‘׳™ ׳׳× ׳”׳•׳“׳¢׳×׳ ׳›׳׳..." />
                    </FormInput>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isLoading}>
                  {isLoading ? <span className="spinner"></span> : '׳©׳׳— ׳”׳•׳“׳¢׳”'}
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
