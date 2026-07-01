import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.7;

    const handleEnded = () => {
      window.dispatchEvent(new Event("heroVideoComplete"));
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll(".letter");
    if (!letters?.length) return;

    letters.forEach((letter) => {
      gsap.set(letter, { opacity: 0, y: 150 });
    });

    gsap.set([taglineRef.current, descriptionRef.current, scrollRef.current], {
      opacity: 0,
      y: 100,
    });

    const tl = gsap.timeline({ delay: 3 });

    letters.forEach((letter, index) => {
      tl.to(
        letter,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        index * 0.5
      );
    });

    tl.to(
      [taglineRef.current, descriptionRef.current, scrollRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.3,
      },
      "+=0.5"
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(video, {
        yPercent: -10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-overlay", {
        opacity: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-scroll-line", {
        scaleX: 1.8,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero-shell"
      id="home"
      aria-label="HKBK CSE hero"
      ref={sectionRef}
    >
      <video
        ref={videoRef}
        className="hero-video"
        src="/video/hero.mp4"
        muted
        playsInline
        autoPlay
      ></video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-layout">
          <div className="hero-text-left" ref={titleRef}>
            <h1 className="hero-title">
              <span className="letter">H</span>
              <span className="letter">K</span>
              <span className="letter">B</span>
              <span className="letter">K</span>
            </h1>
          </div>

          <div className="hero-text-right">
            <p className="hero-tagline" ref={taglineRef}>
              Computer Science & Engineering
            </p>
            <p className="hero-description" ref={descriptionRef}>
              Welcome to the Computer Science & Engineering Department, where
              innovation is cultivated, research drives discovery, and
              future-ready engineers are empowered to build intelligent systems.
            </p>
            <div className="hero-scroll" ref={scrollRef}>
              <span className="hero-scroll-text">Scroll to explore</span>
              <div className="hero-scroll-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
