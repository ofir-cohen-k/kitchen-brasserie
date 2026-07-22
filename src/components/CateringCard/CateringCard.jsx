import { Check, Users, Plus, Minus } from 'lucide-react';
import './CateringCard.css';

function CateringCard({ package: pkg, quantity, onAdd, onUpdate }) {
  const inCart = quantity > 0;

  return (
    <article className={`catering-card${inCart ? ' catering-card-in-cart' : ''}`}>
      {inCart && <div className="cc-card-badge">{quantity}</div>}

      <div className="catering-card-img">
        <img src={pkg.image} alt={pkg.name} loading="lazy" />
      </div>

      <div className="catering-card-body">
        <h3 className="catering-card-name">{pkg.name}</h3>
        <p className="catering-card-desc">{pkg.description}</p>

        <div className="catering-guests">
          <Users size={14} />
          <span>{pkg.guests}</span>
        </div>

        <ul className="catering-includes">
          {pkg.includes.map((item, i) => (
            <li key={i} className="catering-includes-item">
              <Check size={13} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="catering-card-footer">
          <div>
            <span className="catering-from">החל מ-</span>
            <span className="catering-price">₪{pkg.startingPrice}</span>
          </div>

          {inCart ? (
            <div className="catering-qty-controls">
              <button onClick={() => onUpdate(-1)} aria-label="הפחת"><Minus size={15} /></button>
              <span>{quantity}</span>
              <button onClick={() => onUpdate(1)} aria-label="הוסף"><Plus size={15} /></button>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onAdd}>
              הוסף לסל
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CateringCard;
