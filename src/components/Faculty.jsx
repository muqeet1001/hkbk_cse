import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Faculty.css";

gsap.registerPlugin(ScrollTrigger);

const facultyData = [
    // Left side - 3 images
    { name: "Dr. Priya Sharma", role: "Associate Professor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop", position: { top: "35%", left: "2%", size: "small", rotation: -2 } },
    { name: "Dr. Rajesh Kumar", role: "Professor", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", position: { top: "48%", left: "4%", size: "medium", rotation: 3 } },
    { name: "Prof. Anita Desai", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop", position: { top: "62%", left: "1%", size: "small", rotation: -3 } },

    // Right side - 3 images
    { name: "Dr. Vikram Singh", role: "Associate Professor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", position: { top: "36%", left: "93%", size: "small", rotation: 2 } },
    { name: "Prof. Meera Iyer", role: "Professor", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop", position: { top: "49%", left: "91%", size: "medium", rotation: -2 } },
    { name: "Dr. Arun Patel", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop", position: { top: "63%", left: "94%", size: "small", rotation: 3 } },

    // Top row - 9 images
    { name: "Dr. Kavya Menon", role: "Professor", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", position: { top: "2%", left: "12%", size: "small", rotation: -2 } },
    { name: "Prof. Suresh Reddy", role: "Associate Professor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", position: { top: "1%", left: "21%", size: "medium", rotation: 2 } },
    { name: "Dr. Divya Nair", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop", position: { top: "18%", left: "18%", size: "small", rotation: -1 } },
    { name: "Prof. Ramesh Kumar", role: "Professor", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", position: { top: "2%", left: "33%", size: "medium", rotation: 3 } },
    { name: "Dr. Sneha Iyer", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", position: { top: "1%", left: "45%", size: "large", rotation: 1 } },
    { name: "Prof. Karthik Pillai", role: "Professor", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop", position: { top: "18%", left: "53%", size: "medium", rotation: -3 } },
    { name: "Dr. Pooja Sharma", role: "Associate Professor", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", position: { top: "2%", left: "65%", size: "medium", rotation: 2 } },
    { name: "Prof. Manoj Desai", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop", position: { top: "18%", left: "72%", size: "small", rotation: -1 } },
    { name: "Dr. Deepa Rao", role: "Professor", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop", position: { top: "1%", left: "80%", size: "medium", rotation: 3 } },

    // Bottom row - 9 images
    { name: "Prof. Arjun Menon", role: "Professor", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop", position: { top: "82%", left: "14%", size: "small", rotation: -3 } },
    { name: "Dr. Lakshmi Bhat", role: "Associate Professor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", position: { top: "83%", left: "23%", size: "medium", rotation: 2 } },
    { name: "Prof. Sanjay Das", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop", position: { top: "76%", left: "20%", size: "small", rotation: -1 } },
    { name: "Dr. Nandini Krishna", role: "Professor", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop", position: { top: "82%", left: "35%", size: "medium", rotation: 3 } },
    { name: "Prof. Harish Gopal", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop", position: { top: "83%", left: "47%", size: "large", rotation: 1 } },
    { name: "Dr. Anjali Reddy", role: "Professor", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop", position: { top: "77%", left: "59%", size: "medium", rotation: -3 } },
    { name: "Prof. Aditya Verma", role: "Associate Professor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop", position: { top: "82%", left: "70%", size: "medium", rotation: 2 } },
    { name: "Dr. Riya Iyer", role: "Assistant Professor", image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop", position: { top: "77%", left: "77%", size: "small", rotation: -1 } },
    { name: "Prof. Nitin Pillai", role: "Professor", image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=400&h=400&fit=crop", position: { top: "83%", left: "84%", size: "medium", rotation: 3 } },
];

export default function Faculty() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const cards = cardsRef.current.filter(Boolean);
        gsap.set(cards, { opacity: 0, scale: 0.8, y: 30 });

        const content = section.querySelector(".faculty__content");
        const headingInners = content.querySelectorAll(
            ".faculty__heading-inner"
        );
        const label = content.querySelector(".faculty__label");
        const desc = content.querySelector(".faculty__description");

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 70%",
                onEnter: () => {
                    gsap.to(cards, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: { amount: 0.6, from: "random" },
                        ease: "power2.out",
                    });
                },
            });

            // ---- Elyse-style masked reveal for the heading block ----
            gsap.set(headingInners, { yPercent: 115 });
            gsap.set([label, desc], { y: 26, autoAlpha: 0 });

            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: content,
                        start: "top 82%",
                        once: true,
                    },
                })
                .to(label, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out",
                })
                .to(
                    headingInners,
                    {
                        yPercent: 0,
                        duration: 1.1,
                        ease: "expo.out",
                        stagger: 0.12,
                    },
                    "-=0.4"
                )
                .to(
                    desc,
                    { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
                    "-=0.7"
                );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="faculty" id="faculty" ref={sectionRef}>
            <div className="faculty__container">
                <div className="faculty__floating-images">
                    {facultyData.map((member, index) => (
                        <div
                            className={`faculty__image-card faculty__image-card--${member.position.size}`}
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            style={{ top: member.position.top, left: member.position.left, transform: `rotate(${member.position.rotation}deg)` }}
                        >
                            <img src={member.image} alt={member.name} className="faculty__image" loading="lazy" decoding="async" />
                            <div className="faculty__tooltip">
                                <div className="faculty__tooltip-name">{member.name}</div>
                                <div className="faculty__tooltip-role">{member.role}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faculty__content">
                    <div className="faculty__label">(FACULTY)</div>
                    <h2 className="faculty__heading">
                        <span className="faculty__heading-line">
                            <span className="faculty__heading-inner">MEET OUR</span>
                        </span>
                        <span className="faculty__heading-line faculty__heading-line--accent">
                            <span className="faculty__heading-inner">EXPERT FACULTY</span>
                        </span>
                    </h2>
                    <p className="faculty__description">
                        Learn from experienced educators and industry professionals dedicated to shaping the next generation of technology leaders
                    </p>
                </div>
            </div>
        </section>
    );
}
