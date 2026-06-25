import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    // Horizontal Scroll
    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    // Title Animation
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );

    // Floating Animation
    gsap.utils.toArray(".elements-wrapper").forEach((wrapper, index) => {
      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: {
          ease: "sine.inOut",
        },
      })
        .to(wrapper, {
          y: -12,
          x: 8,
          rotation: 2,
          duration: 2.5 + index * 0.2,
        })
        .to(wrapper, {
          y: 10,
          x: -8,
          rotation: -2,
          duration: 2.5 + index * 0.2,
        });
    });

    // Mouse Parallax Effect
    const cards = gsap.utils.toArray(".flavor-card");
    const cleanups = [];

    cards.forEach((card) => {
      const elementsImg = card.querySelector(".elements");

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = ((x - centerX) / centerX) * 15;
        const moveY = ((y - centerY) / centerY) * 15;

        gsap.to(elementsImg, {
          x: moveX,
          y: moveY,
          rotationY: moveX * 0.5,
          rotationX: -moveY * 0.5,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(elementsImg, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [isTablet]);

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`flavor-card relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt=""
              className="absolute bottom-0"
            />

            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <div className="elements-wrapper absolute inset-0">
              <img
                src={`/images/${flavor.color}-elements.webp`}
                alt=""
                className="elements pointer-events-none"
              />
            </div>

            <h1>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;