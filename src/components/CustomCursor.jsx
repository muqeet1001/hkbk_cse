import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Set GSAP quickSetter for better performance
    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // The dot follows instantly
      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop for smooth trailing
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      setCursorX(pos.x);
      setCursorY(pos.y);
    });

    // Hover interactions
    const addHover = () => {
      cursor.classList.add('hover');
    };
    const removeHover = () => {
      cursor.classList.remove('hover');
    };

    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    // Delay to let React render elements
    setTimeout(attachHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactables = document.querySelectorAll('a, button');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-dot" ref={dotRef}></div>
    </>
  );
}
