import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const FramesSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 192;
    const currentFrame = (index) =>
      `/images/frames/${String(index + 1).padStart(5, "0")}.webp`;

    const images = [];
    const frames = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        // If the currently needed frame just finished loading, render it!
        if (Math.round(frames.frame) === i) {
          render();
        }
      };
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      const currentIdx = Math.round(frames.frame);
      if (images[currentIdx] && images[currentIdx].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[currentIdx], 0, 0, canvas.width, canvas.height);
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // Increase scroll duration slightly for better pacing
        scrub: 1, // Make scrub slightly smoother (1 second catchup)
        pin: true,
      },
    });

    tl.to(frames, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    // Card animations synced to scroll
    cardsRef.current.forEach((card, i) => {
      const isLast = i === cardsRef.current.length - 1;
      tl.fromTo(
        card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1 },
        (i / cardsRef.current.length) * 0.8
      );
      if (!isLast) {
        tl.to(card, { opacity: 0, y: -50, duration: 0.1 }, "+=0.15");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden z-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Floating Cards Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-5 md:px-32 pointer-events-none">
        
        <div 
          ref={addToCardsRef} 
          className="max-w-sm md:max-w-md bg-black/40 backdrop-blur-md border-l-4 border-[#40a036] p-6 md:p-8 rounded-xl shadow-2xl absolute top-1/2 -translate-y-1/2 left-5 md:left-32 opacity-0"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#40a036] mb-3 uppercase tracking-wide font-sans">
            Pure Refreshment
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-paragraph leading-relaxed">
            Experience the crisp, cool taste that awakens your senses. Every sip is a journey back to fearless fun.
          </p>
        </div>

        <div 
          ref={addToCardsRef} 
          className="max-w-sm md:max-w-md bg-[#053319]/70 backdrop-blur-md border-r-4 border-[#f5a623] p-6 md:p-8 rounded-xl shadow-2xl absolute top-1/2 -translate-y-1/2 right-5 md:right-32 opacity-0"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#f5a623] mb-3 uppercase tracking-wide font-sans">
            Explosive Flavor
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-paragraph leading-relaxed">
            Packed with epic taste, Zestra fuels your adventures all day long. Shatter boredom with every chug.
          </p>
        </div>

        <div 
          ref={addToCardsRef} 
          className="max-w-sm md:max-w-md bg-black/40 backdrop-blur-md border-l-4 border-[#40a036] p-6 md:p-8 rounded-xl shadow-2xl absolute top-1/2 -translate-y-1/2 left-5 md:left-32 opacity-0"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wide font-sans">
            Ready to <span className="text-[#f5a623]">Chug</span>
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-paragraph leading-relaxed">
            Grab a can, twist the cap, and let the good times roll. Zestra is your perfect companion everywhere you go.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FramesSection;
