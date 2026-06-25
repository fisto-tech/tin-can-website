import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FramesSection from "./sections/FramesSection";
import FlavorSection from "./sections/FlavorSection";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import Preloader from "./components/Preloader";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis for smooth scrolling only after preloader exits
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <main>
          <NavBar />
          <div>
            <div>
              <HeroSection />
              <MessageSection />
              <FramesSection />
              <FlavorSection />
              <NutritionSection />

              <div>
                <BenefitSection />
                <TestimonialSection />
              </div>

              <FooterSection />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default App;

