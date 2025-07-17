import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "../App.css";

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);
  const dotsRef = useRef([]);

  useEffect(() => {
    const hideLoader = () => setFade(true);
    window.addEventListener("load", hideLoader);
    const timeout = setTimeout(hideLoader, 3500);
    return () => {
      window.removeEventListener("load", hideLoader);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (fade) {
      const t = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(t);
    }
  }, [fade]);

  useEffect(() => {
    if (dotsRef.current.length) {
      gsap.set(dotsRef.current, { x: 0, backgroundColor: "#fff", opacity: 1, scale: 1 });
      gsap.to(dotsRef.current, {
        x: 60,
        backgroundColor: "#ffe066",
        repeat: -1,
        yoyo: true,
        ease: "slow(0.5,0.4,false)",
        duration: 1.6,
        stagger: 0.22,
      });
      gsap.fromTo(
        dotsRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          repeat: -1,
          yoyo: true,
          ease: "slow(0.5,0.4,true)",
          duration: 1.6,
          stagger: 0.22,
        }
      );
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader-overlay${fade ? " loader-fade" : ""}`}>
      <div className="dots-container">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            className="dots"
            key={i}
            ref={el => (dotsRef.current[i] = el)}
          ></div>
        ))}
      </div>
      <div className="loader-brand">BLUE TOKAI COFFEE ROASTERS</div>
    </div>
  );
};

export default Loader; 