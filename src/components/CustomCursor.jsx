import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const HOVER_SELECTOR =
  'a, button, input, textarea, [role="button"], .faculty__image-card, .timeline__capsule';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      '(pointer: fine)'
    ).matches;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!supportsFinePointer || reduceMotion) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    document.body.classList.add('has-custom-cursor');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };
    let revealed = false;

    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);

      if (!revealed) {
        revealed = true;
        pos.x = mouse.x;
        pos.y = mouse.y;
        setCursorX(pos.x);
        setCursorY(pos.y);
        gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      setCursorX(pos.x);
      setCursorY(pos.y);
    };
    gsap.ticker.add(tick);

    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        cursor.classList.add('hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        cursor.classList.remove('hover');
      }
    };
    const onDown = () => cursor.classList.add('active');
    const onUp = () => cursor.classList.remove('active');
    const onLeaveWindow = () => gsap.to([cursor, dot], { opacity: 0, duration: 0.25 });

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeaveWindow);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-dot" ref={dotRef}></div>
    </>
  );
}
