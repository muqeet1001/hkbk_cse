import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Recruiters.css";

gsap.registerPlugin(ScrollTrigger);

// Real recruiters sourced from hkbk.edu.in/engineering/placements
const logos = [
    { src: "/images/logo-google.webp", name: "Google" },
    { src: "/images/logo-microsoft.webp", name: "Microsoft" },
    { src: "/images/logo-amazon.webp", name: "Amazon" },
    { src: "/images/logo-adobe.webp", name: "Adobe" },
    { src: "/images/logo-ibm.webp", name: "IBM" },
    { src: "/images/logo-cisco.webp", name: "Cisco" },
    { src: "/images/logo-intel.webp", name: "Intel" },
];

export default function Recruiters() {
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
            const inner = header.querySelector(".rec__titleInner");
            const eyebrow = header.querySelector(".rec__eyebrow");
            const note = header.querySelector(".rec__note");

            gsap.set(inner, { yPercent: 115 });
            gsap.set([eyebrow, note], { y: 24, autoAlpha: 0 });

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
                )
                .to(
                    note,
                    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.7"
                );

            const cells = section.querySelectorAll(".rec__cell");
            gsap.set(cells, { autoAlpha: 0, y: 24 });
            gsap.to(cells, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".rec__grid",
                    start: "top 86%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="recruiters" id="recruiters" ref={sectionRef}>
            <div className="rec__wrap">
                <header className="rec__header" ref={headerRef}>
                    <div className="rec__eyebrow">
                        <span className="rec__eyebrowDot" />
                        (Recruiters)
                    </div>
                    <h2 className="rec__title">
                        <span className="rec__titleMask">
                            <span className="rec__titleInner">
                                Where our <em>graduates</em> go
                            </span>
                        </span>
                    </h2>
                    <p className="rec__note">
                        Fortune 500 and leading technology companies recruit from
                        and partner with HKBK.
                    </p>
                </header>

                <div className="rec__grid">
                    {logos.map((l) => (
                        <div className="rec__cell" key={l.name}>
                            <img
                                className="rec__logo"
                                src={l.src}
                                alt={l.name}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    ))}
                    <div className="rec__cell rec__cell--more">
                        <span>+ many more</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
