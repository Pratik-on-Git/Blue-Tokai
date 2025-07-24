import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BAR_COUNT = 8;
const BAR_HEIGHT = 50;
const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

const Loader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const svgRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (!svgRef.current || !imageRef.current) return;
    const rects = svgRef.current.querySelectorAll("clipPath rect");
    // Set initial state: height 0, y at bottom of each bar
    rects.forEach((rect, i) => {
      gsap.set(rect, { attr: { height: 0, y: (SVG_HEIGHT - (i + 1) * BAR_HEIGHT) + BAR_HEIGHT } });
    });
    gsap.set(svgRef.current, { opacity: 1 });
    gsap.set(imageRef.current, { opacity: 1 });
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        if (onFinish) onFinish();
      }
    });
    // Animate bars growing from bottom to top
    tl.to(rects, {
      attr: (i) => ({
        height: BAR_HEIGHT,
        y: SVG_HEIGHT - (i + 1) * BAR_HEIGHT
      }),
      duration: 0.7,
      stagger: {
        each: 0.1,
        from: "end"
      },
      ease: "power2.out"
    })
    // Animate bars shrinking to top (wipe out)
    .to(rects, {
      attr: (i) => ({
        height: 0,
        y: SVG_HEIGHT - (i + 1) * BAR_HEIGHT
      }),
      duration: 0.8,
      stagger: {
        each: 0.05,
        from: "center"
      },
      ease: "sine.inOut"
    })
    // Fade out the image after wipe (no overlap)
    .to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut"
    });
    // Optional: restart animation on click
    const restart = () => tl.restart();
    document.addEventListener("click", restart);
    return () => document.removeEventListener("click", restart);
  }, [onFinish]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{ opacity: 1, maxWidth: "90vw", maxHeight: "90vh" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="clip-0">
            {[...Array(BAR_COUNT)].map((_, i) => (
              <rect
                key={i}
                width={SVG_WIDTH}
                height={BAR_HEIGHT}
                y={SVG_HEIGHT - (i + 1) * BAR_HEIGHT}
                style={{ fill: "#372520", fillOpacity: 0.8 }}
              />
            ))}
          </clipPath>
        </defs>
        <image
          ref={imageRef}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          style={{ clipPath: "url(#clip-0)" }}
          href="/img-1.jpg"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="2.4rem"
          fill="#fff"
          fontWeight="bold"
          style={{ pointerEvents: "none", letterSpacing: 2 }}
        >
          BLUE TOKAI COFFEE ROASTERS
        </text>
      </svg>
    </div>
  );
};

export default Loader; 