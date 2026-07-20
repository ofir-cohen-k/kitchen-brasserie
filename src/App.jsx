// ========================================
// App.jsx - ראוטינג ראשי של האפליקציה
// ========================================

import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// קומפוננטות ראשיות — נטענות תמיד
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';
import AccessibilityWidget from './components/AccessibilityWidget/AccessibilityWidget';

// דפים — נטענים רק כשמגיעים אליהם (code splitting)
const Home       = lazy(() => import('./pages/Home'));
const Menu       = lazy(() => import('./pages/Menu'));
const Checkout   = lazy(() => import('./pages/Checkout'));
const Reservation= lazy(() => import('./pages/Reservation'));
const Events     = lazy(() => import('./pages/Events'));
const PrivateEvents = lazy(() => import('./pages/PrivateEvents'));
const Catering   = lazy(() => import('./pages/Catering'));
const About      = lazy(() => import('./pages/About'));
const Contact    = lazy(() => import('./pages/Contact'));
const AccessibilityStatement = lazy(() => import('./pages/AccessibilityStatement'));
const Privacy    = lazy(() => import('./pages/Privacy'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound   = lazy(() => import('./pages/NotFound'));

// ========================================
// Layout ראשי - מכיל Header, Footer, CartDrawer
// ========================================
function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollIndicator />
      <AccessibilityWidget />
      <Header />
      <CartDrawer />
      <AudioPlayer />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Outlet />
      </Suspense>
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
        <Route path="/private-events" element={<PrivateEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* נתיבי אדמין - ללא Header ו-Footer */}
      <Route path="/admin" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={null}><AdminDashboard /></Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
