import { Star } from 'lucide-react';
import './MenuCard.css';

function MenuCard({ dish, onOpen }) {
  return (
    <article className="menu-card" onClick={onOpen} style={{ cursor: 'zoom-in' }}>
      <div
        className={`menu-card-img${dish.imageContain ? ' menu-card-img-contain' : ''}${dish.imageBgWhite ? ' menu-card-img-bg-white' : ''}${dish.imagePadSm ? ' menu-card-img-pad-sm' : ''}`}
      >
        <img src={dish.image} alt={dish.name} loading="lazy" />
        {dish.isRecommended && (
          <span className="menu-card-badge">
            <Star size={10} fill="currentColor" /> מומלץ
          </span>
        )}
      </div>

      <div className="menu-card-body">
        <span className="menu-card-cat">{dish.category}</span>
        <div className="menu-card-name-row">
          <h3 className="menu-card-name">{dish.name}</h3>
          <span className="menu-card-price">₪{dish.price}</span>
        </div>
        <p className="menu-card-desc">{dish.description}</p>
      </div>
    </article>
  );
}

export default MenuCard;
