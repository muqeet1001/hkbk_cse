import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ started }) {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const scrimRef = useRef(null);
    const sideRef = useRef(null);
    const indexRef = useRef(null);
    const kickerRef = useRef(null);
    const wordInnerRef = useRef(null);
    const deptRef = useRef(null);
    const scrollRef = useRef(null);
    const playedRef = useRef(false);
    const entranceCtxRef = useRef(null);

    const reduceMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Slow the footage down a touch for a cinematic feel.
    useEffect(() => {
        const video = videoRef.current;
        if (video) video.playbackRate = 0.7;
    }, []);

    // Pre-entrance hidden state on mount (nothing flashes while the loader
    // is still covering the screen).
    useLayoutEffect(() => {
        if (reduceMotion()) return;
        gsap.set(videoRef.current, {
            scale: 1.14,
            filter: "blur(14px)",
        });
        gsap.set(scrimRef.current, { autoAlpha: 0 });
        gsap.set([sideRef.current, indexRef.current], { autoAlpha: 0, y: 20 });
        gsap.set([kickerRef.current, deptRef.current, scrollRef.current], {
            autoAlpha: 0,
            y: 18,
        });
        gsap.set(wordInnerRef.current, { yPercent: 118 });
    }, []);

    // Play the entrance once — guarded so the loader signal and the safety
    // fallback can't double-fire it.
    const playEntrance = () => {
        if (playedRef.current) return;
        playedRef.current = true;

        const done = () =>
            window.dispatchEvent(new Event("heroVideoComplete"));

        if (reduceMotion()) {
            done();
            return;
        }

        entranceCtxRef.current = gsap.context(() => {
            gsap
                .timeline({ onComplete: done })
                // Cinematic focus-in: the footage settles and sharpens.
                .to(videoRef.current, {
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.6,
                    ease: "expo.out",
                })
                .to(
                    scrimRef.current,
                    { autoAlpha: 1, duration: 1.2, ease: "power2.out" },
                    0
                )
                .to(
                    [sideRef.current, indexRef.current],
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.12,
                    },
                    "-=1.1"
                )
                .to(
                    kickerRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.9"
                )
                .to(
                    wordInnerRef.current,
                    { yPercent: 0, duration: 1.15, ease: "expo.out" },
                    "-=0.6"
                )
                .to(
                    deptRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
                    "-=0.75"
                )
                .to(
                    scrollRef.current,
                    { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.7"
                );
        }, sectionRef);
    };

    // Play when the loader hands off (started flips true).
    useEffect(() => {
        if (started) playEntrance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started]);

    // Safety net: never leave the hero blank if the loader signal is missed.
    useEffect(() => {
        const t = setTimeout(playEntrance, 6000);
        return () => {
            clearTimeout(t);
            if (entranceCtxRef.current) entranceCtxRef.current.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Scroll choreography — cinematic parallax as the hero leaves.
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section || reduceMotion()) return;

        const ctx = gsap.context(() => {
            gsap.to(videoRef.current, {
                scale: 1.16,
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
            gsap.to(".hero-ui", {
                autoAlpha: 0,
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "62% top",
                    scrub: 1,
                },
            });
            gsap.to(scrimRef.current, {
                opacity: 1.35,
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
            className="hero"
            id="home"
            aria-label="HKBK — Computer Science & Engineering"
            ref={sectionRef}
        >
            <h1 className="hero-sr">
                HKBK — Computer Science &amp; Engineering
            </h1>

            {/* Full-bleed cinematic footage — the hero */}
            <div className="hero-media">
                <video
                    ref={videoRef}
                    className="hero-video"
                    src="/video/hero.mp4"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-hidden="true"
                    disablePictureInPicture
                />
                <div className="hero-scrim" ref={scrimRef} />
            </div>

            {/* Restrained editorial overlay */}
            <div className="hero-ui">
                <span className="hero-ui__side" ref={sideRef}>
                    Bengaluru — India
                </span>

                <span className="hero-ui__index" ref={indexRef}>
                    (01 — Home)
                </span>

                <div className="hero-ui__lead">
                    <span className="hero-ui__kicker" ref={kickerRef}>
                        Department of Computer Science &amp; Engineering
                    </span>

                    <h2 className="hero-ui__word" aria-hidden="true">
                        <span className="hero-ui__wordMask">
                            <span
                                className="hero-ui__wordInner"
                                ref={wordInnerRef}
                            >
                                HKBK
                            </span>
                        </span>
                    </h2>

                    <p className="hero-ui__dept" ref={deptRef}>
                        <em>Where ideas learn to compute</em> — innovation
                        cultivated, research-driven, future-ready engineers
                        empowered.
                    </p>
                </div>

                <a className="hero-ui__scroll" href="#about" ref={scrollRef}>
                    <span className="hero-ui__scrollLabel">Scroll</span>
                    <span className="hero-ui__scrollLine" />
                </a>
            </div>
        </section>
    );
}
