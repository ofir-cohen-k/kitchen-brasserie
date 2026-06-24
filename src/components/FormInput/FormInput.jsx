// FormInput - רכיב שדה טופס אחיד
// מציג label, input, ואם יש - הודעת שגיאה מתחת
function FormInput({ label, type = 'text', name, value, onChange, error, placeholder, required, children }) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
      </label>

      {/* אם יש children (select, textarea) - מציג אותם, אחרת input רגיל */}
      {children ? (
        children
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${error ? 'error' : ''}`}
          required={required}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={!!error}
        />
      )}

      {/* הודעת שגיאה */}
      {error && (
        <span id={`${name}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
