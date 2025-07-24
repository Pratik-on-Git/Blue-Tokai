import React, { useEffect } from "react";
import Footer from '../components/common/footer';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AboutSlider from '../components/common/AboutSlider';
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
  return (
    <>
      <AboutSlider slides={slides} />
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