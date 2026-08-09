"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";

// Using a royalty-free ambient piano URL from a CDN
const MUSIC_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    const onCanPlay = () => setLoaded(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => audio.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!visible) return null;

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="glass-gold rounded-2xl px-4 py-3 flex items-center gap-3 shadow-gold"
          style={{ minWidth: "200px" }}
        >
          {/* Pulse ring */}
          {playing && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ border: "2px solid rgba(255,209,102,0.4)" }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #FFD166, #FF6B9D)" }}
          >
            <Music size={16} className="text-bg" />
          </div>

          {/* Text + waveform */}
          <div className="flex-1 min-w-0">
            <p className="font-poppins text-xs font-semibold text-gold leading-none mb-1">
              🎵 For My Sisters
            </p>
            {playing ? (
              <div className={`music-waveform ${!playing ? "paused" : ""}`}>
                <span /><span /><span /><span /><span /><span />
              </div>
            ) : (
              <p className="font-inter text-xs text-white/40">
                {loaded ? "Ready to play" : "Loading..."}
              </p>
            )}
          </div>

          {/* Play/Pause */}
          <motion.button
            id="music-toggle-btn"
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 glass border border-gold/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-hover
          >
            {playing ? (
              <Pause size={14} className="text-gold" />
            ) : (
              <Play size={14} className="text-gold ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/10 text-white/40 hover:text-white flex items-center justify-center text-xs"
          data-hover
        >
          ×
        </button>
      </motion.div>
    </>
  );
}
