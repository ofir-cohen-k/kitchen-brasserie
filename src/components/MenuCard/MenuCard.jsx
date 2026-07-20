// MenuCard - כרטיס מנה בתפריט
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './MenuCard.css';

function MenuCard({ dish, onOpen }) {
  const { addToCart } = useCart();

  return (
    <article className="menu-card">
      <div
        className={`menu-card-img${dish.imageContain ? ' menu-card-img-contain' : ''}${dish.imageBgWhite ? ' menu-card-img-bg-white' : ''}${dish.imagePadSm ? ' menu-card-img-pad-sm' : ''}`}
        onClick={onOpen}
        style={{ cursor: 'zoom-in' }}
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
        <h3 className="menu-card-name">{dish.name}</h3>
        <p className="menu-card-desc">{dish.description}</p>
        <div className="menu-card-footer">
          <span className="menu-card-price">₪{dish.price}</span>
          <button
            className="btn btn-primary btn-sm menu-card-btn"
            onClick={() => addToCart(dish)}
            aria-label={`הוסף ${dish.name} לסל`}
          >
            <ShoppingCart size={14} />
            הוסף לסל
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
