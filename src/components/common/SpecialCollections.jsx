import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const getRandomProducts = (products, count = 3) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const SpecialCollections = ({ onImagesLoaded }) => {
  const [selected, setSelected] = useState(0);
  const [collections, setCollections] = useState([]);
  const [displayedImg, setDisplayedImg] = useState(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const rightImgRef = useRef(null);
  const navigate = useNavigate();
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Fetch products and pick 4 random ones
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(products => {
        const randomProducts = getRandomProducts(products, 3).map(p => ({
          id: p.id,
          name: p.title,
          subtitle: '',
          preview: p.images && p.images[0],
          main: p.images && p.images[0],
        }));
        setCollections(randomProducts);
        setDisplayedImg(randomProducts[0]?.main || null);
      });
  }, []);

  // GSAP hover effect logic
  useEffect(() => {
    const links = document.querySelectorAll(".img-hover-effect-link");
    const imgWrap = imgWrapRef.current;
    const imgItem = imgRef.current;

    function moveImg(e) {
      gsap.to(imgWrap, {
        duration: 0.7,
        x: e.clientX + 24,
        y: e.clientY - 40,
        ease: "expo.out"
      });
    }

    function linkHover(e) {
      if (e.type === "mouseenter") {
        const imgSrc = e.target.dataset.src;
        gsap.set(imgItem, { attr: { src: imgSrc } });
        gsap.to(imgWrap, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "expo.out" });
      }
      if (e.type === "mouseleave") {
        gsap.to(imgWrap, { autoAlpha: 0, scale: 0.3, duration: 0.4, ease: "expo.out" });
      }
    }

    links.forEach(link => {
      link.addEventListener("mouseenter", linkHover);
      link.addEventListener("mouseleave", linkHover);
      link.addEventListener("mousemove", moveImg);
    });

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", linkHover);
        link.removeEventListener("mouseleave", linkHover);
        link.removeEventListener("mousemove", moveImg);
      });
    };
  }, [collections]);

  // Door opening animation for left and right sides
  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;
    gsap.set(leftRef.current, { transformOrigin: "right center", scaleX: 0, willChange: "transform" });
    gsap.set(rightRef.current, { transformOrigin: "left center", scaleX: 0, willChange: "transform" });

    gsap.to(leftRef.current, {
      scaleX: 1,
      duration: 1.1,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: () => ScrollTrigger.refresh(),
      }
    });
    gsap.to(rightRef.current, {
      scaleX: 1,
      duration: 1.1,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: () => ScrollTrigger.refresh(),
      }
    });
    setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [collections]);

  // Smooth image transition on hover/select
  useEffect(() => {
    if (!rightImgRef.current || !collections.length) return;
    // Fade out and slide down
    gsap.to(rightImgRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedImg(collections[selected]?.main || null);
        // After image is swapped, fade in and slide up
        gsap.fromTo(
          rightImgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.05 }
        );
      }
    });
  }, [selected, collections]);

  // Track image load state
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = collections.length;

  useEffect(() => {
    if (imagesLoaded === totalImages && totalImages > 0) {
      if (typeof onImagesLoaded === 'function') {
        onImagesLoaded();
      }
    }
  }, [imagesLoaded, totalImages, onImagesLoaded]);

  if (!collections.length) return null;

  return (
    <div className="special-collections" style={{
      width: "100%",
      height: "60vh",
      background: "#f7f7f7",
      color: "#000",
      overflow: "auto",
      padding: "2vw 3em 2vw 3em",
      display: "flex",
      flexDirection: "row",
      paddingBottom: "3rem",
      position: "relative"
    }}>
      {/* Floating image that follows mouse */}
      <div
        ref={imgWrapRef}
        className="img-wrapper"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 120,
          height: 140,
          pointerEvents: "none",
          zIndex: 1000,
          opacity: 0,
          scale: 0.3,
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          background: "#222",
          transition: "opacity 0.2s"
        }}
      >
        <img
          ref={imgRef}
          className="img-placeholder"
          src={collections[0]?.preview}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 4
          }}
        />
      </div>
      {/* Left Side */}
      <div
        ref={leftRef}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          minWidth: 0,
          overflow: "hidden",
        }}>
        <div style={{ fontSize: '2.2vw', fontWeight: 600, marginBottom: '0.5vw', lineHeight: 1.1 }}>
          <span style={{ color: "#FFB22C", fontWeight: 700 }}>/</span> BEST<br />COLLECTIONS <span style={{ fontSize: 18, fontWeight: 600, opacity: 0.7, marginBottom: 8 }}>({collections.length})</span>
        </div>
        <div style={{ margin: "1.5vw 0 0 0", position: "relative", overflowY: "auto", maxHeight: "calc(60vh - 5vw)", width: "100%" }}>
          {collections.map((col, i) => (
            <div
              key={col.name + i}
              className="img-hover-effect-link"
              data-src={col.preview}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #333",
                textTransform: "uppercase",
                padding: "1.2vw 0",
                fontWeight: i === selected ? 700 : 400,
                color: i === selected ? "#FFB22C" : "#000",
                cursor: "pointer",
                position: "relative",
                fontSize: 20,
                background: i === selected ? "rgba(255,255,255,0.01)" : "transparent"
              }}
              onMouseEnter={() => setSelected(i)}
              onClick={() => navigate(`/product/${col.id}`)}
            >
              <span style={{ flex: 1 }}>{col.name}</span>
              <span style={{ fontSize: 20, fontWeight: 300, marginLeft: 12, opacity: 0.7 }}>&#8594;</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right Side */}
      <div
        ref={rightRef}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          minWidth: 0,
          overflow: "hidden",
          padding: "2vw",
        }}>
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#222", borderRadius: 8, minHeight: 200 }}>
          {displayedImg ? (
            <img
              ref={rightImgRef}
              src={displayedImg}
              alt="Main"
              style={{
                objectFit: "cover",
                borderRadius: 8,
                boxShadow: "0 2px 24px rgba(0,0,0,0.18)"
              }}
            />
          ) : null}
        </div>
      </div>
      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 900px) {
          .img-wrapper { display: none !important; }
        }
        @media (max-width: 700px) {
          .img-wrapper { display: none !important; }
          div[ref="leftRef"], div[ref="rightRef"] {
            flex: 1 1 100%;
            width: 100% !important;
            padding: 2vw 0 !important;
          }
          div[ref="rightRef"] {
            margin-top: 2vw;
          }
          div[ref="leftRef"] {
            margin-bottom: 2vw;
          }
          div[ref="leftRef"], div[ref="rightRef"] {
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpecialCollections; 