// ========================================
// CartContext - ניהול סל הקניות
// Context מאפשר לכל הרכיבים לגשת לסל
// ========================================

import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// יצירת ה-Context
const CartContext = createContext();

// Provider - עוטף את האפליקציה כולה ומספק את הנתונים
export function CartProvider({ children }) {
  // שמירת הסל ב-LocalStorage כדי שלא ייאבד בעת רענון
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // הוספת מנה לסל
  function addToCart(dish) {
    setCartItems((prevItems) => {
      // בדיקה אם המנה כבר בסל
      const existingItem = prevItems.find((item) => item.id === dish.id);

      if (existingItem) {
        // אם קיימת - מגדילים את הכמות
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // אחרת - מוסיפים אותה עם כמות 1
        return [...prevItems, { ...dish, quantity: 1 }];
      }
    });
    // פותחים את הסל אוטומטית
    setIsCartOpen(true);
  }

  // הגדלת כמות
  function increaseQuantity(id) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // הקטנת כמות (אם מגיעה ל-0 - מוחקים)
  function decreaseQuantity(id) {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item && item.quantity === 1) {
        return prevItems.filter((i) => i.id !== id);
      }
      return prevItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }

  // מחיקת מנה מהסל
  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // ניקוי כל הסל
  function clearCart() {
    setCartItems([]);
  }

  // חישוב מספר הפריטים הכולל בסל
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // חישוב המחיר הכולל
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook נוח לשימוש ב-Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart חייב להיות בתוך CartProvider');
  }
  return context;
}
