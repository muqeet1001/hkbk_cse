import { useEffect, useRef, useState } from "react";
import "./Navigation.css";

export default function Navigation() {
  const navRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 50) {
        navRef.current.classList.add("scrolled");
      } else {
        navRef.current.classList.remove("scrolled");
      }
    };

    const handleVideoComplete = () => {
      setVideoEnded(true);
      navRef.current?.classList.add("video-ended");
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("heroVideoComplete", handleVideoComplete);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroVideoComplete", handleVideoComplete);
    };
  }, []);

  return (
    <header
      className={`site-header site-nav${videoEnded ? " video-ended" : ""}`}
      ref={navRef}
    >
      <a className="nav-brand" href="#home" aria-label="HKBK CSE home">
        <img src="/logo.jpg" alt="HKBK Logo" className="brand-logo" />
        <span className="brand-text">
          HKBK COLLEGE OF
          <br />
          ENGINEERING
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#home" className="nav-link active">
          Home
        </a>
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#faculty" className="nav-link">
          Faculty
        </a>
        <a href="#programs" className="nav-link">
          Programs
        </a>
        <a href="#research" className="nav-link">
          Research
        </a>
        <a href="#placements" className="nav-link">
          Placements
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </nav>
      <a className="apply-button" href="#apply">
        Apply Now
      </a>
    </header>
  );
}
