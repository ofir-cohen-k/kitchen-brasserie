// MenuCard - כרטיס מנה בתפריט
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './MenuCard.css';

function MenuCard({ dish }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(dish);
  }

  return (
    <article className="menu-card">
      {/* תמונת המנה */}
      <div className={`menu-card-img${dish.imageContain ? ' menu-card-img-contain' : ''}${dish.imageBgWhite ? ' menu-card-img-bg-white' : ''}`}>
        <img src={dish.image} alt={dish.name} loading="lazy" />
        {/* תג "מומלץ" אם המנה מסומנת כמומלצת */}
        {dish.isRecommended && (
          <span className="menu-card-badge">
            <Star size={10} fill="currentColor" /> מומלץ
          </span>
        )}
      </div>

      {/* תוכן הכרטיס */}
      <div className="menu-card-body">
        {/* קטגוריה */}
        <span className="menu-card-cat">{dish.category}</span>

        {/* שם המנה */}
        <h3 className="menu-card-name">{dish.name}</h3>

        {/* תיאור */}
        <p className="menu-card-desc">{dish.description}</p>

        {/* מחיר וכפתור */}
        <div className="menu-card-footer">
          <span className="menu-card-price">₪{dish.price}</span>
          <button
            className="btn btn-primary btn-sm menu-card-btn"
            onClick={handleAddToCart}
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
