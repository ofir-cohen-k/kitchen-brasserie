import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

// "French Accordion Vibe" by YuraSoop — Pixabay License — free for commercial use, no attribution required
const MUSIC_URL = '/music.mp3';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    audio.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {});
    return () => {
      audio.pause();
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
