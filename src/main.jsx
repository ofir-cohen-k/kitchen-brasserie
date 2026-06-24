// ========================================
// main.jsx - נקודת הכניסה לאפליקציה
// ========================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './index.css';
import App from './App.jsx';

// עוטפים את כל האפליקציה ב:
// BrowserRouter - לניהול הניווט
// CartProvider - לניהול עגלת הקניות
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
