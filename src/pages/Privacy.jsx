import PageTitle from '../components/PageTitle/PageTitle';

function Privacy() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle eyebrow="Kitchen Brasserie" title="מדיניות פרטיות" />
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '680px', lineHeight: 1.9, fontSize: '0.9rem', padding: '0 1.5rem' }}>

          <h2 style={{ marginBottom: '0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>כללי</h2>
          <p>
            Kitchen Brasserie מכבדת את פרטיות המשתמשים באתר. מדיניות זו מפרטת אילו פרטים
            נאספים, כיצד הם משמשים ואיך ניתן לפנות אלינו בנושא פרטיות.
          </p>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>מידע שנאסף</h2>
          <ul style={{ paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>
              <strong>טופס יצירת קשר</strong> — שם מלא, מספר טלפון, כתובת אימייל, נושא והודעה.
              המידע נשמר במסד נתונים מאובטח לצורך מענה לפנייתכם בלבד.
            </li>
            <li>
              <strong>טופס מגשי אירוח</strong> — שם, טלפון, אימייל, תאריך האירוע ומספר אורחים.
              המידע נשמר זמנית בדפדפן ומשמש ליצירת קשר בנוגע לבקשתכם.
            </li>
            <li>
              <strong>סל קניות והזמנות</strong> — תכולת הסל ופרטי ההזמנה נשמרים בדפדפן שלכם
              בלבד (localStorage) ואינם מועברים לשרתנו.
            </li>
          </ul>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>שימוש במידע</h2>
          <p>
            המידע שנמסר על ידיכם ישמש אך ורק לצורך מענה לפנייתכם, יצירת קשר בנוגע לאירוע
            שביקשתם או השלמת ההזמנה. לא נמכור, נשתף או נעביר את פרטיכם לגורם שלישי כלשהו.
          </p>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>אחסון מידע</h2>
          <ul style={{ paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>מידע שנשלח דרך טופס יצירת הקשר נשמר במסד נתונים מאובטח (Supabase) בשרתים מוצפנים.</li>
            <li>מידע שנשמר בדפדפן (סל, הזמנות, מגשי אירוח) נמצא על המכשיר שלכם בלבד ולא עובר אלינו.</li>
            <li>ניתן למחוק את המידע המקומי בכל עת דרך הגדרות הדפדפן.</li>
          </ul>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>זכויותיכם</h2>
          <p>
            בהתאם לחוק הגנת הפרטיות (ישראל, 1981) ותקנותיו, יש לכם זכות לדעת אילו מידע נאסף
            אודותיכם, לעיין בו, לתקנו ולבקש את מחיקתו. פנו אלינו בכל עת.
          </p>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>יצירת קשר בנושא פרטיות</h2>
          <ul style={{ paddingRight: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>דוא"ל: <a href="mailto:Kitchbras@gmail.com" style={{ color: 'var(--gold)' }}>Kitchbras@gmail.com</a></li>
            <li>טלפון: <a href="tel:0733277207" style={{ color: 'var(--gold)' }}>073-327-7207</a></li>
            <li>כתובת: <a href="https://waze.com/ul?q=האירוסים+53+נס+ציונה&navigate=yes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>האירוסים 53, קניותר, נס ציונה</a></li>
          </ul>

          <h2 style={{ margin: '1.2rem 0 0.4rem', fontSize: '0.95rem', fontWeight: 700 }}>תאריך עדכון</h2>
          <p>מדיניות זו עודכנה ביולי 2026.</p>

        </div>
      </section>
    </main>
  );
}

export default Privacy;
