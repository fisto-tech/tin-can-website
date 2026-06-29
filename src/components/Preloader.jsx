import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ isVideoLoaded, onComplete }) => {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const progressTextRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const tagRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);
  const progressVal = useRef({ val: 0 });
  const isLoadedTriggered = useRef(false);

  // SVG ring setup
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const entranceTl = gsap.timeline({
      onComplete: () => setIsEntranceComplete(true)
    });

    // Initial state
    gsap.set([logoRef.current, tagRef.current], { opacity: 0, y: 30, scale: 1 });
    gsap.set(progressTextRef.current, { opacity: 0 });
    gsap.set(bgRef.current, { scale: 1.12 });
    gsap.set(overlayRef.current, { opacity: 1, scale: 1 });

    // 1. Logo rises in
    entranceTl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // 2. Tag line fades
    entranceTl.to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");

    // 3. Progress counter + ring animate together
    entranceTl.to(progressTextRef.current, { opacity: 1, duration: 0.3 }, "-=0.2");

    // Slow, subtle zoom-in of background image during loading
    gsap.to(bgRef.current, {
      scale: 1.25,
      duration: 15,
      ease: "none",
    });

    // Animate progress up to 99% slowly to prevent it from showing "stuck"
    const tween = gsap.to(progressVal.current, {
      val: 99,
      duration: 15.0,
      ease: "power3.out",
      onUpdate: () => {
        const v = Math.round(progressVal.current.val);
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
    });

    return () => {
      entranceTl.kill();
      gsap.killTweensOf(bgRef.current);
      tween.kill();
    };
  }, [circumference]);

  useEffect(() => {
    // Only proceed to completion when entrance is finished and video/fonts are loaded
    if (!isVideoLoaded || !isEntranceComplete || isLoadedTriggered.current) return;
    isLoadedTriggered.current = true;

    // Stop the progress-to-99 tween and background zoom
    gsap.killTweensOf(progressVal.current);
    gsap.killTweensOf(bgRef.current);

    const completeTl = gsap.timeline();

    // 4. Animate to 100% from current value smoothly
    completeTl.to(progressVal.current, {
      val: 100,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const v = Math.round(progressVal.current.val);
        setProgress(v);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = v + "%";
        }
        if (ringRef.current) {
          const offset = circumference - (v / 100) * circumference;
          ringRef.current.style.strokeDashoffset = offset;
        }
      },
    });

    // 5. Brief pause at 100%
    completeTl.to({}, { duration: 0.3 });

    // 6. Logo + ring scale down (zoom out) & fade out together
    completeTl.to([logoRef.current, tagRef.current, progressTextRef.current], {
      opacity: 0,
      scale: 0.85,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // 7. Background image zooms out (scales back) and entire overlay fades/scales down
    completeTl.to(bgRef.current, {
      scale: 1.0,
      duration: 0.8,
      ease: "power2.inOut",
    }, "-=0.5");

    completeTl.to(overlayRef.current, {
      opacity: 0,
      scale: 0.95, // subtle zoom out of the whole screen overlay
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    }, "-=0.8");

    return () => {
      completeTl.kill();
    };
  }, [isVideoLoaded, isEntranceComplete, onComplete, circumference]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#faeade", // Fallback theme color
        transformOrigin: "center center",
      }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero-bg.webp')",
          transformOrigin: "center center",
        }}
      />

      {/* Warm brand color overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-[#faeade]/85 pointer-events-none" />

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
            stroke="#e3d3bc"
            strokeWidth="1.5"
          />
          {/* Progress ring */}
          <circle
            ref={ringRef}
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#084924"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            style={{
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />
        </svg>

        {/* Dot that travels around the ring */}
        <div className="relative w-[220px] h-[220px]">
          <div
            ref={dotRef}
            className="absolute w-2.5 h-2.5 rounded-full bg-[#f5a623]"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${(progress / 100) * 360 - 90}deg) translate(${radius}px)`,
              boxShadow: "0 0 10px #f5a623, 0 0 20px #f5a623aa",
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
        className="text-[#084924] text-xs tracking-[0.4em] uppercase mb-2 font-medium"
        style={{ fontFamily: "'Antonio', sans-serif" }}
      >
        Coconut Tender
      </p>

      {/* Percentage */}
      <p
        ref={progressTextRef}
        className="text-[#084924]/60 text-sm font-bold tracking-wider tabular-nums"
        style={{ fontFamily: "'Antonio', sans-serif" }}
      >
        {progress}%
      </p>
    </div>
  );
};

export default Preloader;
