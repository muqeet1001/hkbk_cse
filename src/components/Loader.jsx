import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    // Logo pulse animation
    tl.to(logoRef.current, {
      scale: 1.1,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    // Fade out text and logo
    tl.to([textRef.current, logoRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2');

    // Fade out loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    // Remove from DOM
    tl.set(loaderRef.current, {
      display: 'none',
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-content">
        <img src="/logo.jpg" alt="HKBK Logo" className="loader-logo" ref={logoRef} />
        <div className="loader-text" ref={textRef}>
          HKBK CSE
        </div>
      </div>
    </div>
  );
}
