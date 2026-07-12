import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
      return;
    }

    const letters = textRef.current?.querySelectorAll('.loader-letter') ?? [];
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    gsap.set(logoRef.current, { opacity: 0, scale: 0.88, filter: 'blur(10px)' });
    gsap.set(letters, { opacity: 0, y: 22 });
    gsap.set(barRef.current, { scaleX: 0 });
    gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'bottom' });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.85,
      ease: 'power3.out',
    })
      .to(
        letters,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.035,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        barRef.current,
        {
          scaleX: 1,
          duration: 1.35,
          ease: 'power2.inOut',
        },
        '-=0.15'
      )
      .to(
        counter,
        {
          value: 100,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.round(counter.value)
              ).padStart(3, '0');
            }
          },
        },
        '<'
      )
      .to(
        [logoRef.current, textRef.current, barRef.current?.parentElement],
        {
          opacity: 0,
          y: -18,
          duration: 0.45,
          ease: 'power2.in',
        },
        '+=0.25'
      )
      .to(
        curtainRef.current,
        {
          scaleY: 0,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        '-=0.15'
      )
      .set(loaderRef.current, { display: 'none' });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [onComplete]);

  const word = 'HKBK CSE';

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-curtain" ref={curtainRef} />
      <div className="loader-content">
        <img
          src="/logo.jpg"
          alt="HKBK Logo"
          className="loader-logo"
          ref={logoRef}
        />
        <div className="loader-text" ref={textRef}>
          {word.split('').map((char, i) => (
            <span className="loader-letter" key={i}>
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </div>
        <div className="loader-progress">
          <div className="loader-progress-track">
            <div className="loader-progress-bar" ref={barRef} />
          </div>
          <span className="loader-progress-count">
            <span ref={countRef}>000</span>
            <span className="loader-progress-suffix">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
