import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PlacedStudents.css";

gsap.registerPlugin(ScrollTrigger);

const placed = [
    { src: "/images/placed-samsung.webp", name: "Kenisha Singh", company: "Samsung" },
    { src: "/images/placed-infosys.webp", name: "Sejal Kumari Gupta", company: "Infosys" },
    { src: "/images/placed-commbank.webp", name: "Suresh Datt Joshi", company: "Commonwealth Bank" },
    { src: "/images/placed-cognizant.webp", name: "Imran Pasha", company: "Cognizant" },
];

export default function PlacedStudents() {
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
            const inner = header.querySelector(".placed__titleInner");
            const eyebrow = header.querySelector(".placed__eyebrow");
            const note = header.querySelector(".placed__note");

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

            const cards = section.querySelectorAll(".placed__card");
            gsap.set(cards, { autoAlpha: 0, y: 40 });
            gsap.to(cards, {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".placed__grid",
                    start: "top 84%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="placed" id="success" ref={sectionRef}>
            <div className="placed__wrap">
                <header className="placed__header" ref={headerRef}>
                    <div className="placed__eyebrow">
                        <span className="placed__eyebrowDot" />
                        (Success Stories)
                    </div>
                    <h2 className="placed__title">
                        <span className="placed__titleMask">
                            <span className="placed__titleInner">
                                Placed &amp; <em>thriving</em>
                            </span>
                        </span>
                    </h2>
                    <p className="placed__note">
                        Our graduates go on to build careers at the world&apos;s
                        leading technology companies and enterprises.
                    </p>
                </header>

                <div className="placed__grid">
                    {placed.map((p) => (
                        <figure className="placed__card" key={p.name}>
                            <img
                                className="placed__img"
                                src={p.src}
                                alt={`${p.name}, placed at ${p.company}`}
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
