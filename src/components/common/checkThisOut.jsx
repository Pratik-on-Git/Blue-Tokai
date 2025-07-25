import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PRODUCT_JSON_PATH = "/products.json";

const CheckTheseOut = () => {
  const [products, setProducts] = useState([]);
  const cardsRef = useRef([]);
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

  return (
    <div style={{ background:"transparent", color: '#ffb22c', padding: '0', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '4vw', marginBottom: '4vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vw', width: '100%', padding: '0em 0em 0em 3em' }}>
        <div style={{ minWidth: '320px', maxWidth: '340px', paddingTop: '0.5vw' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '2vw', fontWeight: 700, lineHeight: '1.1', marginBottom: '0.5vw' }}>Check these out</div>
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