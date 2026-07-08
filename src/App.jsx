// ========================================
// App.jsx - ראוטינג ראשי של האפליקציה
// ========================================

import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// קומפוננטות ראשיות (Header, Footer, CartDrawer)
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';

// כל הדפים
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Reservation from './pages/Reservation';
import Events from './pages/Events';
import Catering from './pages/Catering';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// ========================================
// Layout ראשי - מכיל Header, Footer, CartDrawer
// ========================================
function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollIndicator />
      <Header />
      <CartDrawer />
      <AudioPlayer />
      {/* Outlet מציג את הדף הנוכחי */}
      <Outlet />
      <Footer />
    </>
  );
}

// ========================================
// App - מגדיר את כל הנתיבים
// ========================================
function App() {
  return (
    <Routes>
      {/* נתיבי האתר הראשי - עם Header ו-Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/events" element={<Events />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* נתיבי אדמין - ללא Header ו-Footer */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
