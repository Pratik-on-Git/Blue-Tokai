import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Banner = ({ image, video, headline, features }) => {
  const bannerRef = useRef(null);
  const headlineRef = useRef(null);
  const featuresRef = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Animate headline
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
    // Animate features (staggered)
    if (featuresRef.current && featuresRef.current.length > 0) {
      gsap.fromTo(
        featuresRef.current,
        { y: 30, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.5
        }
      );
    }
    // Animate video fade-in
    if (video && videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [headline, features, video]);

  return (
    <div
      ref={bannerRef}
      style={{
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
      }}
    >
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 600px) {
          .banner-responsive {
            height: 160px !important;
            padding: 0.8rem 0.5rem 1.2rem 0.5rem !important;
            left: -25px;
            bottom: 4px;
          }
          .banner-responsive h1 {
            font-size: 1.2rem !important;
            margin-bottom: 10px !important;
            text-align: center;
          }
          .banner-features {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .banner-feature {
            flex-direction: row !important;
            gap: 8px !important;
            font-size: 0.98rem !important;
          }
          .banner-feature img {
            width: 28px !important;
            height: 28px !important;
            margin-bottom: 0 !important;
            margin-right: 6px !important;
          }
        }
      `}</style>
      {video ? (
        <video
          ref={videoRef}
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
            zIndex: 0,
            opacity: 0
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
      <div className="banner-responsive" style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1
          ref={headlineRef}
          style={{ fontSize: 32, fontWeight: 700, marginBottom: 18, letterSpacing: "0px", textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          {headline}
        </h1>
        {features && (
          <div className="banner-features" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {features.map((f, i) => (
              <div
                key={i}
                ref={el => (featuresRef.current[i] = el)}
                className="banner-feature"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0 }}
              >
                {f.icon && <img src={f.icon} alt="" style={{ width: 38, height: 38, marginBottom: 6 }} />}
                <span style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>{f.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner; 