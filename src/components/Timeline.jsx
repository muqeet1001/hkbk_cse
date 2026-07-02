import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        phase: "01",
        title: "Foundation",
        date: "Semester 1-2",
        items: [
            "Programming Fundamentals",
            "C Programming",
            "Python Basics",
            "Problem Solving",
            "Computational Thinking",
        ],
    },
    {
        phase: "02",
        title: "Core Computer Science",
        date: "Semester 3-4",
        items: [
            "Data Structures",
            "Algorithms",
            "Object-Oriented Programming",
            "Database Systems",
            "Operating Systems",
        ],
    },
    {
        phase: "03",
        title: "Software Development",
        date: "Semester 5-6",
        items: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Backend Development",
        ],
    },
    {
        phase: "04",
        title: "Emerging Technologies",
        date: "Semester 7",
        items: [
            "Artificial Intelligence",
            "Machine Learning",
            "Cloud Computing",
            "Cyber Security",
            "Internet of Things",
        ],
    },
    {
        phase: "05",
        title: "Industry Experience",
        date: "Semester 7-8",
        items: [
            "Hackathons",
            "Open Source",
            "Internship",
            "Team Projects",
            "Industry Mentorship",
        ],
    },
    {
        phase: "06",
        title: "Career Ready",
        date: "Semester 8",
        items: [
            "Capstone Project",
            "Resume Building",
            "Placement Training",
            "Technical Interviews",
            "Career Opportunities",
        ],
    },
];

export default function Timeline() {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;

        if (!section || !pin || !track || !progress) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        const capsules = track.querySelectorAll(".timeline__capsule");
        const bullets = track.querySelectorAll(".timeline__bullet");
        const dates = track.querySelectorAll(".timeline__date");

        gsap.set(capsules, { opacity: 0.4, scale: 0.9 });
        gsap.set(bullets, { opacity: 0, y: 10 });
        gsap.set(dates, { opacity: 0.3 });
        gsap.set(progress, { scaleX: 0 });

        const ctx = gsap.context(() => {
            const scrollDistance = track.scrollWidth - window.innerWidth + 400;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pin,
                    start: "top top",
                    end: `+=${scrollDistance * 1.2}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(track, {
                x: -scrollDistance,
                ease: "none",
                duration: 1,
            }).to(progress, {
                scaleX: 1,
                ease: "none",
                duration: 1,
            }, 0);

            capsules.forEach((capsule) => {
                const phase = capsule.closest(".timeline__phase");
                const phaseBullets = phase.querySelectorAll(".timeline__bullet");
                const phaseDate = phase.querySelector(".timeline__date");

                ScrollTrigger.create({
                    trigger: capsule,
                    start: "left 60%",
                    end: "right 40%",
                    containerAnimation: tl,
                    onEnter: () => {
                        gsap.to(capsule, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
                        gsap.to(phaseDate, { opacity: 1, duration: 0.4, ease: "power2.out" });
                        gsap.to(phaseBullets, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
                    },
                    onLeave: () => {
                        gsap.to(capsule, { opacity: 0.4, scale: 0.9, duration: 0.4 });
                        gsap.to(phaseDate, { opacity: 0.3, duration: 0.3 });
                    },
                    onEnterBack: () => {
                        gsap.to(capsule, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
                        gsap.to(phaseDate, { opacity: 1, duration: 0.4 });
                    },
                    onLeaveBack: () => {
                        gsap.to(capsule, { opacity: 0.4, scale: 0.9, duration: 0.4 });
                        gsap.to(phaseDate, { opacity: 0.3, duration: 0.3 });
                    },
                });
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="timeline" ref={sectionRef}>
            <div className="timeline__header">
                <div className="timeline__label">Journey highlights</div>
                <h2 className="timeline__heading">Timeline</h2>
            </div>

            <div className="timeline__pin" ref={pinRef}>
                <div className="timeline__container">
                    <div className="timeline__track" ref={trackRef}>
                        {timelineData.map((phase, index) => (
                            <div
                                className={`timeline__phase timeline__phase--${index % 2 === 0 ? "top" : "bottom"}`}
                                key={phase.phase}
                            >
                                <div className="timeline__capsule-wrapper">
                                    <div className="timeline__capsule">
                                        <span className="timeline__title">{phase.title}</span>
                                    </div>
                                    <div className="timeline__connector"></div>
                                    <div className="timeline__dot"></div>
                                </div>

                                <div className="timeline__date">{phase.date}</div>

                                <ul className="timeline__list">
                                    {phase.items.map((item, idx) => (
                                        <li className="timeline__bullet" key={idx}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="timeline__line">
                        <div className="timeline__progress" ref={progressRef}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
