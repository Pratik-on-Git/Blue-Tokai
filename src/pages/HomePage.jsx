import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/img/logo.png";
import img1 from '../assets/img/img-1.jpg';
import img2mp4 from '../assets/vid/img-2.mp4';
import img3mp4 from '../assets/vid/img-3.mp4';
import img4mp4 from '../assets/vid/img-4.mp4';
import img5 from '../assets/vid/img-5.mp4';
import InfiniteImageScroller from '../components/InfiniteImageScroller';
import NewArrivals from '../components/NewArrivals';
import Footer from '../components/common/footer';
import aboutUsLogo from '../assets/img/about-us-svgrepo-com.svg';
import SpecialCollections from '../components/common/SpecialCollections';

const heroVideo = "https://videos.pexels.com/video-files/4081317/4081317-uhd_2560_1440_24fps.mp4";

const scrollerItems = [
  { type: 'img', src: img1, alt: '' },
  { type: 'video', src: img2mp4 },
  { type: 'video', src: img3mp4 },
  { type: 'video', src: img4mp4 },
];

const HomePage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const footerRef = useRef(null);

  // Clamp scroll so user cannot scroll past the bottom of the footer
  useEffect(() => {
    function clampScroll() {
      if (!footerRef.current) return;
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerBottom = footerRect.bottom + window.scrollY;
      const maxScroll = footerBottom - window.innerHeight;
      if (window.scrollY > maxScroll) {
        if (window._lenis && window._lenis.scrollTo) {
          window._lenis.scrollTo(maxScroll, { immediate: true });
        } else {
          window.scrollTo({ top: maxScroll, behavior: 'auto' });
        }
      }
    }
    window.addEventListener('scroll', clampScroll);
    window.addEventListener('resize', clampScroll);
    // Clamp on mount
    setTimeout(clampScroll, 200);
    return () => {
      window.removeEventListener('scroll', clampScroll);
      window.removeEventListener('resize', clampScroll);
    };
  }, []);

  // Also clamp after SpecialCollections images load
  const handleSpecialCollectionsImagesLoaded = () => {
    if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
      window.ScrollTrigger.refresh(true);
    }
    if (window._lenis && window._lenis.start) {
      window._lenis.start();
    }
    // Clamp scroll after images load
    setTimeout(() => {
      if (!footerRef.current) return;
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerBottom = footerRect.bottom + window.scrollY;
      const maxScroll = footerBottom - window.innerHeight;
      if (window.scrollY > maxScroll) {
        if (window._lenis && window._lenis.scrollTo) {
          window._lenis.scrollTo(maxScroll, { immediate: true });
        } else {
          window.scrollTo({ top: maxScroll, behavior: 'auto' });
        }
      }
    }, 200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Main content grows, footer stays at bottom */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
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

          <section className="info" style={{ margin: 0, padding: 0 }}>
            <div className="header-rows">
              <div className="header-row"><h1>fresh single estate</h1></div>
              <div className="header-row"><h2>100% Arabica coffee beans</h2></div>
            </div>
              <div className="mid-row">
                <h2>Our journey is a tale of passion for coffee, <br/> and at the heart of it all lie our core values:<br/>
                transparency, traceability, and <br/> <span className="mid-row-big">uncompromising quality.</span></h2>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 20,
                    padding: '10px 16px',
                    background: '#FFB22C',
                    color: '#181818',
                    fontWeight: 900,
                    fontSize: 15,
                    border: 'none',
                    borderRadius: 4,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginLeft: 32,
                    zIndex: 1000,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <img src={aboutUsLogo} alt="About Us" style={{ width: 20, height: 20, display: 'inline-block', marginRight: 6 }} />
                  Learn More
                </button>
              </div>
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
                    style={{ width: '210px', height: '300px', objectFit: 'cover', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', background: '#f7f7f7', transition: 'transform 0.18s, box-shadow 0.18s', border: 'none' }}
                  />
                  <div className="mid-row-img-caption">portable drip bags</div>
                </div>
              </div>
            </section>
          <section className="header-info" style={{ margin: 0, padding: 0 }}>
            <p>
            Our journey is a tale of passion for coffee, and at the heart of it all lie our core values:
            transparency, traceability, and uncompromising quality.
            </p>
            <InfiniteImageScroller items={scrollerItems} speed={22} />
          </section>

          <section className="whitespace" style={{ margin: 0, padding: 0 }}></section>

          <section className="pinned" style={{ margin: 0, padding: 0 }}>
            <div className="revealer">
              <div className="revealer-1"></div>
              <div className="revealer-2"></div>
              <div className="revealer-3"></div>
              <div className="revealer-4"></div>
            </div>
          </section>
          {/* Main content area grows, footer stays at bottom */}
          <section className="website-content" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, margin: 0, padding: 0 }}>
            <NewArrivals />
            {/* Special Collections Section */}
            <SpecialCollections onImagesLoaded={handleSpecialCollectionsImagesLoaded} />
            {/* Footer is always last and visible */}
            <Footer ref={footerRef} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 