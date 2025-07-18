import './App.css'
import MainPage from './components/MainPage'
import AnimationController from './components/AnimationController'
import Header from './components/Header'
import React, { useRef, useEffect, useState } from 'react';
import jazzCafeMusic from './assets/music/jazz-cafe-background-music-318776.mp3';
import AudioControl from './components/AudioControl';
import Loader from './components/Loader';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false);
  const audioRef = useRef(null);

  // On mount, check if first visit
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('hasVisited');
    setShouldRestoreScroll(!isFirstVisit);
  }, []);

  // Save scroll position on unload
  useEffect(() => {
    const saveScroll = () => {
      localStorage.setItem('lastScrollY', window.scrollY);
    };
    window.addEventListener('beforeunload', saveScroll);
    return () => window.removeEventListener('beforeunload', saveScroll);
  }, []);

  // Handler for when loader finishes
  const handleLoaderFinish = () => {
    // Mark as not first visit
    localStorage.setItem('hasVisited', 'true');
    setShowLoader(false);
    // Restore scroll if not first visit
    if (shouldRestoreScroll) {
      const scrollY = parseInt(localStorage.getItem('lastScrollY') || '0', 10);
      window.scrollTo(0, scrollY);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      // Do not auto-play, let user control
    }
  }, []);

  return (
    <>
      {showLoader && <Loader onFinish={handleLoaderFinish} />}
      {!showLoader && (
        <>
          <Header />
          <AnimationController />
          <MainPage />
          <audio ref={audioRef} src={jazzCafeMusic} loop />
          <AudioControl audioRef={audioRef} />
        </>
      )}
    </>
  )
}

export default App
