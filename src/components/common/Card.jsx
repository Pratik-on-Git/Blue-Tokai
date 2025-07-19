import React, { useState, useRef } from "react";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 370;

const Card = ({
  images,
  image, // fallback
  title,
  description,
  price,
  buttonText,
  onButtonClick,
  tags = [],
  rating,
  topRated
}) => {
  const imgs = Array.isArray(images) && images.length > 0 ? images : (image ? [image] : []);
  const [imgIdx, setImgIdx] = useState(0);
  const intervalRef = useRef();

  const handleMouseEnter = () => {
    if (imgs.length <= 1) return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % imgs.length;
      setImgIdx(idx);
    }, 800);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setImgIdx(0);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 6,
        width: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
        margin: "0 auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        border: "1.5px solid #ececec",
        position: "relative"
      }}
    >
      {/* Image with overlays */}
      <div
        style={{ position: "relative", width: "100%", height: 230, overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {imgs.map((imgSrc, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: imgIdx === i ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: imgIdx === i ? 1 : 0,
              transition: "opacity 0.5s"
            }}
          />
        ))}
        {/* Tags overlay (top left) */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, zIndex: 2 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              background: "rgb(255, 255, 255)",
              color: "#181818",
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 4,
              padding: "2px 8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>{tag}</span>
          ))}
        </div>
        {/* Rating overlay (top right) */}
        {rating && (
          <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
            <span style={{
              background: "#181818",
              color: "#FFD700",
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 4,
              padding: "1.5px 6px",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              <span style={{ fontSize: 13, marginRight: 2 }}>★</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>{rating}</span>
            </span>
          </div>
        )}
        {/* Top Rated badge overlay (below rating, top right) */}
        {topRated && (
          <div style={{ position: "absolute", top: 197, right: 12, zIndex: 2 }}>
            <span style={{
              background: "rgb(255 178 63)",
              color: "#000",
              fontWeight: 600,
              fontSize: 11,
              padding: "2px 12px",
              borderRadius: 12,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
              Top Rated
            </span>
          </div>
        )}
      </div>
      {/* Card content */}
      <div style={{ padding: "18px 18px 0 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: "#181818", marginBottom: 4, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 14, minHeight: 20 }}>{description}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#181818" }}>
            ₹{price}
          </div>
          <button
            onClick={onButtonClick}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontWeight: 400,
              fontSize: 15,
              padding: "10px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              transition: "background 0.18s, color 0.18s"
            }}
          >
            {buttonText || "BUY NOW"} <span style={{ fontSize: 18, marginLeft: 2 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card; 