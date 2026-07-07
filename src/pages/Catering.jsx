// ========================================
// ׳“׳£ ׳׳’׳©׳™ ׳׳™׳¨׳•׳— - Catering
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

  // ׳׳—׳™׳¦׳” ׳¢׳ "׳§׳‘׳ ׳₪׳¨׳˜׳™׳" ׳‘׳›׳¨׳˜׳™׳¡
  function handleRequest(pkg) {
    setSelectedPackage(pkg);
    setForm((prev) => ({ ...prev, packageName: pkg.name }));
    // ׳’׳׳™׳׳” ׳׳˜׳•׳₪׳¡
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
    if (!isNotEmpty(form.fullName)) newErrors.fullName = '׳ ׳ ׳׳”׳–׳™׳ ׳©׳ ׳׳׳';
    if (!isValidPhone(form.phone)) newErrors.phone = '׳׳¡׳₪׳¨ ׳˜׳׳₪׳•׳ ׳׳ ׳×׳§׳™׳';
    if (!isValidEmail(form.email)) newErrors.email = '׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳׳ ׳×׳§׳™׳ ׳”';
    if (!form.eventDate) newErrors.eventDate = '׳ ׳ ׳׳‘׳—׳•׳¨ ׳×׳׳¨׳™׳';
    else if (!isFutureDate(form.eventDate)) newErrors.eventDate = '׳׳ ׳ ׳™׳×׳ ׳׳‘׳—׳•׳¨ ׳×׳׳¨׳™׳ ׳©׳¢׳‘׳¨';
    if (!isNotEmpty(form.guests)) newErrors.guests = '׳ ׳ ׳׳”׳–׳™׳ ׳׳¡׳₪׳¨ ׳׳•׳¨׳—׳™׳';
    if (!isNotEmpty(form.eventType)) newErrors.eventType = '׳ ׳ ׳׳‘׳—׳•׳¨ ׳¡׳•׳’ ׳׳™׳¨׳•׳¢';
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
        status: '׳׳׳×׳™׳ ׳׳˜׳™׳₪׳•׳',
      };
      setCateringRequests((prev) => [...prev, newRequest]);
      setIsSuccess(true);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="׳§׳™׳™׳˜׳¨׳™׳ ׳’"
            title="׳׳’׳©׳™ ׳׳™׳¨׳•׳—"
            subtitle="׳׳’׳©׳™׳ ׳׳¢׳•׳¦׳‘׳™׳ ׳•׳™׳•׳§׳¨׳×׳™׳™׳ ׳׳›׳ ׳¡׳•׳’ ׳׳™׳¨׳•׳¢"
          />
        </div>
      </div>

      {/* ׳—׳‘׳™׳׳•׳× */}
      <section className="section">
        <div className="container">
          <div className="cards-grid">
            {cateringData.map((pkg) => (
              <CateringCard key={pkg.id} package={pkg} onRequest={handleRequest} />
            ))}
          </div>
        </div>
      </section>

      {/* ׳˜׳•׳₪׳¡ ׳‘׳§׳©׳” */}
      <section className="section-alt" id="catering-form">
        <div className="container catering-form-wrap">
          <div className="section-header">
            <span className="section-eyebrow">׳¦׳•׳¨ ׳§׳©׳¨</span>
            <h2 className="section-title">׳‘׳§׳©׳× ׳”׳¦׳¢׳× ׳׳—׳™׳¨</h2>
            <p className="section-subtitle">׳׳׳׳• ׳׳× ׳”׳₪׳¨׳˜׳™׳ ׳•׳׳—׳“ ׳׳”׳¦׳•׳•׳× ׳©׳׳ ׳• ׳™׳—׳–׳•׳¨ ׳׳׳™׳</p>
            <div className="ornament"><span>ג¦</span></div>
          </div>

          {isSuccess ? (
            <SuccessMessage
              title="׳”׳‘׳§׳©׳” ׳ ׳©׳׳—׳”!"
              message="׳×׳•׳“׳”! ׳׳ ׳—׳ ׳• ׳ ׳—׳–׳•׳¨ ׳׳׳™׳ ׳‘׳”׳§׳“׳ ׳¢׳ ׳”׳¦׳¢׳× ׳׳—׳™׳¨ ׳׳•׳×׳׳׳×."
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="form-box">
              {selectedPackage && (
                <div className="catering-selected-pkg">
                  <span>׳—׳‘׳™׳׳” ׳ ׳‘׳—׳¨׳×: </span>
                  <strong>{selectedPackage.name}</strong>
                </div>
              )}
              <div className="form-grid">
                <FormInput label="׳©׳ ׳׳׳" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required />
                <FormInput label="׳˜׳׳₪׳•׳" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required />
                <FormInput label="׳׳™׳׳™׳™׳" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                <FormInput label="׳×׳׳¨׳™׳ ׳”׳׳™׳¨׳•׳¢" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} error={errors.eventDate} required />
                <FormInput label="׳׳¡׳₪׳¨ ׳׳•׳¨׳—׳™׳" name="guests" type="number" value={form.guests} onChange={handleChange} error={errors.guests} placeholder="׳›׳׳•׳× ׳׳©׳•׳¢׳¨׳×" required />
                <FormInput label="׳¡׳•׳’ ׳”׳׳™׳¨׳•׳¢">
                  <select name="eventType" value={form.eventType} onChange={handleChange} className={`form-select ${errors.eventType ? 'error' : ''}`}>
                    <option value="">׳‘׳—׳¨ ׳¡׳•׳’ ׳׳™׳¨׳•׳¢</option>
                    <option value="wedding">׳—׳×׳•׳ ׳”</option>
                    <option value="barmitzvah">׳‘׳¨/׳‘׳× ׳׳¦׳•׳•׳”</option>
                    <option value="corporate">׳׳™׳¨׳•׳¢ ׳—׳‘׳¨׳”</option>
                    <option value="birthday">׳™׳•׳ ׳”׳•׳׳“׳×</option>
                    <option value="meeting">׳₪׳’׳™׳©׳” ׳¢׳¡׳§׳™׳×</option>
                    <option value="other">׳׳—׳¨</option>
                  </select>
                  {errors.eventType && <span className="form-error">{errors.eventType}</span>}
                </FormInput>
                <div className="form-grid-full">
                  <FormInput label="׳”׳¢׳¨׳•׳× ׳•׳‘׳§׳©׳•׳× ׳׳™׳•׳—׳“׳•׳×">
                    <textarea name="notes" value={form.notes} onChange={handleChange} className="form-textarea" placeholder="׳¡׳₪׳¨׳™ ׳׳ ׳• ׳¢׳ ׳”׳׳™׳¨׳•׳¢ ׳©׳׳..." />
                  </FormInput>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isLoading}>
                {isLoading ? <span className="spinner"></span> : '׳©׳׳— ׳‘׳§׳©׳”'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Catering;
