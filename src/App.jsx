// ========================================
// App.jsx - ראוטינג ראשי של האפליקציה
// ========================================

import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Phone } from 'lucide-react';

const TABIT_URL = 'https://tabitisrael.co.il/%D7%94%D7%96%D7%9E%D7%A0%D7%AA-%D7%9E%D7%A7%D7%95%D7%9D/create-reservation?step=search&orgId=6714f66c66e62b4cd2ab260f&source=tabit&type=future_reservation';

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.054 23.447a.5.5 0 0 0 .611.61l5.647-1.479A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 0 1-5.006-1.374l-.358-.214-3.724.975.993-3.62-.234-.372A9.796 9.796 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

function MobileBottomBar() {
  return (
    <div className="mobile-bottom-bar">
      <a href="tel:073-327-7207" className="mobile-bottom-btn mobile-bottom-call">
        <Phone size={15} />
        התקשר
      </a>
      <a href="https://wa.me/972733277207" target="_blank" rel="noopener noreferrer" className="mobile-bottom-btn mobile-bottom-whatsapp">
        {WA_ICON}
        WhatsApp
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
