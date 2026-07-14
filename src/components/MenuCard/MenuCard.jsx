// MenuCard - כרטיס מנה בתפריט
import { useState, useEffect } from 'react';
import { ShoppingCart, Star, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './MenuCard.css';

function MenuCard({ dish }) {
  const { addToCart } = useCart();
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e) { if (e.key === 'Escape') setLightbox(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  function handleAddToCart() {
    addToCart(dish);
  }

  return (
    <>
      <article className="menu-card">
        {/* תמונת המנה */}
        <div
          className={`menu-card-img${dish.imageContain ? ' menu-card-img-contain' : ''}${dish.imageBgWhite ? ' menu-card-img-bg-white' : ''}${dish.imagePadSm ? ' menu-card-img-pad-sm' : ''}`}
          onClick={() => setLightbox(true)}
          style={{ cursor: 'zoom-in' }}
        >
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

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="סגור">
            <X size={24} />
          </button>
          <img
            src={dish.image}
            alt={dish.name}
            className="lightbox-img"
            onClick={e => e.stopPropagation()}
          />
          <p className="lightbox-name">{dish.name}</p>
          {dish.description && <p className="lightbox-desc">{dish.description}</p>}
        </div>
      )}
    </>
  );
}

export default MenuCard;
