import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PRODUCT_JSON_PATH = "/products.json";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

const CheckTheseOut = () => {
  const [products, setProducts] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const cardsRef = useRef([]);
  const cardsContainerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to card when dot is clicked
  const scrollToCard = idx => {
    if (!cardsContainerRef.current || !cardsRef.current[idx]) return;
    const card = cardsRef.current[idx];
    const container = cardsContainerRef.current;
    const cardLeft = card.offsetLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    container.scrollTo({
      left: cardLeft - (containerWidth - cardWidth) / 2,
      behavior: 'smooth',
    });
  };

  // Update active dot on scroll
  const handleScroll = () => {
    if (!cardsContainerRef.current || products.length === 0) return;
    const container = cardsContainerRef.current;
    let minDist = Infinity;
    let idx = 0;
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        idx = i;
      }
    });
    setActiveIdx(idx);
  };

  useEffect(() => {
    fetch(PRODUCT_JSON_PATH)
      .then(res => res.json())
      .then(data => {
        // Pick 5 random products
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 5));
      });
  }, [location.key]); // re-run when route changes

  const windowWidth = useWindowWidth();
  if (windowWidth <= 600) {
    // MOBILE: Show new carousel/dots version
    return (
      <>
        <div style={{ background:"transparent", color: '#ffb22c', padding: '0', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '4vw', marginBottom: '4vw' }}>
          <div className="check-these-out-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vw', width: '100%', padding: '0em 0em 0em 3em' }}>
            <div style={{ minWidth: '320px', maxWidth: '340px', paddingTop: '0.5vw' }}>
              <div className="check-these-out-title" style={{textTransform: 'uppercase', fontSize: '2vw', fontWeight: 700, lineHeight: '1.1', marginBottom: '0.5vw' }}>Check these out</div>
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
                className="check-these-out-cards"
                ref={cardsContainerRef}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1vw',
                  width: '100%',
                  overflowX: 'auto',
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE 10+
                }}
                onScroll={handleScroll}
              >
                {products.map((product, i) => (
                  <div
                    key={i}
                    ref={el => cardsRef.current[i] = el}
                    className="check-these-out-card"
                    style={{
                      background: '#222',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      minHeight: '320px',
                      maxWidth: '400px',
                      minWidth: '260px',
                      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'flex-start',
                      marginRight: '2vw',
                      padding: '0',
                      position: 'relative',
                    }}
                  >
                    <img src={product.images && product.images[0]} alt={product.title} style={{ width: '100%', objectFit: 'cover', height: '160px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', borderBottom: '1px solid #333', background: '#181818'}} />
                    <div className="check-these-out-title" style={{ padding: '1.1em 1em 0.3em 1em', fontSize: '1.13rem', fontWeight: 600, color: '#FFB22C', lineHeight: 1.2 }}>{product.title}</div>
                    <div className="check-these-out-desc" style={{ padding: '0 1em 0.7em 1em', fontSize: '1rem', color: '#fff', opacity: 0.9 }}>{product.description}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.1em', padding: '0 1em 0.7em 1em', width: '100%' }}>
                      <div className="check-these-out-price" style={{ fontSize: '1.07rem', fontWeight: 700, color: '#FFB22C' }}>₹{product.price}</div>
                      <div className="check-these-out-rating" style={{ fontSize: '1.05rem', color: '#FFD700', fontWeight: 500 }}>&#9733; {product.rating}</div>
                    </div>
                    <button
                      className="check-these-out-btn"
                      style={{ margin: '0 1em 1.1em 1em', padding: '0.95em 1.2em', background: '#FFB22C', color: '#181818', border: 'none', borderRadius: '7px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', letterSpacing: '0.04em', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)', transition: 'background 0.18s, color 0.18s' }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >VIEW PRODUCT</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Dots below cards */}
          <div className="check-these-out-dots" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.7em', marginTop: '1.2em' }}>
            {products.map((_, i) => (
              <span
                key={i}
                className={"check-these-out-dot" + (i === activeIdx ? " active" : "")}
                style={{
                  width: 12, height: 12, borderRadius: '50%', background: i === activeIdx ? '#FFB22C' : '#bbb', display: 'inline-block', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s',
                  transform: i === activeIdx ? 'scale(1.2)' : 'scale(1)',
                }}
                onClick={() => scrollToCard(i)}
              />
            ))}
          </div>
          <style>{`

            .check-these-out-cards::-webkit-scrollbar { display: none; }
            .check-these-out-cards { scrollbar-width: none; -ms-overflow-style: none; }
            .check-these-out-dot { transition: background 0.2s, transform 0.2s; }
            .check-these-out-dot.active { background: #FFB22C !important; transform: scale(1.2); }
            .check-these-out-dots { margin-bottom: 0.5em; }
            @media (max-width: 600px) {
            .check-these-out-title { display: none; }
              .check-these-out-container {
                padding: 0 !important;
                align-items: center !important;
              }
              .check-these-out-cards {
                justify-content: center !important;
              }
            }
          `}</style>
        </div>
      </>
    );
  }
  // DESKTOP: Show original flex row version
  return (
    <div style={{ background:"transparent", color: '#ffb22c', padding: '0', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '4vw', marginBottom: '4vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vw', width: '100%', padding: '0em 0em 0em 3em' }}>
        <div style={{ minWidth: '320px', maxWidth: '340px', paddingTop: '0.5vw' }}>
          <div className="check-these-out-title" style={{ marginBottom: '0.5vw', fontSize: '2.2em', fontWeight: 700, lineHeight: '1.1', textTransform: 'uppercase' }}>Check these out</div>
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