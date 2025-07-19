import React, { useRef } from "react";
import "../App.css";
import logo from "../assets/img/logo.png";
import img1 from '../assets/img/img-1.jpg';
import img2mp4 from '../assets/vid/img-2.mp4';
import img3mp4 from '../assets/vid/img-3.mp4';
import img4mp4 from '../assets/vid/img-4.mp4';
import img5 from '../assets/vid/img-5.mp4';
import InfiniteImageScroller from '../components/InfiniteImageScroller';

const heroVideo = "https://videos.pexels.com/video-files/4081317/4081317-uhd_2560_1440_24fps.mp4";

const scrollerItems = [
  { type: 'img', src: img1, alt: '' },
  { type: 'video', src: img2mp4 },
  { type: 'video', src: img3mp4 },
  { type: 'video', src: img4mp4 },
];

const HomePage = () => {
  const videoRef = useRef(null);

  return (
    <div className="container">
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-background-video"
          src={heroVideo}
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
          <div className="header-row"><h1>fresh single estate</h1></div>
          <div className="header-row"><h2>100% Arabica coffee beans</h2></div>
        </div>
          <div className="mid-row"><h2>Our journey is a tale of passion for coffee, <br/> and at the heart of it all lie our core values:<br/>
          transparency, traceability, and <br/> <span className="mid-row-big">uncompromising quality.</span></h2></div>
          {/* Image boxes under mid-row */}
          <div className="mid-row-img-boxes">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src="https://bluetokaicoffee.com/cdn/shop/files/img5.jpg?v=1747993563&width=1800" alt="Coffee Cans" />
              <div className="mid-row-img-caption">ready to drink</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src="https://bluetokaicoffee.com/cdn/shop/files/Sampler_201224.jpg?v=1750764829&width=1800" alt="Sampler" />
              <div className="mid-row-img-caption">Roasted Coffee</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <video
                src={img5}
                alt="Coffee Bag"
                className="mid-row-img-video"
                muted
                autoPlay
                loop
                playsInline
                style={{ width: '210px', height: '300px', objectFit: 'cover', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', background: '#fff', transition: 'transform 0.18s, box-shadow 0.18s', border: 'none' }}
              />
              <div className="mid-row-img-caption">portable drip bags</div>
            </div>
          </div>
        </section>
      <section className="header-info">
        <p>
        Our journey is a tale of passion for coffee, and at the heart of it all lie our core values:
        transparency, traceability, and uncompromising quality.
        </p>
        <InfiniteImageScroller items={scrollerItems} speed={22} />
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

export default HomePage; 