import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const mediaFrameRef = useRef(null);
  const statsSectionRef = useRef(null);

  const stats = useMemo(
    () => [
      { end: 150, suffix: "k", label: "Alumni Network" },
      { end: 60, suffix: "%", label: "Placement Support" },
      { end: 30, suffix: "", label: "Years of Excellence" },
      { end: 24, suffix: "/7", label: "Placement Facility" },
    ],
    []
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    const copy = copyRef.current;
    const mediaFrame = mediaFrameRef.current;
    const statsSection = statsSectionRef.current;

    if (!section || !pin || !title || !copy || !mediaFrame || !statsSection)
      return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const titleLines = title.querySelectorAll(".about-story__titleLine");
    const statsItems = statsSection.querySelectorAll(".about-story__stat");
    const numbers = statsSection.querySelectorAll("[data-counter]");

    let countersStarted = false;

    const runCounters = () => {
      if (countersStarted) return;
      countersStarted = true;

      numbers.forEach((el) => {
        const end = Number(el.getAttribute("data-end") || "0");
        const formatter = new Intl.NumberFormat("en-US");
        const state = { value: 0 };

        const update = () => {
          el.textContent = formatter.format(Math.round(state.value));
        };

        gsap
          .timeline()
          .to(state, {
            value: end * 1.04,
            duration: 0.55,
            ease: "power2.out",
            onUpdate: update,
          })
          .to(state, {
            value: end,
            duration: 0.55,
            ease: "expo.out",
            onUpdate: update,
            onComplete: () => {
              el.textContent = formatter.format(end);
            },
          });
      });
    };

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 720px)").matches;

      gsap.set(titleLines, { y: 86, autoAlpha: 0 });
      gsap.set(copy, { x: 56, autoAlpha: 0 });
      gsap.set(mediaFrame, {
        clipPath: "inset(16% 20% 16% 20% round 28px)",
        willChange: "transform, clip-path",
      });
      gsap.set(statsItems, { y: 44, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: isMobile ? "+=190%" : "+=220%",
          scrub: 1,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.addLabel("enter", 0)
        .to(
          titleLines,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
          },
          "enter"
        )
        .to(
          mediaFrame,
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.05,
            ease: "power2.out",
          },
          "enter+=0.05"
        )
        .to(
          copy,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          "enter+=0.12"
        )
        .addLabel("parallax", 1.05)
        .to(
          title,
          {
            yPercent: -18,
            duration: 3.1,
            ease: "none",
          },
          "parallax"
        )
        .to(
          copy,
          {
            yPercent: -9,
            duration: 3.1,
            ease: "none",
          },
          "parallax"
        )
        .to(
          mediaFrame,
          {
            yPercent: -6,
            scale: 1.08,
            duration: 3.1,
            ease: "none",
          },
          "parallax"
        )
        .addLabel("hold", 3.2);

      const statsTl = gsap.timeline({ paused: true });
      statsTl.to(statsItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.12,
      });

      ScrollTrigger.create({
        trigger: statsSection,
        start: "top 80%",
        once: true,
        onEnter: () => {
          statsTl.play(0);
          runCounters();
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-story" id="about" ref={sectionRef}>
      <div className="about-story__pin" ref={pinRef}>
        <div className="about-story__grid">
          <div className="about-story__left">
            <div className="about-story__label">(ABOUT)</div>
            <h2 className="about-story__title" ref={titleRef}>
              <span className="about-story__titleLine">BUILDING</span>
              <span className="about-story__titleLine">FUTURE</span>
              <span className="about-story__titleLine">TECHNOLOGY</span>
              <span className="about-story__titleLine about-story__titleLine--accent">
                LEADERS
              </span>
            </h2>
          </div>

          <div className="about-story__center">
            <div className="about-story__mediaFrame" ref={mediaFrameRef}>
              <img
                className="about-story__media"
                src="/lab.png"
                alt="Students collaborating in a modern computer lab"
                loading="lazy"
              />
            </div>
          </div>

          <div className="about-story__right">
            <p className="about-story__copy" ref={copyRef}>
              The Department of Computer Science prepares students to become
              innovators, software engineers, AI researchers, and technology
              leaders through industry-focused learning, hands-on projects, and
              cutting-edge research.
            </p>
          </div>
        </div>
      </div>

      <div className="about-story__statsSection" ref={statsSectionRef}>
        <div className="about-story__statsWrap">
          <div className="about-story__stats">
            {stats.map((item, index) => (
              <article
                className={`about-story__stat about-story__stat--${
                  index === 0 ? "hero" : index === 1 ? "a" : index === 2 ? "b" : "c"
                }`}
                key={item.label}
              >
                <div className="about-story__metric">
                  <span
                    className="about-story__metricNumber"
                    data-counter
                    data-end={item.end}
                  >
                    0
                  </span>
                  {item.suffix ? (
                    <span className="about-story__metricSuffix">{item.suffix}</span>
                  ) : null}
                </div>
                <div className="about-story__metricLabel">{item.label}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
