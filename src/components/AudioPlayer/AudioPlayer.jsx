import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

const MUSIC_URL = 'https://archive.org/download/paris-cafe-ambience-with-french-music-for-a-good-mood-for-relax-instrumental-jazz/Paris%20Cafe%20Ambience%20with%20French%20Music%20for%20a%20Good%20Mood%20%E2%98%95%EF%B8%8F%20%20For%20Relax%20%EF%BD%9C%20Instrumental%20Jazz.mp3';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {});
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    if (!hasInteracted) setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <button
      className={`audio-player-btn ${isPlaying ? 'playing' : ''}`}
      onClick={toggle}
      aria-label={isPlaying ? 'השהה מוסיקה' : 'הפעל מוסיקה'}
      title={isPlaying ? 'השהה מוסיקה' : 'הפעל מוסיקה'}
    >
      <span className="audio-icon">{isPlaying ? '🎵' : '🔇'}</span>
      {!hasInteracted && <span className="audio-pulse" />}
    </button>
  );
}

export default AudioPlayer;
