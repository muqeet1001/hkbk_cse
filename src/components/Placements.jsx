import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Placements.css";

gsap.registerPlugin(ScrollTrigger);

// Real placed students + recruiters sourced from hkbk.edu.in
const placed = [
    { src: "/images/placed-samsung.webp", name: "Kenisha Singh", company: "Samsung" },
    { src: "/images/placed-infosys.webp", name: "Sejal Kumari Gupta", company: "Infosys" },
    { src: "/images/placed-commbank.webp", name: "Suresh Datt Joshi", company: "Commonwealth Bank" },
    { src: "/images/placed-cognizant.webp", name: "Imran Pasha", company: "Cognizant" },
];

const logos = [
    { src: "/images/logo-google.webp", name: "Google" },
    { src: "/images/logo-microsoft.webp", name: "Microsoft" },
    { src: "/images/logo-amazon.webp", name: "Amazon" },
    { src: "/images/logo-adobe.webp", name: "Adobe" },
    { src: "/images/logo-ibm.webp", name: "IBM" },
    { src: "/images/logo-cisco.webp", name: "Cisco" },
    { src: "/images/logo-intel.webp", name: "Intel" },
];

export default function Placements() {
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
            const inner = header.querySelector(".plc__titleInner");
            const eyebrow = header.querySelector(".plc__eyebrow");
            const note = header.querySelector(".plc__note");

            gsap.set(inner, { yPercent: 115 });
            gsap.set([eyebrow, note], { y: 24, autoAlpha: 0 });

            gsap
                .timeline({
                    scrollTrigger: { trigger: header, start: "top 82%", once: true },
                })
                .to(eyebrow, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" })
                .to(inner, { yPercent: 0, duration: 1.1, ease: "expo.out" }, "-=0.5")
                .to(note, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, "-=0.7");

            // Cards reveal + gentle scroll parallax (staggered depths)
            const cards = section.querySelectorAll(".plc__card");
            gsap.set(cards, { autoAlpha: 0, y: 44 });
            gsap.to(cards, {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: ".plc__cards", start: "top 84%", once: true },
            });
            cards.forEach((card, i) => {
                gsap.to(card, {
                    yPercent: -6 - (i % 2) * 6,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".plc__cards",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            });

            // Logo cells reveal
            const cells = section.querySelectorAll(".plc__cell");
            gsap.set(cells, { autoAlpha: 0, y: 22 });
            gsap.to(cells, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: { trigger: ".plc__logos", start: "top 88%", once: true },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="placements" id="placements" ref={sectionRef}>
            <div className="plc__wrap">
                <header className="plc__header" ref={headerRef}>
                    <div className="plc__eyebrow">
                        <span className="plc__eyebrowDot" />
                        (Placements)
                    </div>
                    <h2 className="plc__title">
                        <span className="plc__titleMask">
                            <span className="plc__titleInner">
                                Placed &amp; <em>thriving</em>
                            </span>
                        </span>
                    </h2>
                    <p className="plc__note">
                        Our graduates go on to build careers at the world&apos;s
                        leading technology companies and enterprises.
                    </p>
                </header>

                <div className="plc__cards">
                    {placed.map((p) => (
                        <figure className="plc__card" key={p.name}>
                            <img
                                className="plc__cardImg"
                                src={p.src}
                                alt={`${p.name}, placed at ${p.company}`}
                                loading="lazy"
                                decoding="async"
                            />
                        </figure>
                    ))}
                </div>

                <div className="plc__logosHead">Our recruiters</div>
                <div className="plc__logos">
                    {logos.map((l) => (
                        <div className="plc__cell" key={l.name}>
                            <img
                                className="plc__logo"
                                src={l.src}
                                alt={l.name}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    ))}
                    <div className="plc__cell plc__cell--more">
                        <span>+ many more</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
