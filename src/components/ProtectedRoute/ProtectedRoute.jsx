// ProtectedRoute - מגן על עמודים שדורשים התחברות
// אם המשתמש לא מחובר - מעביר לדף ההתחברות
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // בדיקה האם יש מנהל מחובר ב-LocalStorage
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isAdminLoggedIn) {
    // מעביר לדף Login אם לא מחובר
    return <Navigate to="/admin" replace />;
  }

  // מציג את התוכן אם מחובר
  return children;
}

export default ProtectedRoute;
