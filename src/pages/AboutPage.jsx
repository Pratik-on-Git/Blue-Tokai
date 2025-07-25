import React, { useEffect } from "react";
import Footer from '../components/common/footer';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AboutSlider from '../components/common/AboutSlider';
import AboutMore from '../components/common/AboutMore';
import Testimonials from '../components/common/Testimonials';

const slides = [
  {
    slideTitle: "The story behind every cup",
    slideDescription:
      "Our journey is a tale of passion for coffee, and at the heart of it all lie our core values: transparency, traceability, and uncompromising quality. Step by step, we embark on this with the coffee producers, each one meticulously tending to the plants with care and expertise. Through the laborious yet rewarding process of harvesting, processing, and roasting, the coffee transforms, evolving into the delightful brew you savour",
    slideUrl: "/shop",
    slideTags: ["Beliefs"],
    slideImg: "https://images.unsplash.com/photo-1556742526-795a8eac090e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slideTitle: "Ease of recycling",
    slideDescription:
      "Our new packaging uses low-density polyethylene, which can be downcycled (recycled into lower-quality products) in a few simple steps. ",
    slideUrl: "/shop",
    slideTags: ["Roasteries"],
    slideImg: "https://plus.unsplash.com/premium_photo-1681122469506-ef93ed9e77dd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slideTitle: "Blue Tokai and MuscleBlaze came together",
    slideDescription:
      "Scientifically designed with Enhanced Absorption Formula (EAF®), it helps maximise the bioavailability of protein for Indian gym-goers and athletes. Each serving carries 25 grams of protein and the taste of India's most-loved coffee. A satiating mix of perfectly roasted coffee, premium chocolate, fruits, nuts, seeds, and probiotics, this is a nutritious meal with 18 grams of protein in each serving.",
    slideUrl: "/shop",
    slideTags: ["Farms"],
    slideImg: "https://bluetokaicoffee.com/cdn/shop/files/Mask_group_6_400bcbe5-7a5c-4fa4-89a4-ac112843f1fc_1370x.png?v=1710844566",
  },
  {
    slideTitle: "Partnerships",
    slideDescription:
      "At Blue Tokai Coffee Roasters, partnerships are an extension of our aim of making great quality coffee accessible and exploring endless possibilities of specialty coffee with unique form factors, new products and meaningful collaborations. Our partnerships with like-minded brands bring together our love for coffee, appreciation for culture and ideas of building unparalleled experiences for our community. ",
    slideUrl: "/shop",
    slideTags: ["Coffee"],
    slideImg: "https://bluetokaicoffee.com/cdn/shop/files/Group_94_1370x.png?v=1710843638",
  }
];

const AboutPage = () => {
  return (
    <>
      <AboutSlider slides={slides} />
      <AboutMore />
      <Testimonials />
      <Footer />
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
        height: 100vh;
        background-color: #000;
        overflow: hidden;
      }
      .slide, .slide-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
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
  </>
);
};

export default AboutPage; 