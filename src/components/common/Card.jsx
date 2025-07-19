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
      border: "3px solid #181818",
      borderRadius: 18,
      width: CARD_WIDTH,
      minHeight: CARD_HEIGHT,
      padding: 0,
      margin: "0 auto",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      position: "relative",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
    }}
  >
    {/* Tags and rating row */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 0 16px", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {tags.map((tag, i) => (
          <span key={i} style={{
            background: "#F5F5F5",
            color: "#181818",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 16,
            padding: "3px 13px",
            marginRight: 0,
            letterSpacing: 0.2
          }}>{tag}</span>
        ))}
      </div>
      {rating && (
        <span style={{
          background: "#181818",
          color: "#FFD700",
          fontWeight: 700,
          fontSize: 15,
          borderRadius: 16,
          padding: "3px 13px",
          display: "flex",
          alignItems: "center",
          gap: 5
        }}>
          <span style={{ fontSize: 16, marginRight: 2 }}>★</span>
          <span style={{ color: "#fff", fontWeight: 700 }}>{rating}</span>
        </span>
      )}
    </div>
    {/* Image */}
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0 0 0" }}>
      <img
        src={image}
        alt={title}
        style={{
          width: "90%",
          height: 120,
          objectFit: "contain",
          borderRadius: 10,
          background: "#fff"
        }}
      />
    </div>
    {/* Top Rated pill */}
    {topRated && (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 0
      }}>
        <span style={{
          background: "rgba(34,34,34,0.08)",
          color: "#181818",
          fontWeight: 700,
          fontSize: 12,
          padding: "3px 18px",
          borderRadius: 16,
          letterSpacing: 1.2,
          textTransform: "uppercase"
        }}>
          Top Rated
        </span>
      </div>
    )}
    {/* Card content */}
    <div style={{ padding: "0 18px 0 18px", display: "flex", flexDirection: "column", flex: 1, marginTop: 10 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#181818", marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 15, color: "#888", marginBottom: 18, minHeight: 24 }}>{description}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#181818" }}>
          ₹{price} <span style={{ fontWeight: 400, fontSize: 15, color: "#888" }}>/ night</span>
        </div>
        <button
          onClick={onButtonClick}
          style={{
            background: "#181818",
            color: "#fff",
            border: "none",
            borderRadius: 22,
            fontWeight: 700,
            fontSize: 16,
            padding: "12px 28px 12px 28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            transition: "background 0.18s, color 0.18s"
          }}
        >
          Book Now <span style={{ fontSize: 20, marginLeft: 2 }}>→</span>
        </button>
      </div>
    </div>
  </div>
);

export default Card; 