import { useState, useEffect } from 'react';
import './ScrollIndicator.css';

const THUMB_HEIGHT = 80;
const PADDING = 8;

function ScrollIndicator() {
  const [thumbTop, setThumbTop] = useState(PADDING);

  useEffect(() => {
    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const trackUsable = window.innerHeight - THUMB_HEIGHT - PADDING * 2;
      if (total > 0) {
        const ratio = window.scrollY / total;
        setThumbTop(PADDING + ratio * trackUsable);
      } else {
        setThumbTop(PADDING);
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-track">
      <div className="scroll-thumb" style={{ top: thumbTop + 'px' }} />
    </div>
  );
}

export default ScrollIndicator;
