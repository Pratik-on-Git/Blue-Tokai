import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
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

const TRAIL_COUNT = 5;

const scrollerItems = [
  { type: 'img', src: img1, alt: '' },
  { type: 'video', src: img2mp4 },
  { type: 'video', src: img3mp4 },
  { type: 'video', src: img4mp4 },
];

const HomePage = () => {
  const websiteContentRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 600) return; // Only on mobile
    if (!websiteContentRef.current) return;
    let ctx;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.set(websiteContentRef.current, { opacity: 0 });
        gsap.to(websiteContentRef.current, {
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: websiteContentRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
            once: false,
          },
        });
      }, websiteContentRef);
    });
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [trailImages, setTrailImages] = useState([]);
  const [allProductImages, setAllProductImages] = useState([]);
  const trailRefs = useRef([]);
  const heroRef = useRef(null);

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
    // Clamp scroll after images load (all viewports)
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

  // Fetch product images from products.json
  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        const allImages = data.flatMap(prod => prod.images);
        setAllProductImages(allImages);
        setTrailImages(Array.from({ length: TRAIL_COUNT }, () =>
          allImages[Math.floor(Math.random() * allImages.length)]
        ));
      });
  }, []);

  // Mouse trailing effect
  useEffect(() => {
    if (!heroRef.current || allProductImages.length === 0) return;
    let mouse = { x: 0, y: 0 };
    let last = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let active = false;

    const onMove = e => {
      const rect = heroRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onEnter = () => {
      active = true;
      // Pick 5 new random images on each enter
      setTrailImages(Array.from({ length: TRAIL_COUNT }, () =>
        allProductImages[Math.floor(Math.random() * allProductImages.length)]
      ));
      // Start trail at cursor
      for (let i = 0; i < TRAIL_COUNT; i++) {
        last[i].x = mouse.x;
        last[i].y = mouse.y;
      }
      for (let i = 0; i < TRAIL_COUNT; i++) {
        if (trailRefs.current[i]) {
          gsap.set(trailRefs.current[i], {
            x: mouse.x,
            y: mouse.y,
            scale: 1 - i * 0.13,
            opacity: 1 - i * 0.18,
            zIndex: TRAIL_COUNT - i
          });
        }
      }
    };
    const onLeave = () => {
      active = false;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        if (trailRefs.current[i]) {
          gsap.to(trailRefs.current[i], { opacity: 0, duration: 0.4, scale: 0.7 });
        }
      }
    };
    heroRef.current.addEventListener("mousemove", onMove);
    heroRef.current.addEventListener("mouseenter", onEnter);
    heroRef.current.addEventListener("mouseleave", onLeave);

    // GSAP ticker for trailing
    const ticker = () => {
      if (!active) return;
      last[0].x += (mouse.x - last[0].x) * 0.18;
      last[0].y += (mouse.y - last[0].y) * 0.18;
      for (let i = 1; i < TRAIL_COUNT; i++) {
        last[i].x += (last[i - 1].x - last[i].x) * 0.18;
        last[i].y += (last[i - 1].y - last[i].y) * 0.18;
      }
      for (let i = 0; i < TRAIL_COUNT; i++) {
        if (trailRefs.current[i]) {
          gsap.set(trailRefs.current[i], {
            x: last[i].x,
            y: last[i].y,
            scale: 1 - i * 0.13,
            opacity: 1 - i * 0.18,
            zIndex: TRAIL_COUNT - i
          });
        }
      }
    };
    gsap.ticker.add(ticker);
    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", onMove);
        heroRef.current.removeEventListener("mouseenter", onEnter);
        heroRef.current.removeEventListener("mouseleave", onLeave);
      }
      gsap.ticker.remove(ticker);
    };
  }, [allProductImages]);

  // Change each trailing image every 2 seconds
  useEffect(() => {
    if (!allProductImages.length) return;
    const interval = setInterval(() => {
      setTrailImages(prev => prev.map(() =>
        allProductImages[Math.floor(Math.random() * allProductImages.length)]
      ));
    }, 2000);
    return () => clearInterval(interval);
  }, [allProductImages]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Main content grows, footer stays at bottom */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
          <section className="hero" ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
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
            {/* Trailing images */}
            {trailImages.map((img, i) => (
              <img
                key={i}
                ref={el => (trailRefs.current[i] = el)}
                src={img}
                alt=""
                className="hero-trail-img"
                style={{
                  position: "absolute",
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  
                  pointerEvents: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                  willChange: "transform, opacity",
                  left: 0,
                  top: 0,
                  opacity: 0,
                  zIndex: 10
                }}
              />
            ))}
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
                  className="learn-more-btn"
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
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s, box-shadow 0.3s',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={aboutUsLogo}
                    alt="About Us"
                    className="learn-more-icon"
                    style={{
                      width: 20,
                      height: 20,
                      display: 'inline-block',
                      marginRight: 6,
                      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  />
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
                  <div className="mid-row-img-caption a1">portable drip bags</div>
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
      <style>{`
        .hero-trail-img {
          transition: box-shadow 0.2s;
        }
        
        .learn-more-btn {
          box-shadow: 0 2px 8px rgba(255, 178, 44, 0.2);
        }
        
        .learn-more-btn:hover {
          transform: translateY(-3px) scale(1.05);
          background-color: #ffca65 !important;
          box-shadow: 0 6px 16px rgba(255, 178, 44, 0.4);
        }
        
        .learn-more-btn:active {
          transform: translateY(1px) scale(0.98);
          background-color: #e69b1a !important;
          box-shadow: 0 2px 4px rgba(255, 178, 44, 0.3);
        }
        
        .learn-more-btn:hover .learn-more-icon {
          transform: rotate(15deg) scale(1.2);
        }
        
        .learn-more-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-100%);
          transition: transform 0.6s;
          pointer-events: none;
        }
        
        .learn-more-btn:hover::after {
          transform: translateX(100%);
        }
      `}</style>
    </div>
  );
};

export default HomePage; 