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
        <button className="nav-btn"><span className="blend-text">EQUIPMENTS</span></button>
        <button className="nav-btn"><span className="blend-text">CONTACT</span></button>
        <button className="nav-btn">
          <span className="blend-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'middle',marginRight:'0.4em'}}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
            </svg>
            LOGIN
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header; 