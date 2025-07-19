import React from "react";

const Banner = ({ image, video, headline, features }) => (
  <div style={{
    width: "100%",
    height: "250px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "2.5rem 0rem 2.5rem 2.5rem",
    color: "#fff"
  }}>
    {video ? (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0
        }}
      />
    ) : (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url(${image}) center/cover no-repeat`,
          zIndex: 0
        }}
      />
    )}
    <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 18, letterSpacing: "0px", textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>{headline}</h1>
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
  </div>
);

export default Banner; 