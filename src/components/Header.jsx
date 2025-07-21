import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Header = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const curr = window.scrollY;
          // Only hide if scrolling down and past 40px
          if (curr > lastScrollY.current && curr > 40) {
            setShow(false);
          } else {
            setShow(true);
          }
          lastScrollY.current = curr;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky-header header-slide ${show ? "header-show" : "header-hide"}`}>
      <div className="header-content">
        <span className="blend-text">BLUE TOKAI COFFEE ROASTERIES</span>
      </div>
      <div className="header-content">
        <button className="nav-btn"><span className="blend-text">HOME</span></button>
        <button className="nav-btn"><span className="blend-text">ABOUT US</span></button>
        <button className="nav-btn"><span className="blend-text">SHOP</span></button>
        <button className="nav-btn"><span className="blend-text">FRESH STOCKS</span></button>
        <button className="nav-btn"><span className="blend-text">CONTACT</span></button>
        <button className="nav-btn"><span className="blend-text">SIGNUP/LOGIN</span></button>
      </div>
    </header>
  );
};

export default Header; 