import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 4;

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0); // for animation
  const [animating, setAnimating] = useState(false);
  const carouselRef = useRef(null);
  const writeupRef = useRef(null);
  const cardsRef = useRef([]);
  const touchStartX = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => Array.isArray(p.tags) && p.tags.includes('New Arrival'));
        setProducts(filtered);
      });
  }, []);

  // Calculate max start index to avoid blank space
  const maxStartIdx = Math.max(0, products.length - VISIBLE_COUNT);

  // --- SMOOTH ANIMATION LOGIC REWRITE ---
  // slideIndex is the animated index, startIdx is the logical index
  useEffect(() => {
    setSlideIndex(startIdx);
  }, [products.length]);

  // Fade in writeup
  useEffect(() => {
    if (!writeupRef.current) return;
    gsap.fromTo(
      writeupRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: writeupRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  // Fade in cards (fix: always trim refs to match products)
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, products.length);
    if (!cardsRef.current.length) return;
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.13,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 90%",
        }
      }
    );
  }, [products, slideIndex]);

  const handleSlide = (newIdx) => {
    if (animating) return;
    setAnimating(true);
    setSlideIndex(newIdx);
    setTimeout(() => {
      setStartIdx(newIdx);
      setAnimating(false);
    }, 400); // match transition duration
  };

  const handlePrev = () => {
    if (startIdx === 0 || animating) return;
    const newIdx = Math.max(0, startIdx - VISIBLE_COUNT);
    handleSlide(newIdx);
  };
  const handleNext = () => {
    if (startIdx >= maxStartIdx || animating) return;
    const newIdx = Math.min(maxStartIdx, startIdx + VISIBLE_COUNT);
    handleSlide(newIdx);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - touchStartX.current;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
    touchStartX.current = null;
  };

  // For smooth sliding, render all products in a row and translateX
  const totalWidth = 100 * products.length / VISIBLE_COUNT;
  const translateX = -(slideIndex * (100 / products.length));

  return (
    <div style={{background:'#f7f7f7',color:'#000',padding:'0',minHeight:'80vh',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <div className="new-arrivals-section"style={{display:'flex',flexDirection:'row',alignItems:'flex-start',gap:'2vw',width:'100%',padding:'0em 0em 0em 3em'}}>
        <div style={{minWidth:'320px',maxWidth:'340px',paddingTop:'0.5vw'}}>
          <div ref={writeupRef} style={{fontSize:'3vw',fontWeight:600,lineHeight:'1.1',marginBottom:'0.5vw'}}>
            <span className="new-arrivals-writeup"style={{display:'block'}}>/ NEW</span>
            <span className="new-arrivals-writeup"style={{display:'block'}}>ARRIVALS</span>
          </div>
          <div className="new-arrivals-btn" style={{fontSize:'1.1vw',opacity:0.7,marginBottom:'2vw',marginLeft:'0.2vw'}}>({products.length})</div>
          <div className="new-arrivals-btn" style={{display:'flex',gap:'1vw',marginBottom:'2vw'}}>
            <button className="new-arrivals-btn new-arrivals-btn-left" onClick={handlePrev} disabled={startIdx === 0 || animating} style={{background:'none',border:'1px solid #000',borderRadius:'50%',width:'2.5vw',height:'2.5vw',color:'#000',fontSize:'1.2vw',display:'flex',alignItems:'center',justifyContent:'center',cursor: startIdx === 0 || animating ? 'not-allowed' : 'pointer',opacity: startIdx === 0 || animating ? 0.4 : 1,transition:'background 0.2s'}}>&lt;</button>
            <button className="new-arrivals-btn new-arrivals-btn-right" onClick={handleNext} disabled={startIdx >= maxStartIdx || animating} style={{background:'none',border:'1px solid #000',borderRadius:'50%',width:'2.5vw',height:'2.5vw',color:'#000',fontSize:'1.2vw',display:'flex',alignItems:'center',justifyContent:'center',cursor: startIdx >= maxStartIdx || animating ? 'not-allowed' : 'pointer',opacity: startIdx >= maxStartIdx || animating ? 0.4 : 1,transition:'background 0.2s'}}>&gt;</button>
          </div>
        </div>
        <div 
          ref={carouselRef}
          className="new-arrivals-carousel"
          style={{
            overflow:'hidden',
            flex:'1',
            position:'relative',
            minHeight:'220px',
            maxWidth:'100%',
            touchAction:'pan-y',
            display:'flex',
            alignItems:'stretch'
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          <div
            className="new-arrivals-carousel-inner"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: window.innerWidth <= 600 ? '0.8em' : '2vw',
              width: `${totalWidth}%`,
              transform: `translateX(${translateX}%)`,
              transition: animating ? 'transform 0.4s cubic-bezier(0.77,0,0.18,1)' : 'transform 0s',
            }}
          >
            {products.map((product, i) => {
              const isMobile = window.innerWidth <= 600;
              return (
                <div
                  key={i}
                  ref={el => cardsRef.current[i] = el}
                  className="new-arrivals-card"
                  style={{
                    background: '#f7f7f7',
                    borderRadius: isMobile ? '10px' : '0.5vw',
                    overflow: 'hidden',
                    width: isMobile ? '95vw' : `${100 / products.length}%`,
                    minWidth: isMobile ? '90vw' : '220px',
                    maxWidth: isMobile ? '98vw' : '340px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    marginRight: isMobile ? '0.5em' : '2vw',
                    boxShadow: isMobile ? '0 2px 12px rgba(0,0,0,0.08)' : undefined
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: isMobile ? '38vw' : '18vw',
                      minHeight: isMobile ? '120px' : '180px',
                      maxHeight: isMobile ? '210px' : undefined,
                      objectFit: 'cover',
                      borderRadius: isMobile ? '8px 8px 0 0' : undefined
                    }}
                  />
                  <div className="new-arrivals-card-title" style={{padding: isMobile ? '0.6em 1em 0.2em 1em' : '1vw 1vw 0.5vw 1vw', fontSize: isMobile ? '1.1rem' : '1.1vw', fontWeight: 600}}>{product.title}</div>
                  <div className="new-arrivals-card-desc" style={{padding: isMobile ? '0 1em 0.4em 1em' : '0 1vw 0.5vw 1vw', fontSize: isMobile ? '0.98rem' : '0.95vw', opacity: 0.85}}>{product.description}</div>
                  <div className="new-arrivals-card-footer" style={{display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? '0.2em' : '1vw', padding: isMobile ? '0 1em 0.4em 1em' : '0 1vw 0.5vw 1vw', flexDirection: isMobile ? 'column' : 'row'}}>
                    <div style={{fontSize: isMobile ? '1rem' : '1vw', fontWeight: 500}}>${product.price}</div>
                    <div style={{fontSize: isMobile ? '0.95rem' : '0.95vw', color: '#ffd700', fontWeight: 500}}>&#9733; {product.rating}</div>
                  </div>
                  <button
                    style={{fontSize: isMobile ? '1rem' : undefined, padding: isMobile ? '0.7em 1.4em' : '0.5em 1.2em', margin: isMobile ? '0.7em 1em 1em 1em' : '0 1vw 1vw 1vw', borderRadius: isMobile ? '6px' : '4px', background: '#000', color: '#f7f7f7', border: 'none', fontWeight: 600, cursor: 'pointer'}}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >VIEW PRODUCT</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',marginTop:'4vw',marginLeft:'25rem'}}>
        <a href="/shop" style={{color:'#000',fontSize:'1vw',textDecoration:'none',borderBottom:'1.5px solid #f7f7f7',paddingBottom:'0.2vw',letterSpacing:'0.05em',fontWeight:500,opacity:0.85}}>VIEW ALL PRODUCTS</a>
        <div style={{flex:'1',height:'1px',background:'#333',marginLeft:'2vw',marginRight:'2vw'}}></div>
      </div>
    </div>
  );
};

export default NewArrivals; 