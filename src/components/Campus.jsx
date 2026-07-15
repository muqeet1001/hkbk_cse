import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Campus.css";

gsap.registerPlugin(ScrollTrigger);

export default function Campus() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const labelRef = useRef(null);
    const noteRef = useRef(null);
    const metaRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const lines = section.querySelectorAll(".campus__titleInner");

        const ctx = gsap.context(() => {
            // Continuous parallax — the architecture settles as you pass it.
            gsap.fromTo(
                imgRef.current,
                { scale: 1.18, yPercent: -6 },
                {
                    scale: 1,
                    yPercent: 6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );

            // Masked headline + supporting reveals on enter.
            gsap.set(lines, { yPercent: 120 });
            gsap.set([labelRef.current, noteRef.current, metaRef.current], {
                y: 26,
                autoAlpha: 0,
            });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 68%",
                        once: true,
                    },
                })
                .to(labelRef.current, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .to(
                    lines,
                    {
                        yPercent: 0,
                        duration: 1.15,
                        ease: "expo.out",
                        stagger: 0.12,
                    },
                    "-=0.45"
                )
                .to(
                    noteRef.current,
                    { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
                    "-=0.8"
                )
                .to(
                    metaRef.current,
                    { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
                    "-=0.75"
                );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="campus" id="campus" ref={sectionRef}>
            <div className="campus__media">
                <img
                    ref={imgRef}
                    className="campus__img"
                    src="/hkbkbuilding.png"
                    alt="HKBK College of Engineering campus at blue hour"
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
                        labs, and quiet courtyards engineered for deep,
                        focused work.
                    </p>
                </div>

                <div className="campus__meta" ref={metaRef}>
                    <span>HKBK College of Engineering</span>
                    <span>Nagawara · Bengaluru</span>
                </div>
            </div>
        </section>
    );
}
