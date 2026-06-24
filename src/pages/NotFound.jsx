// ========================================
// דף 404 - NotFound
// ========================================

import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-inner">
        {/* מספר גדול */}
        <div className="not-found-number">404</div>

        {/* קו קישוט */}
        <div className="not-found-line"></div>

        {/* כותרת */}
        <h1 className="not-found-title">הדף לא נמצא</h1>
        <p className="not-found-text">
          הדף שחיפשת אינו קיים או הוסר.<br />
          אבל המטבח שלנו ממשיך לעבוד בשבילך.
        </p>

        {/* כפתורים */}
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            חזרה לדף הבית
          </Link>
          <Link to="/menu" className="btn btn-outline">
            <ArrowRight size={16} />
            לתפריט
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
