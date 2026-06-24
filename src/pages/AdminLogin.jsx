// ========================================
// דף כניסת מנהל - AdminLogin
// !!! זהו מנגנון הדגמה בלבד !!!
// לא לשימוש בפרויקטים אמיתיים
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// פרטי כניסה - הדגמה בלבד
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // בדיקת פרטי כניסה (הדגמה בלבד!)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // שמירת מצב התחברות ב-LocalStorage
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('שם משתמש או סיסמה שגויים');
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-box">
        {/* לוגו */}
        <div className="admin-login-logo">
          <span className="admin-logo-k">kitchen</span>
          <span className="admin-logo-b">— Admin —</span>
        </div>

        <h1 className="admin-login-title">כניסת מנהל</h1>

        {/* אזהרה - הדגמה בלבד */}
        <div className="admin-demo-warning">
          ⚠️ זהו מנגנון הדגמה בלבד.<br />
          פרטי כניסה: admin / 1234
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-field">
            <label className="form-label" htmlFor="username">שם משתמש</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="password">סיסמה</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              required
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-full">
            כניסה
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;
