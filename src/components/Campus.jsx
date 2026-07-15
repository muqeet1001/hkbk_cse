import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Campus.css";

gsap.registerPlugin(ScrollTrigger);

const shots = [
    { src: "/images/gallery-campus.webp", cls: "c--feature", alt: "HKBK students in conversation on campus" },
    { src: "/images/portrait-1.webp", cls: "", alt: "An HKBK Computer Science student" },
    { src: "/images/portrait-2.webp", cls: "", alt: "An HKBK Computer Science student" },
    { src: "/hkbkbuilding.png", cls: "c--banner", alt: "HKBK College of Engineering campus at blue hour" },
];

export default function Campus() {
    const sectionRef = useRef(null);
    const heroRef = useRef(null);
    const mediaRef = useRef(null);
    const imgRef = useRef(null);
    const labelRef = useRef(null);
    const noteRef = useRef(null);
    const metaRef = useRef(null);
    const lifeHeadRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const lines = section.querySelectorAll(".campus__titleInner");

        const ctx = gsap.context(() => {
            // ---- Award-style reveal: the hero image unveils from a centered
            // frame to full-bleed as you scroll into it, with a cinematic
            // zoom-out. Both are scrubbed to scroll position. ----
            gsap.fromTo(
                mediaRef.current,
                { clipPath: "inset(14% 10% 14% 10% round 30px)" },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top bottom",
                        end: "top 22%",
                        scrub: 1,
                    },
                }
            );
            gsap.fromTo(
                imgRef.current,
                { scale: 1.3 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top bottom",
                        end: "top 22%",
                        scrub: 1,
                    },
                }
            );
            // A gentle continuing drift once revealed, for parallax depth.
            gsap.fromTo(
                imgRef.current,
                { yPercent: 0 },
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top 22%",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );

            // Headline reveals once the image has mostly opened up.
            gsap.set(lines, { yPercent: 120 });
            gsap.set([labelRef.current, noteRef.current, metaRef.current], {
                y: 26,
                autoAlpha: 0,
            });
            gsap
                .timeline({
                    scrollTrigger: { trigger: heroRef.current, start: "top 42%", once: true },
                })
                .to(labelRef.current, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" })
                .to(lines, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.12 }, "-=0.45")
                .to(noteRef.current, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }, "-=0.8")
                .to(metaRef.current, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }, "-=0.75");

            // Campus-life gallery reveals + scroll parallax
            const head = lifeHeadRef.current;
            gsap.set(head, { y: 24, autoAlpha: 0 });
            gsap.to(head, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: head, start: "top 88%", once: true },
            });

            const figures = section.querySelectorAll(".campus__item");
            gsap.set(figures, {
                autoAlpha: 0,
                y: 42,
                clipPath: "inset(8% 8% 8% 8% round 16px)",
            });
            gsap.to(figures, {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0% 0% 0% 0% round 16px)",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".campus__grid", start: "top 82%", once: true },
            });
            section.querySelectorAll(".campus__img2").forEach((im) => {
                gsap.fromTo(
                    im,
                    { yPercent: -7 },
                    {
                        yPercent: 7,
                        ease: "none",
                        scrollTrigger: {
                            trigger: im.closest(".campus__item"),
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="campus" id="campus" ref={sectionRef}>
            <div className="campus__hero" ref={heroRef}>
                <div className="campus__media" ref={mediaRef}>
                    <img
                        ref={imgRef}
                        className="campus__img"
                        src="/images/gallery-vr.webp"
                        alt="An HKBK student exploring virtual reality"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="campus__scrim" />
                </div>

                <div className="campus__inner">
                    <div className="campus__lead">
                        <span className="campus__label" ref={labelRef}>
                            <span className="campus__labelDot" />
                            (The Campus)
                        </span>
                        <h2 className="campus__title">
                            <span className="campus__titleMask">
                                <span className="campus__titleInner">
                                    Where futures
                                </span>
                            </span>
                            <span className="campus__titleMask">
                                <span className="campus__titleInner campus__titleInner--accent">
                                    take shape
                                </span>
                            </span>
                        </h2>
                        <p className="campus__note" ref={noteRef}>
                            A landmark campus in the heart of Bengaluru — studios,
                            labs, and future-focused spaces engineered for deep,
                            focused work.
                        </p>
                    </div>

                    <div className="campus__meta" ref={metaRef}>
                        <span>HKBK College of Engineering</span>
                        <span>Nagawara · Bengaluru</span>
                    </div>
                </div>
            </div>

            <div className="campus__life">
                <div className="campus__lifeWrap">
                    <div className="campus__lifeHead" ref={lifeHeadRef}>
                        <span className="campus__labelDot" />
                        Life on campus
                    </div>
                    <div className="campus__grid">
                        {shots.map((s, i) => (
                            <figure className={`campus__item ${s.cls}`} key={i}>
                                <img
                                    className="campus__img2"
                                    src={s.src}
                                    alt={s.alt}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
