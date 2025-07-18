import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";
import MainPage from "./MainPage";
import About from "./About";
import Contact from "./Contact";
import Shop from "./Shop";
import AnimationController from "./AnimationController";
import AudioControl from "./AudioControl";
import SearchButton from "./SearchButton";
import jazzCafeMusic from "../assets/music/jazz-cafe-background-music-318776.mp3";

function ScrollRestorer() {
  const location = useLocation();
  useEffect(() => {
    // On route change, restore scroll if not first visit
    const isFirstVisit = !localStorage.getItem("hasVisited");
    if (!isFirstVisit) {
      const lastScroll = localStorage.getItem(`scroll_${location.pathname}`);
      if (lastScroll) {
        window.scrollTo(0, parseInt(lastScroll, 10));
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  // Save scroll position on unload and route change
  useEffect(() => {
    const saveScroll = () => {
      localStorage.setItem(`scroll_${location.pathname}`, window.scrollY);
    };
    window.addEventListener("beforeunload", saveScroll);
    window.addEventListener("pagehide", saveScroll);
    return () => {
      saveScroll();
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("pagehide", saveScroll);
    };
  }, [location]);
  return null;
}

const AppRouter = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Patch header nav buttons to navigate
  useEffect(() => {
    const header = document.querySelector(".header-content");
    if (!header) return;
    const btns = Array.from(header.querySelectorAll("button"));
    btns.forEach(btn => {
      const text = btn.textContent.trim().toUpperCase();
      let path = null;
      if (text === "HOME") path = "/";
      else if (text === "ABOUT US") path = "/about";
      else if (text === "SHOP") path = "/shop";
      else if (text === "CONTACT") path = "/contact";
      // FRESH STOCKS and others: do nothing
      if (path) {
        btn.onclick = e => {
          e.preventDefault();
          if (location.pathname !== path) navigate(path);
        };
        btn.style.cursor = "pointer";
      }
    });
    // Cleanup: remove handlers on unmount
    return () => {
      btns.forEach(btn => {
        btn.onclick = null;
      });
    };
  }, [navigate, location]);

  useEffect(() => {
    setShowLoader(true);
    // On every route change, check if first visit
    const isFirstVisit = !localStorage.getItem("hasVisited");
    setShouldRestoreScroll(!isFirstVisit);
  }, [location]);

  const handleLoaderFinish = () => {
    localStorage.setItem("hasVisited", "true");
    setShowLoader(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <>
      <Header />
      {showLoader && <Loader onFinish={handleLoaderFinish} />}
      {!showLoader && (
        <>
          <AnimationController />
          <ScrollRestorer />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optionally add a fallback route here */}
          </Routes>
          <audio ref={audioRef} src={jazzCafeMusic} loop />
          <AudioControl audioRef={audioRef} />
          <SearchButton />
        </>
      )}
    </>
  );
};

const AppRouterWrapper = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default AppRouterWrapper; 