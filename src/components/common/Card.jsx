import React from "react";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 370;

const Card = ({
  image,
  title,
  description,
  price,
  buttonText,
  onButtonClick,
  tags = [],
  rating,
  topRated
}) => (
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
    <div style={{ position: "relative", width: "100%", height: 230, overflow: "hidden" }}>
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
      {/* Tags overlay (top left) */}
      <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, zIndex: 2 }}>
        {tags.map((tag, i) => (
          <span key={i} style={{
            background: "rgba(255,255,255,0.92)",
            color: "#181818",
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 12,
            padding: "2px 10px",
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
            fontSize: 13,
            borderRadius: 12,
            padding: "2px 10px",
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <span style={{ fontSize: 15, marginRight: 2 }}>★</span>
            <span style={{ color: "#fff", fontWeight: 700 }}>{rating}</span>
          </span>
        </div>
      )}
      {/* Top Rated badge overlay (below rating, top right) */}
      {topRated && (
        <div style={{ position: "absolute", top: 197, right: 12, zIndex: 2 }}>
          <span style={{
            background: "#fff",
            color: "#181818",
            fontWeight: 700,
            fontSize: 11,
            padding: "2px 12px",
            borderRadius: 12,
            letterSpacing: 1.1,
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
            background: "#181818",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 15,
            padding: "10px 22px",
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

export default Card; 