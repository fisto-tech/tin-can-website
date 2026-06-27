import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../constants";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const NutrientItem = ({ label, amount, index, total }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const valueRef = useRef({ val: 0 });

  const match = amount.match(/^([\d.]+)([a-zA-Z%]*)$/);
  const targetVal = match ? parseFloat(match[1]) : 0;
  const unit = match ? match[2] : "";

  useEffect(() => {
    const obj = valueRef.current;
    
    // Animate once when scrolled into view
    const anim = gsap.to(obj, {
      val: targetVal,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".nutrition-box",
        start: "top 85%",
      },
      onUpdate: () => {
        const currentVal = targetVal % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1);
        setDisplayValue(`${currentVal}${unit}`);
      }
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [targetVal, unit]);

  return (
    <div className="relative flex-1 col-center">
      <div>
        <p className="md:text-lg font-paragraph">{label}</p>
        <p className="font-paragraph text-sm mt-2">up to</p>
        <p className="text-2xl md:text-4xl tracking-tighter font-bold min-w-[75px] tabular-nums">
          {displayValue}
        </p>
      </div>

      {index !== total - 1 && (
        <div className="spacer-border" />
      )}
    </div>
  );
};

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    "Coconut Tender",
    "100% Natural",
    "Pure Hydration",
    "Electrolytes",
    "Fresh Energy"
  ];

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  // Looping text slide cycle
  useEffect(() => {
    const timer = setInterval(() => {
      gsap.to(".nutrition-text-inner", {
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
  }, []);

  // Slide-in animation for new word
  useEffect(() => {
    gsap.fromTo(".nutrition-text-inner", 
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [currentWordIndex]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top center",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
      },
    });

    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
    });

    // Parallax entrance animation for big background composite image
    gsap.fromTo(".big-img", {
      scale: 0.85,
      yPercent: 15,
      opacity: 0,
    }, {
      scale: 1,
      yPercent: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
      },
    });

    // Slide up fade in animation for nutrition details box
    gsap.fromTo(".nutrition-box", {
      yPercent: 60,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      ease: "back.out(1.2)",
      duration: 1.2,
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 65%",
      },
    });
  });

  return (
    <section id="nutrition" className="nutrition-section">
      <img
        src="/images/slider-dip.png"
        alt=""
        className="w-full object-cover"
      />

      <img src="/images/big-img.webp" alt="" className="big-img" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">Nature's own</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3 overflow-hidden">
                <h2 className="text-white nutrition-text-inner inline-block w-full">
                  {words[currentWordIndex]}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Zestra Coconut Tender is packed with nature's own electrolytes,
              vitamins and minerals — hydrating you from the inside out, the natural way.
            </p>
          </div>
        </div>

        <div className="nutrition-box">
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <NutrientItem
                key={index}
                label={nutrient.label}
                amount={nutrient.amount}
                index={index}
                total={lists.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
