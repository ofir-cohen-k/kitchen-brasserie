import PageTitle from '../components/PageTitle/PageTitle';
import './PrivateEvents.css';

const tiers = [
  {
    id: 'silver',
    name: 'Silver',
    price: null,
    description: '',
    items: [],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: null,
    description: '',
    items: [],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: null,
    description: '',
    items: [],
  },
  {
    id: 'brunch',
    name: 'Brunch',
    price: null,
    description: '',
    items: [],
  },
];

const tierStyle = {
  silver:   { accent: '#A8A9AD', label: 'Silver' },
  gold:     { accent: '#B89A5E', label: 'Gold' },
  platinum: { accent: '#6E7B8B', label: 'Platinum' },
  brunch:   { accent: '#7C9B6E', label: 'Brunch' },
};

function TierCard({ tier }) {
  const style = tierStyle[tier.id];
  return (
    <div className="tier-card">
      <div className="tier-header" style={{ borderColor: style.accent }}>
        <span className="tier-badge" style={{ background: style.accent }}>{style.label}</span>
        {tier.price && <p className="tier-price">₪{tier.price} לאדם</p>}
      </div>
      <div className="tier-body">
        {tier.description && <p className="tier-desc">{tier.description}</p>}
        {tier.items.length > 0 && (
          <ul className="tier-items">
            {tier.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="tier-footer">
        <a href="/contact" className="btn btn-primary">לפרטים ותיאום</a>
      </div>
    </div>
  );
}

function PrivateEvents() {
  return (
    <main style={{ paddingTop: '68px' }}>
      <div className="section-dark" style={{ padding: '0.5rem 0 0.7rem' }}>
        <div className="container">
          <PageTitle
            eyebrow="אירועים"
            title="אירועים פרטיים"
            subtitle="בר/בת מצווה, מסיבות, ימי הולדת, ארועי חברה ועוד — אנחנו נדאג לכל הפרטים"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="tiers-grid">
            {tiers.map(tier => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container private-events-cta">
          <h2 className="section-title">רוצים לשמוע עוד?</h2>
          <p className="section-subtitle">צרו קשר ונבנה יחד את האירוע המושלם עבורכם</p>
          <a href="tel:0733277207" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            צלצלו עכשיו: 073-327-7207
          </a>
        </div>
      </section>
    </main>
  );
}

export default PrivateEvents;
