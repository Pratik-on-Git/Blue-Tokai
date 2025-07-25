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
import ProductDetail from '../pages/ProductDetail';
import EquipmentsPage from '../pages/EquipmentsPage';

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

const AppRouter = () => {
  const [showLoader, setShowLoader] = useState(true);
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingLocation, setPendingLocation] = useState(null);

  // Show loader on every route change
  useEffect(() => {
    if (showLoader) return; // Don't re-show if already showing
    setShowLoader(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLoaderFinish = () => {
    localStorage.setItem("hasVisited", "true");
    setShowLoader(false);
    setTimeout(() => {
      if (window.ScrollTrigger && window.ScrollTrigger.refresh) {
        window.ScrollTrigger.refresh(true);
      }
      if (window._lenis && window._lenis.start) {
        window._lenis.start();
      }
    }, 120);
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
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/equipments" element={<EquipmentsPage />} />
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