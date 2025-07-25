import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const aboutSections = [
  {
    title: "Beliefs",
    arrow: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: [
      "Our mission since we started has stayed simple: introduce our customers to the estates we directly buy our great tasting coffee from, roast the beans with care, and make high quality coffee more accessible through our cafes and our website. The coffee we roast is the coffee we like to drink, and we hope you like it too.",
      "At Blue Tokai Coffee Roasters, we follow a simple set of beliefs."
    ],
    blocks: [
      {
        heading: "Transparency is much more than just where we get our beans from.",
        text: "The first thing we did when we started our company was to highlight our award winning farms. This idea of transparency organically evolved to the way we worked in other areas too - our baristas are always present to discuss brewing tips, our customer service team are there to walk you through your coffee questions, and our roasting team to show you how they work."
      },
    ]
  },
  {
    title: "Roasteries",
    arrow: true,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: [
      "When we started roasting in 2013, we had a small 1kg machine that had us roasting for twelve to fourteen hours straight on most nights because of how small it was. Though we have grown, in the size of our roasting machines (we now roast on two 12kg and one 25kg Probat machines), and the team of roasters, we continue to spend as much time, energy and resources on constantly pushing our roasting quality forward."
    ],
    blocks: [
      {
        heading: null,
        text: "We are consistently researching, testing and implementing best practices throughout our business to raise the bar. Evaluating hundreds of green bean samples by cupping them every harvest season, before making our final selections is standard procedure at Blue Tokai Coffee Roasters. Conducting advanced sensory trainings for our roasters, and experimenting with processing methods at the farm level are just some of the ways that our highly skilled team is constantly evolving."
      },
    ]
  },
  {
    title: "Farms",
    arrow: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: [
      "When we first started in 2013, we worked with a handful of producers who shared our belief that India was ripe for a specialty coffee revolution. After 11 years, we're glad to have had that belief turn into a blooming industry, with more Indians enjoying homegrown specialty coffee than ever before."
    ],
    blocks: [
      {
        heading: null,
        text: "Now, we hold long-standing relationships with over 80 of India's best farms, each raising the bar for what a cup of carefully grown coffee can be. We're honoured to source from them, and bring you the coffee they grow, along with the stories of the love and care with which it comes to be."
      }
    ]
  }
];

const AboutMore = () => {
  const cardRefs = useRef([]);
  useEffect(() => {
    const cards = cardRefs.current;
    let spacing = [];
    function refreshSpacing() {
      let space = 0;
      // Only calculate for the first three cards (0, 1, 2)
      cards.slice(0, 3).forEach((card, i) => {
        if (!card) return;
        const title = card.querySelector(".about-more-modern-heading");
        spacing[i] = space += title ? title.offsetHeight : 0;
      });
      spacing.total = space;
    }
    refreshSpacing();
    ScrollTrigger.addEventListener("revert", refreshSpacing);
    // Only pin the first three cards
    cards.slice(0, 3).forEach((card, index) => {
      if (!card) return;
      ScrollTrigger.create({
        trigger: card,
        start: () => `top-=${spacing[index]} top+=10px`,
        endTrigger: cards[2], // Always end at the third card
        end: index === 2 ? "bottom bottom" : "top top",
        pin: true,
        pinSpacing: false,
        markers: false,
        id: `card-pin-${index}`,
        invalidateOnRefresh: true
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.removeEventListener("revert", refreshSpacing);
    };
  }, []);
  return (
    <section className="about-more-modern-root">
      {aboutSections.map((section, idx) => (
        <div
          className={`about-more-modern-section${idx % 2 === 1 ? ' reverse' : ''} about-more-card`}
          key={section.title}
          ref={el => cardRefs.current[idx] = el}
          id={idx === 0 ? "about-beliefs-section" : idx === 1 ? "about-roasteries-section" : idx === 2 ? "about-farms-section" : undefined}
        >
          <div className="about-more-modern-img-wrap">
            <img src={section.image} alt={section.title} className="about-more-modern-img" />
          </div>
          <div className="about-more-modern-content">
            <h2 className="about-more-modern-heading">
              {section.title}
              {section.arrow && <span className="about-more-modern-arrow">→</span>}
            </h2>
            {section.lead.map((lead, i) => (
              <p className="about-more-modern-lead" key={i}>{lead}</p>
            ))}
            {section.blocks.map((block, i) => (
              <div className="about-more-modern-block" key={i}>
                {block.heading && <h3 className="about-more-modern-subheading">{block.heading}</h3>}
                <p>{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        #root{
          overflow-x: hidden;
        }
        .about-more-modern-root, .about-more-modern-section, .about-more-card {
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        .about-more-modern-img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .about-more-modern-root {
          width: 100vw;
          background: #000;
          padding: 0 0 4vw 0;
        }
        .about-more-modern-section {
          display: flex;
              padding: 4rem 4rem;
          align-items: stretch;
          justify-content: center;
          gap: 5rem;
          margin: 0 auto 0 auto;
          background: transparent;
          overflow: hidden;
          min-height: 340px;
        }

        .about-more-modern-section.about-more-card {
          background: #000;
        }
        .about-more-modern-section.reverse {
          flex-direction: row-reverse;
        }
        .about-more-modern-img-wrap {
          flex: 1 1 50%;
          height: 50em;
          display: flex;
          align-items: stretch;
          background: #111;
        }
        .about-more-modern-content {
          flex: 2 1 50%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          color: #fff;
        }
        .about-more-modern-heading {
          font-size: 3.5rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          margin-bottom: 1.2vw;
          display: flex;
          align-items: center;
          gap: 0.5em;
          color: #FFB22C;
        }
        .about-more-modern-arrow {
          font-size: 3rem;
          font-weight: 400;
          color: #fff;
          margin-left: 0em;
          color: #FFB22C;
        }
        .about-more-modern-lead {
          font-size: 1rem;
          font-weight: 400;
          text-transform: capitalize;
          margin-bottom: 1.2vw;
          color: #f7f7f7;
          line-height: 1.6;
        }
        .about-more-modern-block {
          margin-bottom: 1.2vw;
          background: transparent;
          border-radius: 1vw;
        }
        .about-more-modern-subheading {
          font-size: 1.4rem;
          text-transform: uppercase;
          font-weight: 400;
          color: #FFB22C;
          margin-bottom: 0.5em;
          margin-top: 0;
        }

        .about-more-modern-block p {
          font-size: 1rem;
          font-weight: 400;
          text-transform: capitalize;
          margin-bottom: 1.2vw;
          color: #f7f7f7;
        }
        @media (max-width: 600px) {
          .about-more-modern-section, .about-more-modern-section.reverse {
            flex-direction: column;
            gap: 0 !important;
            padding: 32px !important;
            border-radius: 2vw;
            min-height: 0;
          }
          .about-more-modern-img-wrap {
            max-width: 100vw;
            min-height: 180px;
            max-height: 220px;
          }
          .about-more-modern-img {
            min-height: 180px;
            max-height: 220px;
          }
          .about-more-modern-content {
            padding: 2vw 5vw 2vw 5vw;
          }
          .about-more-modern-heading {
            font-size: 1.5rem !important;
          }
          .about-more-modern-lead {
            font-size: 0.7rem !important;
          }
          .about-more-modern-block p{
            display: none;
          }
          .about-more-modern-subheading{
            font-size: 0.9rem !important;
          }
        }
        
      `}</style>
    </section>
  );
};

export default AboutMore; 