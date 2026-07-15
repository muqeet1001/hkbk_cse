import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Newsroom.css";

gsap.registerPlugin(ScrollTrigger);

// Real happenings sourced from hkbk.edu.in
const news = [
    {
        date: "Dec 2025",
        tag: "Faculty Development",
        title: "Digital Footprints — Tracing Cyber Crime through Forensics",
    },
    {
        date: "Sep 2025",
        tag: "Research",
        title: "Healthcare Clinical Analysis via Deep Learning & Generative AI",
    },
    {
        date: "Jul 2025",
        tag: "AICTE FDP",
        title: "Digital Fortress — Empowering Educators in Cyber Defence",
    },
    {
        date: "2025",
        tag: "Workshop",
        title: "Real-World Applications of Artificial Intelligence",
    },
];

export default function Newsroom() {
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
            const inner = header.querySelector(".news__titleInner");
            const eyebrow = header.querySelector(".news__eyebrow");

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

            const rows = section.querySelectorAll(".news__row");
            gsap.set(rows, { y: 26, autoAlpha: 0 });
            gsap.to(rows, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".news__list",
                    start: "top 84%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="news" id="newsroom" ref={sectionRef}>
            <div className="news__wrap">
                <header className="news__header" ref={headerRef}>
                    <div className="news__eyebrow">
                        <span className="news__eyebrowDot" />
                        (Newsroom)
                    </div>
                    <h2 className="news__title">
                        <span className="news__titleMask">
                            <span className="news__titleInner">
                                Latest at <em>CSE</em>
                            </span>
                        </span>
                    </h2>
                </header>

                <div className="news__list">
                    {news.map((n, i) => (
                        <article className="news__row" key={i}>
                            <span className="news__date">{n.date}</span>
                            <span className="news__tag">{n.tag}</span>
                            <h3 className="news__rowTitle">{n.title}</h3>
                            <span className="news__arrow">→</span>
                        </article>
                    ))}
                </div>

                <a
                    className="news__more"
                    href="https://hkbk.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View all updates
                    <span className="news__moreArrow">→</span>
                </a>
            </div>
        </section>
    );
}
