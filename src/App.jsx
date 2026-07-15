import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Approvals from "./components/Approvals";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import Campus from "./components/Campus";
import Timeline from "./components/Timeline";
import Faculty from "./components/Faculty";
import Placements from "./components/Placements";
import Footer from "./components/Footer";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    // Heavier lerp => that buttery, weighted inertia premium sites have.
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
      infinite: false,
      anchors: { offset: -100 },
    });

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className="grain-overlay" aria-hidden="true"></div>

      <main className="landing-page">
        <Navigation />
        <Hero started={!loading} />
        <Approvals />
        <About />
        <VisionMission />
        <Campus />
        <Timeline />
        <Faculty />
        <Placements />
        <Footer />
      </main>
    </>
  );
}

export default App;
