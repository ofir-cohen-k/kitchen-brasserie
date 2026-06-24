// CartDrawer - מגירת סל הקניות הנפתחת מהצד
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

function CartDrawer() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // מעבר לדף Checkout
  function handleCheckout() {
    setIsCartOpen(false);
    navigate('/checkout');
  }

  // סגירת הסל
  function handleClose() {
    setIsCartOpen(false);
  }

  return (
    <>
      {/* שכבת רקע כהה מאחורי הסל */}
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* הסל עצמו */}
      <aside
        className={`cart-drawer ${isCartOpen ? 'cart-drawer-open' : ''}`}
        aria-label="סל קניות"
      >
        {/* כותרת הסל */}
        <div className="cart-header">
          <div>
            <h2 className="cart-title">הסל שלי</h2>
            <span className="cart-count">{totalItems} פריטים</span>
          </div>
          <button
            className="cart-close"
            onClick={handleClose}
            aria-label="סגור סל"
          >
            <X size={20} />
          </button>
        </div>

        {/* תוכן הסל */}
        {cartItems.length === 0 ? (
          /* סל ריק */
          <div className="cart-empty">
            <ShoppingBag size={48} className="cart-empty-icon" />
            <p className="cart-empty-text">הסל שלך ריק</p>
            <p className="cart-empty-sub">הוסיפי מנות מהתפריט</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setIsCartOpen(false); navigate('/menu'); }}
            >
              לתפריט
            </button>
          </div>
        ) : (
          <>
            {/* רשימת הפריטים */}
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₪{item.price}</span>
                  </div>
                  {/* שליטה בכמות */}
                  <div className="cart-item-controls">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="הקטן כמות"
                      className="qty-btn"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="הגדל כמות"
                      className="qty-btn"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  {/* מחיר לשורה */}
                  <span className="cart-item-total">
                    ₪{item.price * item.quantity}
                  </span>
                  {/* מחיקה */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-remove"
                    aria-label={`מחק ${item.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>

            {/* סיכום ופעולות */}
            <div className="cart-footer">
              <div className="cart-total">
                <span>סה"כ לתשלום</span>
                <span className="cart-total-price">₪{totalPrice}</span>
              </div>
              <button className="btn btn-primary btn-full" onClick={handleCheckout}>
                להמשך להזמנה
              </button>
              <button
                className="cart-clear"
                onClick={clearCart}
              >
                נקה סל
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
