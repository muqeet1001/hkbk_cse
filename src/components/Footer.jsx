import './Footer.css';

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/hkbkcse' },
    { label: 'GitHub', href: 'https://github.com/hkbkcse' },
    { label: 'X (Twitter)', href: 'https://twitter.com/hkbkcse' },
    { label: 'Instagram', href: 'https://instagram.com/hkbkcse' },
    { label: 'Discord', href: 'https://discord.gg/hkbkcse' },
];

const EXPLORE = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Placements', href: '#placements' },
];

const RESOURCES = [
    { label: 'Admissions', href: '#apply' },
    { label: 'Contact', href: 'mailto:cse@hkbk.edu.in' },
];

function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="footer__inner">
                <div className="footer__top">
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
                                {social.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <a className="footer__email" href="mailto:cse@hkbk.edu.in">
                    <span className="footer__email-text">cse@hkbk.edu.in</span>
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

                <div className="footer__meta">
                    <address className="footer__address">
                        22/1 Nagawara, Arabic College Post,
                        <br />
                        Bengaluru, Karnataka — 560045
                    </address>

                    <nav className="footer__col" aria-label="Explore">
                        {EXPLORE.map((item) => (
                            <a key={item.label} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <nav className="footer__col" aria-label="Resources">
                        {RESOURCES.map((item) => (
                            <a key={item.label} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="footer__legal">
                    <span>© 2025 HKBK College of Engineering. All rights reserved.</span>
                    <span>Building tomorrow&apos;s tech innovators 💙</span>
                </div>
            </div>

            <div className="footer__wordmark" aria-hidden="true">
                <span>HKBK CSE</span>
            </div>
        </footer>
    );
}

export default Footer;
