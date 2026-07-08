import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

// "French Accordion Vibe" by YuraSoop — Pixabay License — free for commercial use, no attribution required
const MUSIC_URL = '/music.mp3';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
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
