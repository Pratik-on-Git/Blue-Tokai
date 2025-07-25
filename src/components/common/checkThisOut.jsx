import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

const PRODUCT_JSON_PATH = "/products.json";

const CheckTheseOut = () => {
  const [products, setProducts] = useState([]);
  const cardsRef = useRef([]);
  const headingRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(PRODUCT_JSON_PATH)
      .then(res => res.json())
      .then(data => {
        // Pick 5 random products
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 5));
      });
  }, [location.key]); // re-run when route changes

  useEffect(() => {
    if (!products.length) return;
    // Animate heading (split, pop, stagger, scroll-triggered)
    if (headingRef.current) {
      const splitHeading = new SplitType(headingRef.current, { types: 'words, chars' });
      gsap.from(splitHeading.chars, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 32,
        scale: 0.7,
        rotate: 8,
        stagger: 0.025,
        duration: 0.7,
        ease: 'back.out(1.7)',
      });
    }
    // Animate each card (image, title, desc, price, rating, button)
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const img = card.querySelector('img');
      const title = card.querySelector('div:nth-child(2)');
      const desc = card.querySelector('div:nth-child(3)');
      const price = card.querySelector('div:nth-child(4) > div:nth-child(1)');
      const rating = card.querySelector('div:nth-child(4) > div:nth-child(2)');
      const button = card.querySelector('button');
      // Card container pop-in
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        scale: 0.85,
        rotate: i % 2 === 0 ? 4 : -4,
        duration: 0.7,
        ease: 'back.out(1.7)',
        delay: 0.08 * i
      });
      // Image micro scale/fade
      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.12 * i
        });
      }
      // Title split pop
      if (title) {
        const splitTitle = new SplitType(title, { types: 'words, chars' });
        gsap.from(splitTitle.chars, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 18,
          scale: 0.8,
          rotate: 8,
          stagger: 0.03,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.18 * i
        });
      }
      // Description fade/slide
      if (desc) {
        gsap.from(desc, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 24,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.22 * i
        });
      }
      // Price pop
      if (price) {
        gsap.from(price, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.7,
          y: 10,
          duration: 0.4,
          ease: 'back.out(2)',
          delay: 0.26 * i
        });
      }
      // Rating fade/slide
      if (rating) {
        gsap.from(rating, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: 18,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.3 * i
        });
      }
      // Button pop/scale
      if (button) {
        gsap.from(button, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.7,
          y: 18,
          duration: 0.4,
          ease: 'back.out(2)',
          delay: 0.34 * i
        });
      }
    });
    // Cleanup on unmount
    return () => {
      if (headingRef.current) SplitType.revert(headingRef.current);
      cardsRef.current.forEach(card => {
        if (!card) return;
        const title = card.querySelector('div:nth-child(2)');
        if (title) SplitType.revert(title);
      });
      gsap.killTweensOf('*');
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [products]);

  return (
    <div style={{ background:"transparent", color: '#ffb22c', padding: '0', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '4vw', marginBottom: '4vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vw', width: '100%', padding: '0em 0em 0em 3em' }}>
        <div style={{ minWidth: '320px', maxWidth: '340px', paddingTop: '0.5vw' }}>
          <div ref={headingRef} style={{ textTransform: 'uppercase', fontSize: '2vw', fontWeight: 700, lineHeight: '1.1', marginBottom: '0.5vw' }}>Check these out</div>
        </div>
        <div
          style={{
            overflow: 'hidden',
            flex: '1',
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1vw',
              width: '100%',
            }}
          >
            {products.map((product, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                style={{
                  background: 'transparent',
                  borderRadius: '0.5vw',
                  overflow: 'hidden',
                  height: '65vh',
                  width: '25vw',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  marginRight: '2vw',
                }}
              >
                <img src={product.images && product.images[0]} alt={product.title} style={{ width: '100%', objectFit: 'cover', height: '100%'}} />
                <div style={{ padding: '1vw 1vw 0.5vw 1vw', fontSize: '1.1vw', fontWeight: 600 }}>{product.title}</div>
                <div style={{ padding: '0 1vw 0.5vw 1vw', fontSize: '0.95vw', opacity: 0.85 }}>{product.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1vw', padding: '0 1vw 0.5vw 1vw' }}>
                  <div style={{ fontSize: '1vw', fontWeight: 500 }}>₹{product.price}</div>
                  <div style={{ fontSize: '0.95vw', color: '#ffd700', fontWeight: 500 }}>&#9733; {product.rating}</div>
                </div>
                <button
                  style={{ margin: '0 1vw 1vw 1vw', padding: '0.8em 1em', background: '#ffb22c', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >VIEW PRODUCT</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTheseOut; 