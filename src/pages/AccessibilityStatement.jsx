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
        <div className="container" style={{ maxWidth: '680px', lineHeight: 1.9, fontSize: '0.9rem', padding: '0 1.5rem' }}>
          <h2 style={{ marginBottom: '0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>כללי</h2>
          <p>
            Kitchen Brasserie פועלת לאפשר את השימוש באתר לאנשים עם מוגבלויות. אנו שואפים לעמוד
            בדרישות תקן הנגישות הישראלי (ת"י 5568) ברמת AA, המבוסס על הנחיות WCAG 2.1.
          </p>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>הנגשה באתר</h2>
          <ul style={{ paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>ניווט מקלדת מלא</li>
            <li>תמיכה בקוראי מסך</li>
            <li>תיאורי alt לתמונות</li>
            <li>ניגודיות צבעים תקנית</li>
            <li>כפתור נגישות המאפשר: הגדלת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, עצירת אנימציות ופונט קריא</li>
          </ul>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>יצירת קשר בנושא נגישות</h2>
          <p>אם נתקלתם בבעיית נגישות באתר, נשמח לשמוע ולסייע:</p>
          <ul style={{ paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>טלפון: <a href="tel:0733277207" style={{ color: 'var(--gold)' }}>073-327-7207</a></li>
            <li>דוא"ל: <a href="mailto:Kitchbras@gmail.com" style={{ color: 'var(--gold)' }}>Kitchbras@gmail.com</a></li>
            <li>כתובת: <a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer">האירוסים 53, קניותר, נס ציונה</a></li>
          </ul>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>תאריך עדכון</h2>
          <p>הצהרה זו עודכנה ביולי 2026.</p>
        </div>
      </section>
    </main>
  );
}

export default AccessibilityStatement;
