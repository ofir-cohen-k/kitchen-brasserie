import { useState, useEffect } from 'react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollPercent((window.scrollY / total) * 100);
      } else {
        setScrollPercent(0);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-track">
      <div
        className="scroll-thumb"
        style={{ top: `calc(${scrollPercent}% - ${scrollPercent * 0.8}px)` }}
      />
    </div>
  );
}

export default ScrollIndicator;
