import React, { useState } from 'react';

const AudioControl = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="audio-control-container" style={styles.container}>
        {isPlaying ? (
          <button style={styles.button} onClick={handlePause}>❚❚ PAUSE MUSIC</button>
        ) : (
          <button style={styles.button} onClick={handlePlay}>▶ PLAY MUSIC</button>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '3px',
    padding: '2px 9px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  button: {
    color: '#fff',
    background: 'none',
    border: 'none',
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontWeight: 400,
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%'
  }
};

export default AudioControl; 