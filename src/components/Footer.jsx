import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { label: "LinkedIn", href: "https://linkedin.com/company/hkbkcse" },
    { label: "GitHub", href: "https://github.com/hkbkcse" },
    { label: "X (Twitter)", href: "https://twitter.com/hkbkcse" },
    { label: "Instagram", href: "https://instagram.com/hkbkcse" },
    { label: "Discord", href: "https://discord.gg/hkbkcse" },
];

const EXPLORE = [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Faculty", href: "#faculty" },
    { label: "Placements", href: "#placements" },
];

const RESOURCES = [
    { label: "Admissions", href: "#apply" },
    { label: "Contact", href: "#contact" },
];

function Footer() {
    const footerRef = useRef(null);
    const wordmarkRef = useRef(null);
    const emailRef = useRef(null);
    const ctaRef = useRef(null);
    const metaRef = useRef(null);

    useLayoutEffect(() => {
        const footer = footerRef.current;
        const wordmark = wordmarkRef.current;
        if (!footer) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            // ---- 3D wordmark: lays back on scroll, stands up at rest ----
            if (wordmark) {
                gsap.fromTo(
                    wordmark,
                    { rotateX: 65, y: 80, opacity: 0.2 },
                    {
                        rotateX: 0,
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: footer,
                            start: "top 85%",
                            end: "bottom bottom",
                            scrub: 1,
                        },
                    }
                );
            }

            // ---- Staggered reveal of content blocks ----
            const reveals = [ctaRef.current, metaRef.current].filter(Boolean);

            reveals.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        delay: i * 0.12,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                        },
                    }
                );
            });

            // ---- Elyse-style masked reveal for the giant email ----
            const emailInner = emailRef.current
                ? emailRef.current.querySelector(".footer__email-inner")
                : null;
            if (emailInner) {
                gsap.set(emailInner, { yPercent: 115 });
                gsap.to(emailInner, {
                    yPercent: 0,
                    duration: 1.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: emailRef.current,
                        start: "top 88%",
                        once: true,
                    },
                });
            }
        }, footer);

        return () => ctx.revert();
    }, []);

    return (
        <footer className="footer" id="contact" ref={footerRef}>
            <div className="footer__inner">
                {/* TOP ROW — CTA + SOCIAL STRIP */}
                <div className="footer__top" ref={ctaRef}>
                    <div className="footer__cta">
                        <p className="footer__cta-line">
                            Drop us a line, and we&apos;ll
                            <br />
                            get in touch!
                        </p>
                        <a className="footer__cta-link" href="#apply">
                            Apply Now
                        </a>
                    </div>

                    <nav className="footer__socials" aria-label="Social media">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="footer__social-tick" />
                                {social.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* GIANT EMAIL */}
                <a
                    className="footer__email"
                    href="mailto:cse@hkbk.edu.in"
                    ref={emailRef}
                >
                    <span className="footer__email-text">
                        <span className="footer__email-inner">
                            cse@hkbk.edu.in
                        </span>
                    </span>
                    <svg
                        className="footer__email-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M6 18 L18 6 M8 6 H18 V16"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>

                {/* META — ADDRESS + LINK COLUMNS */}
                <div className="footer__meta" ref={metaRef}>
                    <div className="footer__meta-col footer__meta-col--wide">
                        <h4 className="footer__col-title">Visit Us</h4>
                        <address className="footer__address">
                            22/1 Nagawara, Arabic College Post,
                            <br />
                            Bengaluru, Karnataka — 560045
                        </address>
                    </div>

                    <nav
                        className="footer__meta-col"
                        aria-label="Explore"
                    >
                        <h4 className="footer__col-title">Explore</h4>
                        <div className="footer__col-links">
                            {EXPLORE.map((item) => (
                                <a key={item.label} href={item.href}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </nav>

                    <nav
                        className="footer__meta-col"
                        aria-label="Resources"
                    >
                        <h4 className="footer__col-title">Resources</h4>
                        <div className="footer__col-links">
                            {RESOURCES.map((item) => (
                                <a key={item.label} href={item.href}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* LEGAL ROW */}
                <div className="footer__legal">
                    <span>
                        © {new Date().getFullYear()} HKBK College of
                        Engineering. All rights reserved.
                    </span>
                    <span>Building tomorrow&apos;s tech innovators.</span>
                </div>
            </div>

            {/* 3D WORDMARK BAND */}
            <div className="footer__wordmark-stage">
                <div className="footer__wordmark" ref={wordmarkRef}>
                    <span>HKBK CSE</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
