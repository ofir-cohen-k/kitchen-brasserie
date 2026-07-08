import PageTitle from '../components/PageTitle/PageTitle';

function AccessibilityStatement() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle eyebrow="Kitchen Brasserie" title="הצהרת נגישות" />
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '760px', lineHeight: 2 }}>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>כללי</h2>
          <p>
            Kitchen Brasserie פועלת לאפשר את השימוש באתר לאנשים עם מוגבלויות. אנו שואפים לעמוד
            בדרישות תקן הנגישות הישראלי (ת"י 5568) ברמת AA, המבוסס על הנחיות WCAG 2.1.
          </p>

          <h2 style={{ margin: '1.5rem 0 0.5rem', fontSize: '1.1rem' }}>הנגשה באתר</h2>
          <ul style={{ paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>ניווט מקלדת מלא</li>
            <li>תמיכה בקוראי מסך</li>
            <li>תיאורי alt לתמונות</li>
            <li>ניגודיות צבעים תקנית</li>
            <li>כפתור נגישות המאפשר: הגדלת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, עצירת אנימציות ופונט קריא</li>
          </ul>

          <h2 style={{ margin: '1.5rem 0 0.5rem', fontSize: '1.1rem' }}>יצירת קשר בנושא נגישות</h2>
          <p>
            אם נתקלתם בבעיית נגישות באתר, נשמח לשמוע ולסייע:
          </p>
          <ul style={{ paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>טלפון: <a href="tel:0733277207" style={{ color: 'var(--gold)' }}>073-327-7207</a></li>
            <li>דוא"ל: <a href="mailto:Kitchbras@gmail.com" style={{ color: 'var(--gold)' }}>Kitchbras@gmail.com</a></li>
            <li>כתובת: האירוסים 53, קניותר, נס ציונה</li>
          </ul>

          <h2 style={{ margin: '1.5rem 0 0.5rem', fontSize: '1.1rem' }}>תאריך עדכון</h2>
          <p>הצהרה זו עודכנה ביולי 2026.</p>
        </div>
      </section>
    </main>
  );
}

export default AccessibilityStatement;
