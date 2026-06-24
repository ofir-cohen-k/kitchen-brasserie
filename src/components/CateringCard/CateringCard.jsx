// CateringCard - כרטיס חבילת אירוח
import { Check, Users } from 'lucide-react';
import './CateringCard.css';

function CateringCard({ package: pkg, onRequest }) {
  return (
    <article className="catering-card">
      {/* תמונה */}
      <div className="catering-card-img">
        <img src={pkg.image} alt={pkg.name} loading="lazy" />
      </div>

      {/* תוכן */}
      <div className="catering-card-body">
        <h3 className="catering-card-name">{pkg.name}</h3>
        <p className="catering-card-desc">{pkg.description}</p>

        {/* מספר סועדים */}
        <div className="catering-guests">
          <Users size={14} />
          <span>{pkg.guests}</span>
        </div>

        {/* מה כלול */}
        <ul className="catering-includes">
          {pkg.includes.map((item, index) => (
            <li key={index} className="catering-includes-item">
              <Check size={13} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* מחיר וכפתור */}
        <div className="catering-card-footer">
          <div>
            <span className="catering-from">החל מ-</span>
            <span className="catering-price">₪{pkg.startingPrice}</span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onRequest(pkg)}
            aria-label={`קבל פרטים על ${pkg.name}`}
          >
            קבל פרטים
          </button>
        </div>
      </div>
    </article>
  );
}

export default CateringCard;
