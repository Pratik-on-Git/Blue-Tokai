import React, { useRef, useEffect } from "react";
import "../App.css";
import skyharborVideo from "../assets/skyharbor_1550531353_1982322543534524164_367086061.mp4";
import logo from "../assets/img/logo.png";



const MainPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9; // Play at half speed
    }
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-background-video"
          src={skyharborVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <img src={logo} alt="Blue Tokai Logo" className="hero-logo" />
        {/* Centered production company mark at the bottom */}
        <div className="production-company-mark">
          <div className="vertical-lines">
            {/* 9 vertical lines as in the image */}
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="production-text">GET READY TO DRINK</div>
        </div>
      </section>

      <section className="info">
        <div className="header-rows">
          <div className="header-row"><h1>Motion</h1></div>
          <div className="header-row"><h1>Stills</h1></div>
        </div>
      </section>
      
      <section className="header-info">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ratione nisi harum eos cumque sed.
        </p>
        <div className="header-images">
          <div className="img"><img src="/assets/img-1.jpg" alt="" /></div>
          <div className="img"><img src="/assets/img-2.jpg" alt="" /></div>
          <div className="img"><img src="/assets/img-3.jpg" alt="" /></div>
          <div className="img"><img src="/assets/img-4.jpg" alt="" /></div>
        </div>
      </section>

      <section className="whitespace"></section>

      <section className="pinned">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
          <div className="revealer-3"></div>
          <div className="revealer-4"></div>
        </div>
      </section>
      
      <section className="website-content">
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque necessitatibus modi nisi quidem doloribus.
        </h1>
      </section>
    </div>
  );
};

export default MainPage;
