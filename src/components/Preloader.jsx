import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const progressTextRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const tagRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // SVG ring setup
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Stroke starts fully hidden, fills as progress increases
    if (ringRef.current) {
      ringRef.current.style.strokeDasharray = circumference;
      ringRef.current.style.strokeDashoffset = circumference;
    }
  }, [circumference]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([logoRef.current, tagRef.current], { opacity: 0, y: 30 });
    gsap.set(progressTextRef.current, { opacity: 0 });

    // 1. Logo rises in
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    // 2. Tag line fades
    tl.to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.2");

    // 3. Progress counter + ring animate together
    tl.to(progressTextRef.current, { opacity: 1, duration: 0.2 }, "-=0.1");

    const countObj = { val: 0 };
    tl.to(countObj, {
      val: 100,
      duration: 0.8,
      ease: "power1.inOut",
      onUpdate: () => {
        const v = Math.round(countObj.val);
        setProgress(v);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = v + "%";
        }
        // Animate ring stroke
        if (ringRef.current) {
          const offset = circumference - (v / 100) * circumference;
          ringRef.current.style.strokeDashoffset = offset;
        }
      },
    }, "-=0.1");

    // 4. Brief pause at 100%
    tl.to({}, { duration: 0.1 });

    // 5. Logo + ring scale up & fade out together
    tl.to([logoRef.current, tagRef.current, progressTextRef.current], {
      opacity: 0,
      scale: 1.15,
      duration: 0.3,
      ease: "power2.in",
    });

    // 6. Full overlay iris-scales up to reveal site
    tl.to(overlayRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    }, "-=0.1");

    return () => tl.kill();
  }, [onComplete, circumference]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Circular progress ring */}
      <div className="relative flex items-center justify-center mb-8">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="absolute"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track ring */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="1.5"
          />
          {/* Progress ring */}
          <circle
            ref={ringRef}
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#f5a623"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />
        </svg>

        {/* Dot that travels around the ring */}
        <div className="relative w-[220px] h-[220px]">
          <div
            ref={dotRef}
            className="absolute w-2 h-2 rounded-full bg-[#f5a623]"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${(progress / 100) * 360 - 90}deg) translate(${radius}px)`,
              boxShadow: "0 0 10px #f5a623, 0 0 25px #f5a623aa",
              transition: "transform 0.05s linear",
            }}
          />
        </div>

        {/* Centered logo inside the ring */}
        <div className="absolute flex items-center justify-center">
          <img
            ref={logoRef}
            src="/images/zestra-transparent-logo.webp"
            alt="Zestra"
            className="w-32 object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Brand tagline */}
      <p
        ref={tagRef}
        className="text-[#084924] text-xs tracking-[0.45em] uppercase mb-5"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Coconut Tender
      </p>

      {/* Percentage */}
      <p
        ref={progressTextRef}
        className="text-black/40 text-sm tabular-nums"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        0%
      </p>
    </div>
  );
};

export default Preloader;
