import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisionMission.css";

gsap.registerPlugin(ScrollTrigger);

// NOTE: Draft statements grounded in HKBK's stated ethos — replace with the
// department's official VTU/NBA-approved Vision & Mission wording.
const mission = [
    "Deliver a rigorous, industry-aligned curriculum that builds strong fundamentals and hands-on engineering skill.",
    "Foster innovation, research, and problem-solving through modern labs, an innovation centre, and experiential learning.",
    "Build enduring industry partnerships that create real placement and internship pathways for every student.",
    "Cultivate ethical, socially responsible professionals prepared for lifelong learning and leadership.",
];

export default function VisionMission() {
    const sectionRef = useRef(null);
    const mediaRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const eyebrow = section.querySelector(".vm__eyebrow");
            const visionInner = section.querySelector(".vm__visionInner");
            const missionLabel = section.querySelector(".vm__missionLabel");
            const items = section.querySelectorAll(".vm__item");
            const media = mediaRef.current;

            gsap.set(visionInner, { yPercent: 118 });
            gsap.set([eyebrow, missionLabel], { y: 24, autoAlpha: 0 });
            gsap.set(items, { y: 22, autoAlpha: 0 });
            gsap.set(media, {
                clipPath: "inset(12% 10% 12% 10% round 24px)",
            });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 74%",
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
                    visionInner,
                    { yPercent: 0, duration: 1.1, ease: "expo.out" },
                    "-=0.45"
                )
                .to(
                    media,
                    {
                        clipPath: "inset(0% 0% 0% 0% round 24px)",
                        duration: 1.1,
                        ease: "power2.out",
                    },
                    "-=0.85"
                )
                .to(
                    missionLabel,
                    { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
                    "-=0.8"
                )
                .to(
                    items,
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            // Slow parallax drift on the framed image.
            gsap.to(".vm__mediaImg", {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="vm" id="vision" ref={sectionRef}>
            <div className="vm__wrap">
                <div className="vm__eyebrow">
                    <span className="vm__eyebrowDot" />
                    (Vision &amp; Mission)
                </div>

                <div className="vm__vision">
                    <span className="vm__kicker">Our Vision</span>
                    <h2 className="vm__visionTitle">
                        <span className="vm__visionMask">
                            <span className="vm__visionInner">
                                To shape competent, ethical engineers who build a{" "}
                                <em>technology-driven</em> world.
                            </span>
                        </span>
                    </h2>
                </div>

                <div className="vm__lower">
                    <div className="vm__media" ref={mediaRef}>
                        <img
                            className="vm__mediaImg"
                            src="/lab.png"
                            alt="HKBK students working in a computer science lab"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className="vm__mission">
                        <span className="vm__missionLabel">Our Mission</span>
                        <ol className="vm__list">
                            {mission.map((m, i) => (
                                <li className="vm__item" key={i}>
                                    <span className="vm__itemIndex">
                                        M{i + 1}
                                    </span>
                                    <span className="vm__itemText">{m}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
