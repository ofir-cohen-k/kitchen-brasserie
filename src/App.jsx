// ========================================
// App.jsx - ראוטינג ראשי של האפליקציה
// ========================================

import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Phone } from 'lucide-react';

const TABIT_URL = 'https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation';

function MobileBottomBar() {
  const { pathname } = useLocation();
  if (pathname === '/catering') return null;
  return (
    <div className="mobile-bottom-bar">
      <a href="tel:073-327-7207" className="mobile-bottom-btn mobile-bottom-call">
        <Phone size={15} />
        התקשר
      </a>
      <a href={TABIT_URL} target="_blank" rel="noopener noreferrer" className="mobile-bottom-btn mobile-bottom-reserve">
        הזמן שולחן
      </a>
    </div>
  );
}

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
  const location = useLocation();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    function observeAll() {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
    }

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    observeAll();

    return () => { io.disconnect(); mo.disconnect(); };
  }, [location.pathname]);

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
      <MobileBottomBar />
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
