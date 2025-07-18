import React from "react";

const Banner = ({ image, headline, features }) => (
  <div style={{
    width: "100%",
    minHeight: 220,
    background: `url(${image}) center/cover no-repeat`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "relative",
    padding: "2.5rem 2.5rem 1.5rem 2.5rem",
    color: "#fff"
  }}>
    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 18, textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>{headline}</h1>
    {features && (
      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {f.icon && <img src={f.icon} alt="" style={{ width: 38, height: 38, marginBottom: 6 }} />}
            <span style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>{f.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Banner; 