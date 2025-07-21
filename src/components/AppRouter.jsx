import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";
import AnimationController from "./AnimationController";
import AudioControl from "./AudioControl";
import SearchButton from "./SearchButton";
import jazzCafeMusic from "../assets/music/jazz-cafe-background-music-318776.mp3";
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ShopPage from '../pages/ShopPage';
import ContactPage from '../pages/ContactPage';

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

const NAV_MAP = {
  "HOME": "/",
  "ABOUT US": "/about",
  "SHOP": "/shop",
  "CONTACT": "/contact"
};

function patchHeaderNav(navigate, location) {
  const header = document.querySelectorAll(".header-content");
  if (!header.length) return;
  // Find all nav-btn buttons in all header-content blocks
  const btns = Array.from(document.querySelectorAll(".header-content .nav-btn"));
  btns.forEach(btn => {
    const text = btn.textContent.trim().toUpperCase();
    const path = NAV_MAP[text];
    if (path) {
      btn.onclick = e => {
        e.preventDefault();
        if (location.pathname !== path) navigate(path);
      };
      btn.style.cursor = "pointer";
    }
  });
}

const AppRouter = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Patch header nav buttons to navigate, robust to layout changes
  useEffect(() => {
    patchHeaderNav(navigate, location);
    // Observe header for DOM changes and re-patch if needed
    const header = document.querySelector(".sticky-header");
    if (!header) return;
    const observer = new MutationObserver(() => {
      patchHeaderNav(navigate, location);
    });
    observer.observe(header, { childList: true, subtree: true });
    return () => observer.disconnect();
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
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
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