import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            Pure Goodness Inside: <br />
            Explore the Key Benefits of Choosing Zestra
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"100% Natural"}
              color={"#faeade"}
              bg={"#f5a623"}
              className={"first-title"}
              borderColor={"#053319"}
            />
            <ClipPathTitle
              title={"Rich in Electrolytes"}
              color={"#084924"}
              bg={"#faeade"}
              className={"second-title"}
              borderColor={"#053319"}
            />
            <ClipPathTitle
              title={"Zero Preservatives"}
              color={"#faeade"}
              bg={"#084924"}
              className={"third-title"}
              borderColor={"#053319"}
            />
            <ClipPathTitle
              title={"Recyclable Tin Can"}
              color={"#faeade"}
              bg={"#40a036"}
              className={"fourth-title"}
              borderColor={"#053319"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>And so much more in every can ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
