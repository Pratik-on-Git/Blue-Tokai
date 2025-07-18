import './App.css'
import MainPage from './components/MainPage'
import AnimationController from './components/AnimationController'
import Header from './components/Header'
import React, { useRef, useEffect, useState } from 'react';
import jazzCafeMusic from './assets/music/jazz-cafe-background-music-318776.mp3';
import AudioControl from './components/AudioControl';
import Loader from './components/Loader';

function App() {
  const audioRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      // Do not auto-play, let user control
    }
  }, []);

  // Only render main app after loader is done
  if (!loaderDone) {
    return <Loader onDone={() => setLoaderDone(true)} />;
  }

  return (
    <>
      <Header />
      <AnimationController />
      <MainPage/>
      <audio ref={audioRef} src={jazzCafeMusic} loop />
      <AudioControl audioRef={audioRef} />
    </>
  )
}

export default App
