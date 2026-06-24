// ========================================
// Custom Hook - useLocalStorage
// Hook מותאם לעבודה קלה עם LocalStorage
// ========================================

import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // מנסים לקרוא את הערך הקיים מ-LocalStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // אם יש ערך - מחזירים אותו, אחרת מחזירים את ה-initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('שגיאה בקריאת LocalStorage:', error);
      return initialValue;
    }
  });

  // פונקציה לעדכון הערך - מעדכנת גם את ה-state וגם את ה-LocalStorage
  const setValue = (value) => {
    try {
      // תמיכה בפונקציה כ-value (כמו useState רגיל)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('שגיאה בכתיבה ל-LocalStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
