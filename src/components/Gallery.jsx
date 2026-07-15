import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const shots = [
    { src: "/images/gallery-campus.webp", cls: "g--feature", alt: "HKBK students in conversation on campus" },
    { src: "/images/portrait-1.webp", cls: "", alt: "An HKBK Computer Science student" },
    { src: "/images/portrait-2.webp", cls: "", alt: "An HKBK Computer Science student" },
    { src: "/images/gallery-vr.webp", cls: "g--banner", alt: "A student exploring virtual reality at HKBK" },
];

export default function Gallery() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const header = headerRef.current;
            const inner = header.querySelector(".gallery__titleInner");
            const eyebrow = header.querySelector(".gallery__eyebrow");

            gsap.set(inner, { yPercent: 115 });
            gsap.set(eyebrow, { y: 24, autoAlpha: 0 });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: header,
                        start: "top 82%",
                        once: true,
                    },
                })
                .to(eyebrow, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .to(
                    inner,
                    { yPercent: 0, duration: 1.1, ease: "expo.out" },
                    "-=0.5"
                );

            const figures = section.querySelectorAll(".gallery__item");
            gsap.set(figures, {
                autoAlpha: 0,
                y: 40,
                clipPath: "inset(8% 8% 8% 8% round 16px)",
            });
            gsap.to(figures, {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".gallery__grid",
                    start: "top 82%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="gallery" id="life" ref={sectionRef}>
            <div className="gallery__wrap">
                <header className="gallery__header" ref={headerRef}>
                    <div className="gallery__eyebrow">
                        <span className="gallery__eyebrowDot" />
                        (Campus Life)
                    </div>
                    <h2 className="gallery__title">
                        <span className="gallery__titleMask">
                            <span className="gallery__titleInner">
                                Life at <em>HKBK</em>
                            </span>
                        </span>
                    </h2>
                </header>

                <div className="gallery__grid">
                    {shots.map((s, i) => (
                        <figure
                            className={`gallery__item ${s.cls}`}
                            key={i}
                        >
                            <img
                                className="gallery__img"
                                src={s.src}
                                alt={s.alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
