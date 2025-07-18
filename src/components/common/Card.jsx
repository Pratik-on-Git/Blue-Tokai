import React from "react";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 220 * 2 / 3 + 220; // 220px image, rest for content

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
      borderRadius: 18,
      boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
      width: CARD_WIDTH,
      minHeight: CARD_HEIGHT,
      aspectRatio: "3/2",
      padding: 0,
      margin: "0 auto",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      position: "relative"
    }}
  >
    {/* Image with tags and rating */}
    <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden" }}>
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          display: "block"
        }}
      />
      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              background: "rgba(255,255,255,0.85)",
              color: "#222",
              fontWeight: 600,
              fontSize: 12,
              borderRadius: 16,
              padding: "3px 13px",
              marginRight: 2
            }}>{tag}</span>
          ))}
        </div>
      )}
      {/* Star rating */}
      {rating && (
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#fff", background: "rgba(34,34,34,0.85)", borderRadius: 12, fontWeight: 700, fontSize: 14, padding: "2px 10px" }}>
            <span style={{ marginRight: 4, color: "#FFD700" }}>★</span>{rating}
          </span>
        </div>
      )}
    </div>
    {/* Top Rated tag below image */}
    {topRated && (
      <div style={{
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '8px 0 0 14px', minHeight: 24
      }}>
        <span style={{ border: "1.5px solid #222", borderRadius: 16, fontSize: 10, padding: "2px 13px", color: "#222", fontWeight: 600 }}>Top Rated</span>
      </div>
    )}
    {/* Card content */}
    <div style={{ padding: "14px", display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#222" }}>{title}</div>
      </div>
      <div style={{ fontSize: 15, color: "#444", marginBottom: 18, minHeight: 36 }}>{description}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>
          ${price} <span style={{ fontWeight: 400, fontSize: 15, color: "#888" }}>/ night</span>
        </div>
        <button
          onClick={onButtonClick}
          style={{
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: 22,
            fontWeight: 700,
            fontSize: 15,
            padding: "8px 22px 8px 22px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            transition: "background 0.18s, color 0.18s"
          }}
        >
          Book Now <span style={{ fontSize: 18, marginLeft: 2 }}>→</span>
        </button>
      </div>
    </div>
  </div>
);

export default Card; 