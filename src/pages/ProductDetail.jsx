import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const badgeStyle = {
  display: "inline-block",
  background: "#FFB22C",
  color: "#181818",
  borderRadius: 16,
  fontWeight: 600,
  fontSize: 14,
  padding: "5px 10px",
  border: "1.5px solid #FFB22C",
  letterSpacing: 0.2,
};
const pillStyle = {
  display: "inline-block",
  background: "#181818",
  color: "#F7F7F7",
  borderRadius: 16,
  fontWeight: 600,
  fontSize: 13,
  padding: "4px 10px",
  border: "1.5px solid #181818",
  letterSpacing: 0.2,
};

const brewIcons = [
  // SVGs for hourglass, bean, water drop, thermometer, grind
  <svg width="28" height="28" viewBox="0 0 28 28" key="hourglass"><circle cx="14" cy="14" r="13" fill="transparent" /><path d="M8 6h12M8 22h12M10 6c0 4 4 4 4 8s-4 4-4 8m8-16c0 4-4 4-4 8s4 4 4 8" stroke="#f7f7f7" strokeWidth="2" fill="none"/></svg>,
  <svg width="28" height="28" viewBox="0 0 28 28" key="bean"><circle cx="14" cy="14" r="13" fill="transparent" /><ellipse cx="14" cy="14" rx="6" ry="10" stroke="#f7f7f7" strokeWidth="2" fill="none"/><path d="M14 4c2 4 2 12 0 16" stroke="#f7f7f7" strokeWidth="2" fill="none"/></svg>,
  <svg width="28" height="28" viewBox="0 0 28 28" key="water"><circle cx="14" cy="14" r="13" fill="transparent" /><path d="M14 6c4 6 6 8 6 12a6 6 0 1 1-12 0c0-4 2-6 6-12z" stroke="#f7f7f7" strokeWidth="2" fill="none"/></svg>,
  <svg width="28" height="28" viewBox="0 0 28 28" key="thermo"><circle cx="14" cy="14" r="13" fill="transparent" /><rect x="12" y="7" width="4" height="10" rx="2" stroke="#f7f7f7" strokeWidth="2" fill="none"/><circle cx="14" cy="20" r="3" stroke="#f7f7f7" strokeWidth="2" fill="none"/></svg>,
    <svg width="28" height="28" viewBox="0 0 28 28" key="grind"><circle cx="14" cy="14" r="13" fill="transparent" /><circle cx="14" cy="14" r="6" stroke="#f7f7f7" strokeWidth="2" fill="none"/><circle cx="14" cy="14" r="2" fill="#f7f7f7"/></svg>
];

// Placeholder for brew data (to be replaced by dynamic fetch from brew.json)
const brewDataMap = {
  "Pour Over": {
    method: "POUROVER",
    params: [
      { label: "BREW TIME", value: "3:30 MINS" },
      { label: "COFFEE AMOUNT", value: "17G" },
      { label: "WATER VOLUME", value: "240ML" },
      { label: "WATER TEMPERATURE", value: "93°C" },
      { label: "GRIND SIZE", value: "POUR OVER GRIND" },
    ],
    recommended: ["Pour Over", "AeroPress"]
  },
  "Aeropress": {
    method: "AEROPRESS",
    params: [
      { label: "BREW TIME", value: "2:30 MINS" },
      { label: "COFFEE AMOUNT", value: "17G" },
      { label: "WATER VOLUME", value: "210ML" },
      { label: "WATER TEMPERATURE", value: "88°C" },
      { label: "GRIND SIZE", value: "AEROPRESS GRIND" },
    ],
    recommended: ["Pour Over", "AeroPress"]
  }
};

// BrewSection component
const BrewSection = ({ brewList, brewData }) => {
  const [selectedBrew, setSelectedBrew] = useState(brewList && brewList.length > 0 ? brewList[0] : null);
  useEffect(() => {
    if (brewList && brewList.length > 0) setSelectedBrew(brewList[0]);
  }, [brewList]);
  if (!brewList || brewList.length === 0) return null;
  const activeBrew = selectedBrew;
  const brew = brewData.find(b => b.method.toLowerCase() === (activeBrew || '').toLowerCase());
  return (
    <div style={{ paddingTop: '10vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 32, height: '80vh',  }}>
      <div style={{ background: 'transparent', borderRadius: 8, padding: '36px 32px', color: '#181818', fontFamily: 'DM Sans, sans-serif', Width: '50%', flex: '1 1 0%' }}>
        {/* Brew method buttons */}
        {brewList.length > 1 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            {brewList.map((b, i) => (
              <button
                key={b}
                onClick={() => setSelectedBrew(b)}
                style={{
                  background: activeBrew === b ? '#FFB22C' : 'transparent',
                  color: activeBrew === b ? '#181818' : '#FFB22C',
                  border: '1.5px solid #FFB22C',
                  borderRadius: 18,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '8px 22px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                }}
              >
                {b}
              </button>
            ))}
          </div>
        )}
        {/* Brew details */}
        {brew ? (
          <>
            <div style={{ color: '#FFB22C', fontWeight: 700, fontSize: 18, letterSpacing: 1, marginBottom: 8 }}>{brew.displayName}</div>
            <div style={{ fontSize: 36, fontWeight: 400, marginBottom: 18, color: '#f7f7f7' }}>
              How to <span style={{ fontStyle: 'italic' }}>Brew</span>
            </div>
            <div>
              {brew.params.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 10 }}>
                  {brewIcons[i]}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 500, fontSize: 18, color: "#FFB22C" }}>{p.value}</span>
                    <span style={{ color: '#f7f7f7', fontWeight: 400, fontSize: 16 }}>/</span>
                    <span style={{ color: '#f7f7f7', fontWeight: 400, fontSize: 16 }}>{p.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ color: '#888' }}>No brew details available.</div>
        )}
      </div>
      {/* Brew image (from brew.json) */}
      {brew && brew.image && (
        <img
          src={brew.image}
          alt={brew.displayName + ' Brew'}
          style={{ width: '40%', height: 'auto', borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
        />
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [brewData, setBrewData] = useState([]);
  const [selectedBrew, setSelectedBrew] = useState(null);
  const sizePillStyle = (active) => ({
    display: 'inline-block',
    padding: '8px 22px',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "DM Sans, sans-serif",
    borderRadius: 22,
    border: active ? 'none' : '2px solid #f7f7f7',
    background: active ? '#854836' : 'transparent',
    color: active ? '#F7F7F7' : '#f7f7f7',
    marginRight: 12,
    marginBottom: 8,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.18s, color 0.18s, border 0.18s',
    boxShadow: active ? '0 2px 8px rgba(32,92,42,0.08)' : 'none',
    borderColor: active ? '#854836' : '#f7f7f7',
  });

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        if (found) {
          setProduct(found);
          setNotFound(false);
          // Set default size if available
          if (found.size && found.size.length > 0) setSelectedSize(found.size[0]);
          // Set default selected brew method
          if (found.brew) {
            if (Array.isArray(found.brew)) setSelectedBrew(found.brew[0]);
            else setSelectedBrew(found.brew);
          } else {
            setSelectedBrew(null);
          }
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
    // Fetch brew.json
    fetch("/brew.json")
      .then((res) => res.json())
      .then((data) => setBrewData(data));
  }, [id]);

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '85%', width: '100%', margin: '0 auto', padding: '17vh 0px 0 0px', display: 'flex', gap: '10rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left: Image Skeleton */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 420, position: 'relative' }}>
          <div style={{ background: '#F7F7F7', borderRadius: 8, minHeight: 420, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="skeleton-shimmer" style={{ width: '100%', height: 420, borderRadius: 8, background: 'linear-gradient(90deg, #ececec 25%, #f7f7f7 50%, #ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }} />
          </div>
        </div>
        {/* Right: Details Skeleton */}
        <div style={{ flex: 2, minWidth: 320, background: '#000', borderRadius: 8, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#181818', padding: 32 }}>
          <div style={{ width: 120, height: 18, background: '#222', borderRadius: 6, marginBottom: 18, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 38, background: '#222', borderRadius: 8, marginBottom: 18, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 120, height: 30, background: '#222', borderRadius: 8, marginBottom: 18, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
          {/* Stars skeleton */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ width: 24, height: 24, background: '#222', borderRadius: 4, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
            ))}
          </div>
          {/* Pills skeleton */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ width: 70, height: 32, background: '#222', borderRadius: 16, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
            ))}
          </div>
          {/* Quantity/Add to Cart/Buy Now skeleton */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 120, height: 44, background: '#222', borderRadius: 8, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
            <div style={{ width: 140, height: 44, background: '#222', borderRadius: 8, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
            <div style={{ width: 140, height: 44, background: '#222', borderRadius: 8, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
          </div>
          {/* Description skeleton */}
          <div style={{ width: '80%', height: 18, background: '#222', borderRadius: 6, marginBottom: 10, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: '60%', height: 18, background: '#222', borderRadius: 6, marginBottom: 10, animation: 'shimmer 1.5s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #333 50%, #222 75%)', backgroundSize: '200% 100%' }} />
        </div>
      </div>
      {/* Skeleton shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
  if (notFound || !product) return <div style={{ color: '#181818', padding: 40 }}>Product not found.</div>;

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const fill = rating >= i + 1 ? '#FFD700' : rating > i ? `url(#half${i})` : '#e0e0e0';
      stars.push(
        <svg key={i} width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: 2, verticalAlign: 'middle' }}>
          <defs>
            <linearGradient id={`half${i}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset={`${(rating - i) * 100}%`} stopColor="#FFD700" />
              <stop offset={`${(rating - i) * 100}%`} stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
          <polygon
            points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.3 5.5,21 7,14.1 2,9.3 9,9"
            fill={fill}
            stroke="#FFD700"
            strokeWidth="0.5"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    
      <div style={{ maxWidth: "85%", margin: "0 auto", padding: "17vh 0px 0 0px", display: "flex", gap: "5rem 10rem", alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left: Product Images */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 420, position: 'relative' }}>
          <div style={{ background: "#F7F7F7", borderRadius: 8, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", textAlign: "center", minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={product.images?.[mainImgIdx]} alt={product.title} style={{ width: "100%", objectFit: "cover", borderRadius: 8, transition: '0.2s' }} />
          </div>
          {/* Thumbnails if multiple images */}
          {product.images?.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title + " " + (i+1)}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: mainImgIdx === i ? "2.5px solid #181818" : "1.5px solid #eee", cursor: 'pointer', opacity: mainImgIdx === i ? 1 : 0.7, transition: 'border 0.18s, opacity 0.18s' }}
                  onClick={() => setMainImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>
        {/* Right: Product Details */}
        <div style={{ flex: 2, minWidth: 320, background: '#000', borderRadius: 8, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#181818' }}>
          <div style={{ fontSize: 14, color: "#FFB22C", fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>{product.category}</div>
          <h1 style={{ fontSize: 38, color: "#F7F7F7", fontWeight: 500, margin: 0, letterSpacing: "normal"}}>{product.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <div style={{ fontSize: 30, fontWeight: 400, color: '#F7F7F7', letterSpacing: 0.5 }}>₹{product.price}</div>
          </div>
          {/* Rating under price */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 18px 0' }}>
              {renderStars(product.rating)}
              <span style={{ fontWeight: 600, fontSize: 16, color: '#FFD700', marginLeft: 4 }}>{product.rating.toFixed(1)}</span>
            </div>
          )}
          <div style={{ fontSize: 16, color: "#444", marginBottom: 18, marginTop: 8 }}>{product.description}</div>
          {/* Attribute Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
            {product.preference && (Array.isArray(product.preference) ? product.preference : [product.preference]).map((p, i) => <span key={"pref"+i} style={badgeStyle}>{p}</span>)}
            {product.flavour && (Array.isArray(product.flavour) ? product.flavour : [product.flavour]).map((f, i) => <span key={"flav"+i} style={badgeStyle}>{f}</span>)}
            </div>
          {/* Size Pills Section (always show, even if only one size) */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: '#F7F7F7', fontWeight: 500, fontSize: 16, display: 'block', marginBottom: 8 }}>Size</label>
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: 8 }}>
              {(product.size && product.size.length > 0
                ? product.size
                : product.size
                  ? [product.size]
                  : product.defaultSize
                    ? [product.defaultSize]
                    : []).map((sz, i) => (
                <button
                  key={i}
                  type="button"
                  style={sizePillStyle(selectedSize === sz)}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
              {/* If no size info, show a disabled pill */}
              {(!product.size || product.size.length === 0) && !product.defaultSize && (
                <button type="button" style={sizePillStyle(true)} disabled>N/A</button>
              )}
            </div>
          </div>
          {/* Quantity, Add to Cart, Buy Now Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, marginTop: 8 }}>
            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #f7f7f7',
              color: '#f7f7f7',
              borderRadius: 8,
              background: 'transparent',
              minWidth: 120,
              marginRight: 8
            }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  width: 38,
                  height: 44,
                  cursor: 'pointer',
                  color: '#f7f7f7',
                  fontWeight: 400,
                  borderRadius: '8px 0 0 8px',
                  outline: 'none',
                  userSelect: 'none'
                }}
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span style={{ fontSize: 18, fontWeight: 600, width: 32, textAlign: 'center', userSelect: 'none' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  width: 38,
                  height: 44,
                  cursor: 'pointer',
                  color: '#f7f7f7',
                  fontWeight: 400,
                  borderRadius: '8px',
                  outline: 'none',
                  userSelect: 'none'
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            {/* Add to Cart Button */}
            <button
              style={{
                background: '#854836',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 18,
                padding: '12px 36px',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                boxShadow: 'none',
                textTransform: 'none',
                marginRight: 8
              }}
            >
              Add To Cart
            </button>
            {/* Buy Now Button */}
            <button
              style={{
                background: '#FFB22C',
                color: '#000',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 17,
                padding: '12px 36px',
                cursor: 'pointer',
                letterSpacing: 0.2,
                fontFamily: 'DM Sans, sans-serif',
                boxShadow: 'none',
                textTransform: 'none'
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        {/* Description section above circular meters */}
        {product.details && (
              <div>
                <div style={{ fontWeight: 500, fontSize: 36, color: '#FFB22C', marginBottom: 6 }}>Description</div>
                <div style={{ fontSize: 18, color: '#f7f7f7', lineHeight: 1.5 }}>{product.details}</div>
              </div>
            )}
        <div style={{
            borderRadius: 4,
            width: '100%',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            color: '#181818',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            
            {/* Top: Four circular meters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 36, background: 'transparent', borderRadius: 12, padding: '32px 0' }}>
              {[
                { label: 'SWEETNESS', value: product.sweetness || 'Medium' },
                { label: 'BODY', value: product.body || 'Medium' },
                { label: 'ACIDITY', value: product.acidity || 'Medium' },
                { label: 'BITTERNESS', value: product.bitterness || 'Medium' },
              ].map((attr, i) => {
                // Map value to percent fill
                let percent = 0.5; // default Medium
                const val = (attr.value || '').toString().toLowerCase();
                if (val === 'low') percent = 0.25;
                else if (val === 'medium') percent = 0.5;
                else if (val === 'medium-high') percent = 0.75;
                else if (val === 'high') percent = 1.0;
                return (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <svg width="64" height="64" viewBox="0 0 64 64" style={{ marginBottom: 8 }}>
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#fff" strokeWidth="6" />
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="#FFB22C"
                        strokeWidth="6"
                        strokeDasharray={Math.PI * 2 * 28}
                        strokeDashoffset={Math.PI * 2 * 28 * (1 - percent)}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <div style={{ fontWeight: 700, fontSize: 17,color: '#F7F7F7', letterSpacing: 0.5 }}>{attr.label}</div>
                    <div style={{ fontSize: 17, color: '#f7f7f7', marginTop: 2 }}>{attr.value}</div>
                  </div>
                );
              })}
            </div>
            {/* Middle: Two-column grid of facts */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>ROAST</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{Array.isArray(product.roast) ? product.roast.join(', ') : (product.roast || 'N/A')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>ALTITUDE</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{product.altitude || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center',flexDirection: 'row-reverse', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>LOCATION</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{product.location || 'N/A'}</span>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>HAVE IT</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{product.haveIt || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>PROCESSING</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{product.processing || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontWeight: 700, color: '#FFB22C', fontSize: 18 }}>VARIETY</span>
                  <span style={{ fontWeight: 400, color: '#f7f7f7', fontSize: 18 }}>{product.variety || 'N/A'}</span>
                </div>
              </div>
            </div>
            {/* Right: Tasting Notes */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontWeight: 400, fontSize: 22, color: '#f7f7f7', marginBottom: 8 }}>TASTING NOTES</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#FFB22C', letterSpacing: 4, marginBottom: 8 }}>
                {(product.tastingNotes || '').toUpperCase() || 'TASTING NOTES'}
              </div>
            </div>
          {/* Brew Section (conditional, with image beside) */}
          {product.showBrewSection && (
            <BrewSection
              brewList={product.brew ? (Array.isArray(product.brew) ? product.brew : [product.brew]) : []}
              brewData={brewData}
            />
          )}
          </div>
      </div>
  );
};

export default ProductDetail; 