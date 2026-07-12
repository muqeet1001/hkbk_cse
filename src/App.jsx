import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Faculty from "./components/Faculty";
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

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
        <Hero />
        <About />
        <Timeline />
        <Faculty />
        <Footer />
      </main>
    </>
  );
}

export default App;
