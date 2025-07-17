import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Header = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 40) {
        setShow(false); // scroll down, hide
      } else {
        setShow(true); // scroll up, show
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky-header header-slide ${show ? "header-show" : "header-hide"}`}>
      <div className="header-content">
        <button className="nav-btn"><span className="blend-text">HOME</span></button>
        <button className="nav-btn"><span className="blend-text">ABOUT US</span></button>
        <button className="nav-btn"><span className="blend-text">SHOP</span></button>
        <button className="nav-btn"><span className="blend-text">FRESH STOCKS</span></button>
        <button className="nav-btn"><span className="blend-text">CONTACT</span></button>
      </div>
    </header>
  );
};

export default Header; 