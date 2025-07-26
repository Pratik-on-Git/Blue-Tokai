import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const testimonials = [
  { name: "Alice", text: "Absolutely love the coffee and the vibe!", title: "Coffee Lover" },
  { name: "Bob", text: "The best espresso machine I've ever owned.", title: "Home Barista" },
  { name: "Charlie", text: "Customer service is top notch.", title: "Cafe Owner" },
  { name: "Diana", text: "My mornings are incomplete without Blue Tokai.", title: "Designer" },
  { name: "Eve", text: "Great selection of beans and equipment!", title: "Coffee Blogger" },
  { name: "Frank", text: "Fast delivery and amazing quality.", title: "Coffee Enthusiast" }
];

const CARD_WIDTH = 340;
const GAP = 32;

const getVisibleIndices = (center, length) => {
  // Returns [left, center, right] indices, wrapping around
  const left = (center - 1 + length) % length;
  const right = (center + 1) % length;
  return [left, center, right];
};

const Testimonials = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const cardRefs = useRef([]);
  const timelineRef = useRef();

  // Animate cards to their positions
  const animateCards = (center) => {
    const indices = getVisibleIndices(center, testimonials.length);
    testimonials.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;
      let x = 0, scale = 0.7, z = 1, opacity = 0, pointerEvents = 'none';
      if (i === indices[1]) {
        // Center
        x = 0;
        scale = 1.08;
        z = 3;
        opacity = 1;
        pointerEvents = 'auto';
      } else if (i === indices[0]) {
        // Left
        x = -1 * (CARD_WIDTH + GAP) * 0.85;
        scale = 0.82;
        z = 2;
        opacity = 1;
      } else if (i === indices[2]) {
        // Right
        x = (CARD_WIDTH + GAP) * 0.85;
        scale = 0.82;
        z = 2;
        opacity = 1;
      }
      gsap.to(card, {
        x,
        scale,
        zIndex: z,
        opacity,
        pointerEvents,
        duration: 0.7,
        ease: "power2.inOut"
      });
    });
  };

  // Timeline-based infinite loop
  useEffect(() => {
    animateCards(centerIdx);
    if (timelineRef.current) timelineRef.current.kill();
    const tl = gsap.timeline({ repeat: -1 });
    for (let i = 0; i < testimonials.length; i++) {
      tl.to({}, { duration: 2 }); // Wait 2 seconds
      tl.call(() => {
        setCenterIdx((prev) => (prev + 1) % testimonials.length);
      });
    }
    timelineRef.current = tl;
    return () => tl.kill();
  }, [centerIdx]);

  // Animate on mount and when centerIdx changes
  useEffect(() => {
    animateCards(centerIdx);
  }, [centerIdx]);

  return (
    <section className="testimonials-timeline-section">
      <h2 className="testimonials-timeline-title">What Our Customers Say</h2>
      <div className="testimonials-timeline-cards">
        {testimonials.map((t, i) => (
          <div
            className="testimonials-timeline-card"
            key={i}
            ref={el => cardRefs.current[i] = el}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          >
            <div className="testimonials-timeline-text">“{t.text}”</div>
            <div className="testimonials-timeline-name">{t.name}</div>
            <div className="testimonials-timeline-role">{t.title}</div>
          </div>
        ))}
      </div>
      <div className="testimonials-timeline-indicators">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={"timeline-dot" + (i === centerIdx ? " active" : "")}
            onClick={() => setCenterIdx(i)}
          />
        ))}
      </div>
      <style>{`
        .testimonials-timeline-section {
          position: relative;
          width: 100vw;
          background: transparent;
          padding: 0vw 0 17vw 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 25vh;
        }
        .testimonials-timeline-title {
          color: #FFB22C;
          font-size: clamp(1.5rem, 4vw, 2.7rem);
          font-weight: 600;
          padding-bottom: 3vh;
          text-align: center;
          z-index: 10;
        }
        .testimonials-timeline-cards {
          position: relative;
          width: 100vw;
          max-width: 600px;
          height: 260px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonials-timeline-card {
          background: #222;
          color: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
          padding: 2.5vw 3vw 2.5vw 3vw;
          min-width: 320px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          pointer-events: none;
        }
        .testimonials-timeline-text {
          font-size: 1.15rem;
          font-weight: 500;
          color: #fff;
          margin-bottom: 1.5vw;
          line-height: 1.6;
        }
        .testimonials-timeline-name {
          font-size: 1.08rem;
          font-weight: 700;
          color: #FFB22C;
          margin-bottom: 0.2vw;
        }
        .testimonials-timeline-role {
          font-size: 0.98rem;
          color: #bbb;
        }
        .testimonials-timeline-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2vw;
          gap: 0.7em;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #bbb;
          display: inline-block;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .timeline-dot.active {
          background: #FFB22C;
          transform: scale(1.2);
        }
        @media (max-width: 600px) {
          .testimonials-timeline-section {
            top: -3vh;
            background: black;
          }
          .testimonials-timeline-card {
            min-width: 62vw;
            max-width: 70vw;
            padding: 6vw 3vw 6vw 3vw;
          }
          .testimonials-timeline-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials; 