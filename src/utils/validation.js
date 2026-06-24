// ========================================
// פונקציות בדיקת תקינות (Validation)
// ========================================

// בדיקת אימייל תקין
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// בדיקת טלפון ישראלי (050, 052, 053, 054, 055, 058, 02, 03, 04, 08, 09)
export function isValidPhone(phone) {
  const cleaned = phone.replace(/[-\s]/g, ''); // מסיר מקפים ורווחים
  const pattern = /^(0[2-9]\d{7}|0[5][0-9]\d{7})$/;
  return pattern.test(cleaned);
}

// בדיקה שהשדה לא ריק
export function isNotEmpty(value) {
  return value.trim().length > 0;
}

// בדיקת תאריך עתידי (לא ניתן לבחור תאריך שעבר)
export function isFutureDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // מאפס את השעה לתחילת היום
  const selectedDate = new Date(dateString);
  return selectedDate >= today;
}

// בדיקת מספר סועדים (בין 1 ל-20)
export function isValidGuestCount(count) {
  const num = parseInt(count);
  return !isNaN(num) && num >= 1 && num <= 20;
}

// בדיקת שדות טופס - מחזירה אובייקט שגיאות
export function validateForm(fields) {
  const errors = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (!isNotEmpty(String(value))) {
      errors[key] = 'שדה זה הוא חובה';
    }
  });

  return errors;
}
