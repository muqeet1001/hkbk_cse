import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
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
      lerp: 0.09,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
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

      <main className="landing-page">
        <Navigation />
        <Hero />
        <About />
      </main>
    </>
  );
}

export default App;
