# Kitchen Brasserie

אתר מסעדה מלא לרשת **Kitchen Brasserie** — מסעדת קונספט חלבית ודגים כשרה למהדרין בנס ציונה.

---

## סקירה כללית

אתר מסעדה מקצועי הכולל תפריט דיגיטלי, הזמנת שולחן אונליין, מגשי אירוח, אירועים, ועגלת קניות — הכול בעברית מלאה עם עיצוב RTL.

---

## איזו בעיה הפרויקט פותר

מסעדות קטנות ובינוניות מסתמכות על טלפון ו-WhatsApp לניהול הזמנות ופניות. זה גורם ל:
- **הזמנות אבודות** — לקוחות לא מצליחים להשיג טלפון בשעות עומס
- **חוסר מידע** — אין מקום אחד לתפריט, שעות, ופרטי קשר
- **תדמית לא מקצועית** — אין נוכחות דיגיטלית ברמה הנדרשת

---

## קהל היעד

- משפחות ואנשים פרטיים המחפשים מסעדה כשרה איכותית לארוחה יומיומית או לאירוע
- מארגני אירועים הזקוקים למגשי אירוח
- לקוחות קיימים שרוצים להזמין שולחן, לבדוק תפריט, או לצור קשר

---

## מתחרים ובידול

| מתחרה | חיסרון |
|---|---|
| WhatsApp / טלפון | לא זמין 24/7, אין תפריט מסודר |
| Wolt / Ten Bis | רק משלוחים, אין הזמנת שולחן |
| אתרי מסעדות גנריים | לא מותאמים לכשרות, לא RTL |

**הבידול:** אתר מותאם אישית לכשרות בד"ץ, RTL מלא, הזמנת שולחן + מגשי אירוח + תפריט דיגיטלי — הכול במקום אחד.

---

## טכנולוגיות

- **Frontend:** React + Vite
- **Backend / DB:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Fonts:** Google Fonts (Heebo)

---

## שירותים חיצוניים ואינטגרציות

| שירות | סוג | שימוש |
|---|---|---|
| Supabase | Backend / DB | שמירת הזמנות שולחן, פניות צור קשר, מגשי אירוח |
| Vercel | Deployment | אחסון והפצת האתר |
| Google Fonts (Heebo) | עיצוב | פונט עברי מקצועי |
| Waze Deep Link | ניווט | כפתור נווט אלינו |
| WhatsApp Deep Link | תקשורת | כפתור שלח הודעה |
| Wolt | הזמנות | קישור להזמנת משלוח |
| Unsplash CDN | תמונות | תמונות מוצר ואווירה |
| Archive.org | מדיה | מוסיקת רקע צרפתית |

---

## מודל נתונים

### `reservations` — הזמנות שולחן
| עמודה | סוג |
|---|---|
| id | uuid PK |
| name | text |
| phone | text |
| email | text |
| date | date |
| time | text |
| guests | integer |
| notes | text |
| created_at | timestamp |

### `contact_messages` — פניות צור קשר
| עמודה | סוג |
|---|---|
| id | uuid PK |
| name | text |
| phone | text |
| email | text |
| message | text |
| created_at | timestamp |

### `catering_orders` — הזמנות מגשי אירוח
| עמודה | סוג |
|---|---|
| id | uuid PK |
| name | text |
| phone | text |
| email | text |
| event_date | date |
| guests | integer |
| items | jsonb |
| notes | text |
| created_at | timestamp |

---

## הרצה מקומית

```bash
git clone https://github.com/YOUR_USERNAME/kitchen-brasserie.git
cd kitchen-brasserie
npm install
```

צרי קובץ `.env`:
```
VITE_SUPABASE_URL=https://irgixtsefnltvnzqscdo.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

```bash
npm run dev
```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
