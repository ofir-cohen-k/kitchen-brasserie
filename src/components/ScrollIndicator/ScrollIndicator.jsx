import { useState, useEffect, useRef, useCallback } from 'react';
import './ScrollIndicator.css';

const THUMB_HEIGHT = 80;
const PADDING = 8;

function ScrollIndicator() {
  const [thumbTop, setThumbTop] = useState(PADDING);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const calcThumbTop = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const trackUsable = window.innerHeight - THUMB_HEIGHT - PADDING * 2;
    if (total > 0) {
      return PADDING + (window.scrollY / total) * trackUsable;
    }
    return PADDING;
  }, []);

  useEffect(() => {
    function update() {
      if (!isDragging.current) {
        setThumbTop(calcThumbTop());
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [calcThumbTop]);

  function handleMouseDown(e) {
    e.preventDefault();
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;

    function onMouseMove(e) {
      const delta = e.clientY - dragStartY.current;
      const trackUsable = window.innerHeight - THUMB_HEIGHT - PADDING * 2;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDelta = (delta / trackUsable) * total;
      const newScroll = Math.max(0, Math.min(total, dragStartScroll.current + scrollDelta));
      window.scrollTo(0, newScroll);
      setThumbTop(PADDING + (newScroll / total) * trackUsable);
    }

    function onMouseUp() {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function handleTrackClick(e) {
    if (e.target === e.currentTarget) {
      const trackRect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - trackRect.top;
      const trackUsable = window.innerHeight - THUMB_HEIGHT - PADDING * 2;
      const ratio = Math.max(0, Math.min(1, (clickY - PADDING - THUMB_HEIGHT / 2) / trackUsable));
      const total = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: ratio * total, behavior: 'smooth' });
    }
  }

  return (
    <div className="scroll-track" onClick={handleTrackClick}>
      <div
        className="scroll-thumb"
        style={{ top: thumbTop + 'px' }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default ScrollIndicator;
