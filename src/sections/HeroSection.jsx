import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = ({ isLoading, onVideoLoaded }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const [videoEnded, setVideoEnded] = useState(isTablet);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const isFirstRender = useRef(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isLoading && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video auto-play interrupted:", err);
      });
    }
  }, [isLoading]);

  const words = [
    "Coconut Tender",
    "100% Natural",
    "Pure Hydration",
    "Electrolytes",
    "Fresh Energy"
  ];

  useEffect(() => {
    if (isTablet) {
      setVideoEnded(true);
      if (onVideoLoaded) onVideoLoaded();
    }
  }, [isTablet, onVideoLoaded]);

  useEffect(() => {
    if (isTablet) return;
    const video = videoRef.current;
    if (video) {
      const handleLoaded = () => {
        if (onVideoLoaded) onVideoLoaded();
      };

      if (video.readyState >= 3) {
        handleLoaded();
      } else {
        video.addEventListener("canplaythrough", handleLoaded);
        video.addEventListener("loadeddata", handleLoaded);
      }

      return () => {
        video.removeEventListener("canplaythrough", handleLoaded);
        video.removeEventListener("loadeddata", handleLoaded);
      };
    }
  }, [isTablet, onVideoLoaded]);

  // Looping text slide cycle - only starts after video has ended / content revealed
  useEffect(() => {
    if (!videoEnded) return;

    const timer = setInterval(() => {
      isFirstRender.current = false;
      gsap.to(".hero-text-inner", {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [videoEnded]);

  // Slide-in animation for new word
  useEffect(() => {
    if (!videoEnded) return;
    if (isFirstRender.current) return;

    gsap.fromTo(".hero-text-inner", 
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [currentWordIndex, videoEnded]);

  useGSAP(() => {
    if (!videoEnded) return;

    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline();

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        " .hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );
  }, [videoEnded]);

  useGSAP(() => {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="home" className="bg-red-brown">
      <div className="hero-container">
        {isTablet ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#faeade] to-[#e3d3bc]"></div>
            {isMobile && (
              <img
                src="/images/hero-bg.webp"
                className="absolute inset-0 size-full object-cover opacity-20 mix-blend-multiply"
              />
            )}
            <img
              src="/images/hero-img.webp"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-h-[50vh] md:max-h-[60vh] object-contain"
            />
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              src="/videos/Hero-New-Bg.mp4"
              muted
              playsInline
              onCanPlayThrough={onVideoLoaded}
              onLoadedData={onVideoLoaded}
              onEnded={() => setVideoEnded(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-black/40 z-0 transition-opacity duration-1000 ${videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
          </>
        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Nature's Finest Sip</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1 className="hero-text-inner inline-block w-full">
                {words[currentWordIndex]}
              </h1>
            </div>
          </div>

          <h2>
            Pure. Refreshing. Real. Zestra Coconut Tender brings you the crisp,
            natural sweetness of tender coconut — sealed fresh in every can.
          </h2>

          <div className="hero-button">
            <p>Crack Open a Zestra</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
