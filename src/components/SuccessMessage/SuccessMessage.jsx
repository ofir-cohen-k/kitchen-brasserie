// SuccessMessage - הודעת הצלחה אחרי שליחת טופס
import { CheckCircle } from 'lucide-react';
import './SuccessMessage.css';

function SuccessMessage({ title, message, extra }) {
  return (
    <div className="success-box" role="status" aria-live="polite">
      <CheckCircle size={48} className="success-icon" />
      <h3 className="success-title">{title}</h3>
      <p className="success-message">{message}</p>
      {extra && <p className="success-extra">{extra}</p>}
    </div>
  );
}

export default SuccessMessage;
