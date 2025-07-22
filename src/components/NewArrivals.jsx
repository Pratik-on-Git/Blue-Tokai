import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VISIBLE_COUNT = 4;

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0); // for animation
  const [animating, setAnimating] = useState(false);
  const carouselRef = useRef(null);
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
    <div style={{background:'#fff',color:'#000',padding:'0',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start',gap:'2vw',width:'100%',padding:'0em 0em 0em 3em'}}>
        <div style={{minWidth:'320px',maxWidth:'340px',paddingTop:'0.5vw'}}>
          <div style={{fontSize:'3vw',fontWeight:600,lineHeight:'1.1',marginBottom:'0.5vw'}}>
            <span style={{display:'block'}}>/ NEW</span>
            <span style={{display:'block'}}>ARRIVALS</span>
          </div>
          <div style={{fontSize:'1.1vw',opacity:0.7,marginBottom:'2vw',marginLeft:'0.2vw'}}>({products.length})</div>
          <div style={{display:'flex',gap:'1vw',marginBottom:'2vw'}}>
            <button onClick={handlePrev} disabled={startIdx === 0 || animating} style={{background:'none',border:'1px solid #000',borderRadius:'50%',width:'2.5vw',height:'2.5vw',color:'#000',fontSize:'1.2vw',display:'flex',alignItems:'center',justifyContent:'center',cursor: startIdx === 0 || animating ? 'not-allowed' : 'pointer',opacity: startIdx === 0 || animating ? 0.4 : 1,transition:'background 0.2s'}}>&lt;</button>
            <button onClick={handleNext} disabled={startIdx >= maxStartIdx || animating} style={{background:'none',border:'1px solid #000',borderRadius:'50%',width:'2.5vw',height:'2.5vw',color:'#000',fontSize:'1.2vw',display:'flex',alignItems:'center',justifyContent:'center',cursor: startIdx >= maxStartIdx || animating ? 'not-allowed' : 'pointer',opacity: startIdx >= maxStartIdx || animating ? 0.4 : 1,transition:'background 0.2s'}}>&gt;</button>
          </div>
        </div>
        <div 
          ref={carouselRef}
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
            style={{
              display:'flex',
              flexDirection:'row',
              gap: '2vw',
              width: `${totalWidth}%`,
              transform: `translateX(${translateX}%)`,
              transition: animating ? 'transform 0.4s cubic-bezier(0.77,0,0.18,1)' : 'transform 0s',
            }}
          >
            {products.map((product, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'0.5vw',overflow:'hidden',width:`${100/products.length}%`,minWidth:'220px',maxWidth:'340px',display:'flex',flexDirection:'column',justifyContent:'flex-end',marginRight:'2vw'}}>
                <img src={product.images[0]} alt={product.title} style={{width:'100%',height:'18vw',objectFit:'cover',minHeight:'180px'}} />
                <div style={{padding:'1vw 1vw 0.5vw 1vw',fontSize:'1.1vw',fontWeight:600}}>{product.title}</div>
                <div style={{padding:'0 1vw 0.5vw 1vw',fontSize:'0.95vw',opacity:0.85}}>{product.description}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1vw',padding:'0 1vw 0.5vw 1vw'}}>
                  <div style={{fontSize:'1vw',fontWeight:500}}>${product.price}</div>
                  <div style={{fontSize:'0.95vw',color:'#ffd700',fontWeight:500}}>&#9733; {product.rating}</div>
                </div>
                <button 
                  style={{margin:'0 1vw 1vw 1vw',padding:'0.5em 1.2em',background:'#000',color:'#FFF',border:'none',borderRadius:'4px',fontWeight:600,cursor:'pointer'}}
                  onClick={() => navigate(`/product/${product.id}`)}
                >VIEW PRODUCT</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',marginTop:'2vw',marginLeft:'25rem'}}>
        <a href="/shop" style={{color:'#000',fontSize:'1vw',textDecoration:'none',borderBottom:'1.5px solid #fff',paddingBottom:'0.2vw',letterSpacing:'0.05em',fontWeight:500,opacity:0.85}}>VIEW ALL PRODUCTS</a>
        <div style={{flex:'1',height:'1px',background:'#333',marginLeft:'2vw',marginRight:'2vw'}}></div>
      </div>
    </div>
  );
};

export default NewArrivals; 