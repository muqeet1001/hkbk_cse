import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
    {
        num: "01",
        year: "First Year",
        sem: "Semester 1 — 2",
        theme: "Foundation",
        items: [
            "Programming Fundamentals",
            "C Programming",
            "Python Basics",
            "Problem Solving",
            "Computational Thinking",
        ],
    },
    {
        num: "02",
        year: "Second Year",
        sem: "Semester 3 — 4",
        theme: "Core Computer Science",
        items: [
            "Data Structures",
            "Algorithms",
            "Object-Oriented Programming",
            "Database Systems",
            "Operating Systems",
        ],
    },
    {
        num: "03",
        year: "Third Year",
        sem: "Semester 5 — 6",
        theme: "Software Development",
        items: [
            "HTML & CSS",
            "JavaScript",
            "React",
            "Backend Development",
            "APIs & Databases",
        ],
    },
    {
        num: "04",
        year: "Fourth Year",
        sem: "Semester 7 — 8",
        theme: "Emerging Technologies",
        items: [
            "Artificial Intelligence",
            "Machine Learning",
            "Cloud Computing",
            "Cyber Security",
            "Capstone Project",
        ],
    },
];

export default function Timeline() {
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
            // ---- Header: masked reveal ----
            const header = headerRef.current;
            if (header) {
                const inner = header.querySelector(".tl2__titleInner");
                const eyebrow = header.querySelector(".tl2__eyebrow");
                const lede = header.querySelector(".tl2__lede");

                gsap.set(inner, { yPercent: 115 });
                gsap.set([eyebrow, lede], { y: 26, autoAlpha: 0 });

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
                        { yPercent: 0, duration: 1.15, ease: "expo.out" },
                        "-=0.5"
                    )
                    .to(
                        lede,
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.9,
                            ease: "power3.out",
                        },
                        "-=0.8"
                    );
            }

            // ---- Each grid cell: masked theme + staggered ledger ----
            const cells = section.querySelectorAll(".tl2__cell");

            cells.forEach((cell) => {
                const head = cell.querySelector(".tl2__cellHead");
                const themeInner = cell.querySelector(".tl2__themeInner");
                const items = cell.querySelectorAll(".tl2__item");
                const ghost = cell.querySelector(".tl2__ghost");

                gsap.set(head, { y: 22, autoAlpha: 0 });
                gsap.set(themeInner, { yPercent: 120 });
                gsap.set(items, { y: 20, autoAlpha: 0 });
                gsap.set(ghost, { autoAlpha: 0 });

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: cell,
                            start: "top 85%",
                            once: true,
                        },
                    })
                    .to(ghost, { autoAlpha: 1, duration: 1.1, ease: "power2.out" }, 0)
                    .to(
                        head,
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.7,
                            ease: "power3.out",
                        },
                        0
                    )
                    .to(
                        themeInner,
                        { yPercent: 0, duration: 1.05, ease: "expo.out" },
                        0.1
                    )
                    .to(
                        items,
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.65,
                            stagger: 0.07,
                            ease: "power3.out",
                        },
                        0.35
                    );

                // Subtle parallax drift on the oversized ghost numeral.
                if (ghost) {
                    gsap.fromTo(
                        ghost,
                        { yPercent: -5 },
                        {
                            yPercent: 5,
                            ease: "none",
                            scrollTrigger: {
                                trigger: cell,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1,
                            },
                        }
                    );
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="timeline" id="programs" ref={sectionRef}>
            <div className="tl2__wrap">
                <header className="tl2__header" ref={headerRef}>
                    <div className="tl2__eyebrow">
                        <span className="tl2__eyebrowDot" />
                        (Curriculum) — Four Years
                    </div>
                    <h2 className="tl2__title">
                        <span className="tl2__titleMask">
                            <span className="tl2__titleInner">
                                The <em className="tl2__titleEm">Journey</em>
                            </span>
                        </span>
                    </h2>
                    <p className="tl2__lede">
                        A year-by-year roadmap of your Computer Science degree —
                        from your first lines of code to an industry-ready
                        engineer.
                    </p>
                </header>

                <div className="tl2__grid2">
                    {chapters.map((c) => (
                        <article className="tl2__cell" key={c.num}>
                            <span className="tl2__ghost" aria-hidden="true">
                                {c.num}
                            </span>

                            <div className="tl2__cellBody">
                                <div className="tl2__cellHead">
                                    <span className="tl2__index">{c.num}</span>
                                    <span className="tl2__meta">
                                        {c.year}
                                        <span className="tl2__metaSep">/</span>
                                        {c.sem}
                                    </span>
                                </div>

                                <h3 className="tl2__theme">
                                    <span className="tl2__themeMask">
                                        <span className="tl2__themeInner">
                                            {c.theme}
                                        </span>
                                    </span>
                                </h3>

                                <ol className="tl2__list">
                                    {c.items.map((item, i) => (
                                        <li className="tl2__item" key={item}>
                                            <span className="tl2__itemIndex">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="tl2__itemName">
                                                {item}
                                            </span>
                                            <span className="tl2__itemArrow">
                                                →
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
