import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const AboutSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slideRef = useRef(null);

  // Animate in on mount and when current changes
  useEffect(() => {
    if (!slideRef.current) return;
    // Split text for animation
    const h1 = slideRef.current.querySelector(".slide-title h1");
    const desc = slideRef.current.querySelector(".slide-description p");
    if (h1) SplitText.create(h1, { type: "words", wordsClass: "word", mask: "words" });
    if (desc) SplitText.create(desc, { type: "lines", linesClass: "line", mask: "lines" });
    // Animate in
    gsap.set(slideRef.current, { opacity: 0, y: 80 });
    gsap.to(slideRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
    // Animate text
    if (h1) {
      gsap.fromTo(
        slideRef.current.querySelectorAll(".slide-title .word"),
        { y: "100%" },
        { y: "0%", duration: 0.7, stagger: 0.07, ease: "power2.out", delay: 0.2 }
      );
    }
    if (desc) {
      gsap.fromTo(
        slideRef.current.querySelectorAll(".slide-description .line"),
        { y: "100%" },
        { y: "0%", duration: 0.7, stagger: 0.07, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [current]);

  const handleSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    // Animate out
    if (slideRef.current) {
      gsap.to(slideRef.current, {
        opacity: 0,
        y: dir === "down" ? -80 : 80,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          setCurrent((prev) => {
            if (dir === "down") return prev === slides.length - 1 ? 0 : prev + 1;
            else return prev === 0 ? slides.length - 1 : prev - 1;
          });
          setTimeout(() => setAnimating(false), 400);
        },
      });
    }
  };

  const slide = slides[current];

  return (
    <div className="slider" style={{ position: "relative", width: "100vw", height: "100vh", background: "#000", overflow: "hidden" }}>
      <div
        className="slide"
        ref={slideRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <div className="slide-img" style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}>
          {slide.slideVideo ? (
            <video src={slide.slideVideo} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <img src={slide.slideImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>
        <div className="slide-header">
          <div className="slide-title">
            <h1>{slide.slideTitle}</h1>
          </div>
          <div className="slide-description">
            <p>{slide.slideDescription}</p>
          </div>
          <div className="slide-link">
            <a href={slide.slideUrl}>View Products</a>
          </div>
        </div>
        <div className="slide-info">
          <div className="slide-tags">
            <p>Tags</p>
            {slide.slideTags.map((tag, i) => (
              <p
                key={i}
                style={tag === "Beliefs" || tag === "Roasteries" || tag === "Farms" ? { cursor: "pointer", textDecoration: "underline" } : {}}
                onClick={
                  tag === "Beliefs"
                    ? () => {
                        const el = document.getElementById("about-beliefs-section");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    : tag === "Roasteries"
                    ? () => {
                        const el = document.getElementById("about-roasteries-section");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    : tag === "Farms"
                    ? () => {
                        const el = document.getElementById("about-farms-section");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    : undefined
                }
              >
                {tag}
              </p>
            ))}
          </div>
          <div className="slide-index-wrapper">
            <p>{(current + 1).toString().padStart(2, "0")}</p>
            <p>/</p>
            <p>{slides.length.toString().padStart(2, "0")}</p>
          </div>
        </div>
      </div>
      <button
        className="slider-arrow slider-arrow-up"
        aria-label="Previous Slide"
        onClick={() => handleSlide("up")}
        disabled={animating}
      >
        ˄
      </button>
      <button
        className="slider-arrow slider-arrow-down"
        aria-label="Next Slide"
        onClick={() => handleSlide("down")}
        disabled={animating}
      >
        ˅
      </button>
      <style>{`
        .slider-arrow {
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          font-size: 1rem;
          cursor: pointer;
          outline: none;
          position: absolute;
          z-index: 10;
          transition: background 0.18s;
        }
        @media (max-width: 900px) {
          .slider-arrow-up {
            left: 50%;
            bottom: 3rem !important;
            transform: translateX(-50%);
          }
          .slider-arrow-down {
            left: 50%;
            bottom: 1rem;
            transform: translateX(-50%);
          }
        }
        @media (min-width: 901px) {
          .slider-arrow-up {
            right: 2vw;
            top: 50%;
            left: unset;
            bottom: unset;
            transform: translateY(-120%);
          }
          .slider-arrow-down {
            right: 2vw;
            top: 50%;
            left: unset;
            bottom: unset;
            transform: translateY(20%);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutSlider; 