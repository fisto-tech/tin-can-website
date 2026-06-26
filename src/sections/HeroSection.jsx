import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
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
              src="/videos/Hero-New-Bg.mp4"
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 z-0"></div>
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
              <h1>Coconut Tender</h1>
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
