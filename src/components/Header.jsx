import React from "react";
import "../App.css";

const Header = () => (
  <header className="sticky-header" >
    <div className="header-content">
      <button className="nav-btn"><span className="blend-text">HOME</span></button>
      <button className="nav-btn"><span className="blend-text">ABOUT US</span></button>
      <button className="nav-btn"><span className="blend-text">SHOP</span></button>
      <button className="nav-btn"><span className="blend-text">FRESH STOCKS</span></button>
      <button className="nav-btn"><span className="blend-text">CONTACT</span></button>
    </div>
  </header>
);

export default Header; 