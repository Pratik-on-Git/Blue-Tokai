import React, { useEffect } from "react";
import Footer from '../components/common/footer';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AboutPageAnimations from '../components/common/AboutPageAnimations';
import AboutMore from '../components/common/AboutMore';

const slides = [
  {
    slideTitle: "The story behind every cup",
    slideDescription:
      "Our journey is a tale of passion for coffee, and at the heart of it all lie our core values: transparency, traceability, and uncompromising quality. Step by step, we embark on this with the coffee producers, each one meticulously tending to the plants with care and expertise. Through the laborious yet rewarding process of harvesting, processing, and roasting, the coffee transforms, evolving into the delightful brew you savour",
    slideUrl: "/shop",
    slideTags: ["Beliefs", "Roasteries", "Farms", "Coffee"],
    slideImg: "https://images.unsplash.com/photo-1556742526-795a8eac090e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slideTitle: "The story behind every cup",
    slideDescription:
      "Our mission since we started has stayed simple: introduce our customers to the estates we directly buy our great tasting coffee from, roast the beans with care, and make high quality coffee more accessible through our cafes and our website. The coffee we roast is the coffee we like to drink, and we hope you like it too. ",
    slideUrl: "/shop",
    slideTags: ["Cyberpunk", "Experimental", "3D Layers", "Concept Design"],
    slideImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slideTitle: "The story behind every cup",
    slideDescription:
      "Our mission since we started has stayed simple: introduce our customers to the estates we directly buy our great tasting coffee from, roast the beans with care, and make high quality coffee more accessible through our cafes and our website. The coffee we roast is the coffee we like to drink, and we hope you like it too. ",
    slideUrl: "/shop",
    slideTags: ["Surreal", "Lightplay", "Immersive", "Visual Narrative"],
    slideImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slideTitle: "The story behind every cup",
    slideDescription:
      "Our mission since we started has stayed simple: introduce our customers to the estates we directly buy our great tasting coffee from, roast the beans with care, and make high quality coffee more accessible through our cafes and our website. The coffee we roast is the coffee we like to drink, and we hope you like it too. ",
    slideUrl: "/shop",
    slideTags: ["Surreal", "Lightplay", "Immersive", "Visual Narrative"],
    slideImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];

const AboutPage = () => {
  useEffect(() => {
    const totalSlides = slides.length;
    let currentSlide = 1;
    let isAnimating = false;
    let scrollAllowed = true;
    let lastScrollTime = 0;

    function createSlide(slideIndex) {
      const slideData = slides[slideIndex - 1];
      const slide = document.createElement("div");
      slide.className = "slide";
      const slideImg = document.createElement("div");
      slideImg.className = "slide-img";
      const img = document.createElement("img");
      img.src = slideData.slideImg;
      img.alt = "";
      slideImg.appendChild(img);

      const slideHeader = document.createElement("div");
      slideHeader.className = "slide-header";
      const slideTitle = document.createElement("div");
      slideTitle.className = "slide-title";
      const h1 = document.createElement("h1");
      h1.textContent = slideData.slideTitle;
      slideTitle.appendChild(h1);

      const slideDescription = document.createElement("div");
      slideDescription.className = "slide-description";
      const p = document.createElement("p");
      p.textContent = slideData.slideDescription;
      slideDescription.appendChild(p);
      const slideLink = document.createElement("div");
      slideLink.className = "slide-link";
      const a = document.createElement("a");
      a.href = slideData.slideUrl;
      a.textContent = "View Products";
      slideLink.appendChild(a);

      slideHeader.appendChild(slideTitle);
      slideHeader.appendChild(slideDescription);
      slideHeader.appendChild(slideLink);
      const slideInfo = document.createElement("div");
      slideInfo.className = "slide-info";
      const slideTags = document.createElement("div");
      slideTags.className = "slide-tags";
      const tagsLabel = document.createElement("p");
      tagsLabel.textContent = "Tags";
      slideTags.appendChild(tagsLabel);

      slideData.slideTags.forEach((tag) => {
        const tagP = document.createElement("p");
        tagP.textContent = tag;
        slideTags.appendChild(tagP);
      });
      const slideIndexWrapper = document.createElement("div");
      slideIndexWrapper.className = "slide-index-wrapper";
      const slideIndexCopy = document.createElement("p");
      slideIndexCopy.textContent = slideIndex.toString().padStart(2, "0");
      const slideIndexSeparator = document.createElement("p");
      slideIndexSeparator.textContent = "/";
      const slidesTotalCount = document.createElement("p");
      slidesTotalCount.textContent = totalSlides.toString().padStart(2, "0");

      slideIndexWrapper.appendChild(slideIndexCopy);
      slideIndexWrapper.appendChild(slideIndexSeparator);
      slideIndexWrapper.appendChild(slidesTotalCount);

      slideInfo.appendChild(slideTags);
      slideInfo.appendChild(slideIndexWrapper);

      slide.appendChild(slideImg);
      slide.appendChild(slideHeader);
      slide.appendChild(slideInfo);
      return slide;
    }

    function splitText(slide) {
      const slideHeader = slide.querySelector(".slide-title h1");
      if (slideHeader) {
        SplitText.create(slideHeader, {
          type: "words",
          wordsClass: "word",
          mask: "words",
        });
      }
      const slideContent = slide.querySelectorAll("p, a");
      slideContent.forEach((element) => {
        SplitText.create(element, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
          reduceWhiteSpace: false,
        });
      });
    }

    function animateSlide(direction) {
      if (isAnimating || !scrollAllowed) return;
      isAnimating = true;
      scrollAllowed = false;
      const slider = document.querySelector(".slider");
      const currentSlideElement = slider.querySelector(".slide");
      if (direction === "down") {
        currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
      } else {
        currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
      }
      const exitY = direction === "down" ? "-200vh" : "200vh";
      const entryY = direction === "down" ? "100vh" : "-100vh";
      const entryClipPath =
        direction === "down"
          ? "polygon(20% 20%, 80% 20%, 80% 100%, 20% 100%)"
          : "polygon(20% 0%, 80% 0%, 80% 80%, 20% 80%)";
      gsap.to(currentSlideElement, {
        scale: 0.25,
        opacity: 0,
        rotation: 30,
        y: exitY,
        duration: 2,
        ease: "power4.inOut",
        force3d: true,
        onComplete: () => {
          currentSlideElement.remove();
        }
      });
      setTimeout(() => {
        const newSlide = createSlide(currentSlide);
        gsap.set(newSlide, {
          y: entryY,
          clipPath: entryClipPath,
          force3d: true,
        });
        slider.appendChild(newSlide);
        splitText(newSlide);
        const words = newSlide.querySelectorAll(".word");
        const lines = newSlide.querySelectorAll(".line");
        gsap.set([...words, ...lines], {
          y: "100%",
          force3d: true,
        });
        gsap.to(newSlide, {
          y: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.out",
          force3d: true,
          onStart: () => {
            const tl = gsap.timeline();
            const headerWords = newSlide.querySelectorAll(".slide-title .word");
            tl.to(headerWords, {
              y: "0%",
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
              force3d: true,
            }, 0.75);
            const tagsLines = newSlide.querySelectorAll(".slide-tags .line");
            const indexLines = newSlide.querySelectorAll(".slide-index-wrapper .line");
            const descriptionLines = newSlide.querySelectorAll(".slide-description .line");
            tl.to(
              tagsLines,
              {
                y: "0%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
              },
              "-=0.75"
            );
            tl.to(
              indexLines,
              {
                y: "0%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
              },
              "<"
            );
            tl.to(
              descriptionLines,
              {
                y: "0%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
              },
              "<"
            );
            const linkLines = newSlide.querySelectorAll(".slide-link .line");
            tl.to(
              linkLines,
              {
                y: "0%",
                duration: 1,
                ease: "power4.out",
              },
              "-=1"
            );
          },
          onComplete: () => {
            isAnimating = false;
            setTimeout(() => {
              scrollAllowed = true;
              lastScrollTime = Date.now();
            }, 100);
          },
        });
      }, 750);
    }

    function handleScroll(direction) {
      const now = Date.now();
      if (isAnimating || !scrollAllowed) return;
      if (now - lastScrollTime < 1000) return;
      lastScrollTime = now;
      animateSlide(direction);
    }

    window.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? "down" : "up";
        handleScroll(direction);
      },
      {
        passive: false,
      }
    );

    let touchStartY = 0;
    let isTouchActive = false;

    window.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    }, { passive: false });
    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        if (!isTouchActive || isAnimating || !scrollAllowed) return;
        const touchCurrentY = e.touches[0].clientY;
        const difference = touchStartY - touchCurrentY;
        if (Math.abs(difference) > 50) {
          isTouchActive = false;
          const direction = difference > 0 ? "down" : "up";
          handleScroll(direction);
        }
      },
      { passive: false }
    );
    window.addEventListener("touchend", () => {
      isTouchActive = false;
    });

    // Initial render
    const slider = document.querySelector(".slider");
    if (slider) {
      slider.innerHTML = "";
      const firstSlide = createSlide(currentSlide);
      slider.appendChild(firstSlide);
      splitText(firstSlide);
    }

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchmove", () => {});
      window.removeEventListener("touchend", () => {});
    };
  }, []);

  return (
    <>
      {/* Slider Section */}
      <div className="slider">
        {/* Slides will be rendered dynamically by JS */}
        <button className="slider-arrow slider-arrow-up" aria-label="Previous Slide">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 15 12 9 18 15"/>
          </svg>
        </button>
        <button className="slider-arrow slider-arrow-down" aria-label="Next Slide">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>
      <AboutPageAnimations />
      <AboutMore />
      <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "DM Sans", sans-serif;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      h1,
      p,
      a {
        text-transform: uppercase;
        color: #fff;
      }
      h1 {
        font-size: 5rem;
        font-weight: 600;
        letter-spacing: -0.1rem;
      }
      p,
      a {
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: -0.01rem;
      }
      .slider {
        position: relative;
        width: 100vw;
        height: 92vh;
        background-color: #000;
        overflow: hidden;
      }
      .slide, .slide-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 92vh;
      }
      .slide {
        will-change: transform;
      }
      .slide-header {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translate(-50%, 0);
        width: 75%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 1;
      }
      .slide-description {
        width: 60%;
        text-align: center;
        margin-bottom: 1rem;
      }
      .slide-info {
        position: absolute;
        left: 0;
        bottom: 2rem;
        width: 100vw;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .slide-tags {
        display: flex;
        flex-direction: column;
      }
      .slide-index-wrapper {
        display: flex;
      }
      
      .slide-index-wrapper p {
        text-align: center;
        width: 2rem;
      }
      
      .slide-tags p:first-child {
        margin-bottom: 1em;
      }
      .line, .word {
        position: relative;
        display: inline-block;
        will-change: transform;
      }
      .slider-arrow {
        position: absolute;
        right: 2.5vw;
        z-index: 10;
        background: rgba(0,0,0,0.45);
        border: none;
        border-radius: 50%;
        padding: 0.5em;
        cursor: pointer;
        transition: background 0.18s;
      }
      .slider-arrow-up {
        bottom: 6.5vw;
      }
      .slider-arrow-down {
        bottom: 2vw;
      }
      .slider-arrow:hover {
        background: rgba(255,255,255,0.18);
      }
      @media (max-width: 1000px) {
        h1 {
          font-size: 2rem;
          letter-spacing: 0;
        }
        p {
          font-size: 0.8rem;
        }
        .slide-header {
          top: 50%;
          bottom: unset;
          transform: translate(-50%, -50%);
          width: 90%;
        }

        .slide-description {
          width: 100%;
        }
      }
    `}</style>
    {/* Footer Section */}
    <Footer />
  </>
);
};

export default AboutPage; 