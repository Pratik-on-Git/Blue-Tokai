import React, { useEffect, useState } from "react";
import "../App.css";

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const hideLoader = () => setFade(true);
    window.addEventListener("load", hideLoader);
    const timeout = setTimeout(hideLoader, 2500);
    return () => {
      window.removeEventListener("load", hideLoader);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (fade) {
      const t = setTimeout(() => setVisible(false), 400); // match CSS fade
      return () => clearTimeout(t);
    }
  }, [fade]);

  if (!visible) return null;

  return (
    <div className={`loader-overlay${fade ? " loader-fade" : ""}`}>
      <div className="loader-spinner"></div>
      <div className="loader-brand">BLUE TOKAI COFFEE ROASTERS</div>
    </div>
  );
};

export default Loader; 