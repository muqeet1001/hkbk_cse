import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Navigation.css";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#faculty", label: "Faculty" },
  { href: "#placements", label: "Placements" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const navRef = useRef(null);
  const drawerRef = useRef(null);
  const drawerLinksRef = useRef([]);
  const progressRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const setProgress = gsap.quickSetter(progressRef.current, "scaleX");

    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 50) {
        navRef.current.classList.add("scrolled");
      } else {
        navRef.current.classList.remove("scrolled");
      }

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, progress)));
    };

    const handleVideoComplete = () => {
      setVideoEnded(true);
      navRef.current?.classList.add("video-ended");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("heroVideoComplete", handleVideoComplete);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroVideoComplete", handleVideoComplete);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1))
    ).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const links = drawerLinksRef.current.filter(Boolean);
    if (!links.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (menuOpen) {
      if (reduceMotion) {
        gsap.set(links, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          links,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.15,
          }
        );
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" ref={progressRef}></div>
      </div>
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
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link${isActive ? " active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <a className="apply-button" href="#apply">
        Apply Now
      </a>

      <button
        type="button"
        className={`nav-burger${menuOpen ? " is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-drawer"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        id="mobile-drawer"
        className={`nav-drawer${menuOpen ? " is-open" : ""}`}
        ref={drawerRef}
        aria-hidden={!menuOpen}
      >
        <nav className="nav-drawer-links" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-drawer-link"
              ref={(el) => (drawerLinksRef.current[index] = el)}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="nav-drawer-link-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="nav-drawer-apply"
          href="#apply"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          Apply Now
        </a>
      </div>
      </header>
    </>
  );
}
