import React from "react";

const Footer = () => (
  <footer style={{
    width: "100%",
    background: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "1.5rem 0 1rem 0",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 15,
    borderTop: "1.5px solid #232323",
    marginTop: "auto"
  }}>
    &copy; {new Date().getFullYear()} Blue Tokai Coffee Roasters. All rights reserved.
  </footer>
);

export default Footer;
