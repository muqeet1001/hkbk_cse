import "./Approvals.css";

// Real institutional credentials sourced from hkbk.edu.in
const items = [
    "VTU Affiliated",
    "AICTE Approved",
    "NAAC Accredited",
    "NBA Accredited",
    "CET Code — E083",
    "#7 in Bangalore",
    "14-Acre Wi-Fi Campus",
    "Microsoft Collaboration",
    "Google Crowdsource Partner",
];

export default function Approvals() {
    // Duplicated once so the marquee can loop seamlessly at -50%.
    const loop = [...items, ...items];

    return (
        <section className="approvals" aria-label="Accreditations and recognition">
            <div className="approvals__track" aria-hidden="true">
                {loop.map((item, i) => (
                    <span className="approvals__item" key={i}>
                        <span className="approvals__dot" />
                        {item}
                    </span>
                ))}
            </div>
            {/* Static, screen-reader-friendly copy of the list */}
            <p className="approvals__sr">
                {items.join(" · ")}
            </p>
        </section>
    );
}
