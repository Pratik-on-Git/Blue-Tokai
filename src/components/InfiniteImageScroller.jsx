import React from "react";
import "../App.css";

const InfiniteImageScroller = ({ items, speed = 22 }) => {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  // Animation duration based on speed and number of items
  const duration = Math.max(8, doubled.length * speed * 0.12);

  return (
    <div className="infinite-scroller-outer">
      <div
        className="infinite-scroller-inner css-infinite-scroll"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div className="img" key={i}>
            {item.type === "img" ? (
              <img src={item.src} alt={item.alt || ""} />
            ) : (
              <video src={item.src} autoPlay loop muted playsInline />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageScroller; 