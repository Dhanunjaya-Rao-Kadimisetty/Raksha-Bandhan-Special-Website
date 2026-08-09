"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingScreenProps {
  onEnter: () => void;
}

const TYPEWRITER_LINES = [
  "Some relationships don't need promises...",
  "They simply stay forever.",
];

export default function LandingScreen({ onEnter }: LandingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "typing" | "reveal" | "cta">("loading");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showReveal, setShowReveal] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Loading bar
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("typing"), 300);
      }
      setLoadProgress(p);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Typewriter line 1
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const t = setInterval(() => {
      setLine1(TYPEWRITER_LINES[0].slice(0, i + 1));
      i++;
      if (i >= TYPEWRITER_LINES[0].length) {
        clearInterval(t);
        setTimeout(() => typeLine2(), 400);
      }
    }, 45);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const typeLine2 = () => {
    let i = 0;
    const t = setInterval(() => {
      setLine2(TYPEWRITER_LINES[1].slice(0, i + 1));
      i++;
      if (i >= TYPEWRITER_LINES[1].length) {
        clearInterval(t);
        setTimeout(() => { setShowReveal(true); }, 600);
        setTimeout(() => { setShowCta(true); }, 1400);
      }
    }, 55);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#09090B" }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(20px)",
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,209,102,0.06) 0%, transparent 60%)", filter: "blur(60px)" }}
      />

      {/* Stars */}
      <Stars />

      {/* Loading Phase */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="text-center"
            exit={{ opacity: 0, y: -30, transition: { duration: 0.5 } }}
          >
            <motion.p
              className="font-poppins text-sm tracking-[0.3em] text-gold/60 mb-8 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Preparing your surprise...
            </motion.p>
            <div className="w-64 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full loading-bar rounded-full"
                style={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.p
              className="font-inter text-xs text-white/30 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(loadProgress)}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing Phase */}
      {phase === "typing" && (
        <div className="text-center px-6 max-w-2xl">
          <motion.p
            className="font-playfair text-2xl md:text-3xl lg:text-4xl text-cream/90 leading-relaxed min-h-[44px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {line1}
            {line1.length < TYPEWRITER_LINES[0].length && (
              <span className="inline-block w-0.5 h-7 bg-gold ml-1 animate-pulse" />
            )}
          </motion.p>

          {line2 && (
            <motion.p
              className="font-playfair text-2xl md:text-3xl lg:text-4xl mt-3 min-h-[44px]"
              style={{
                background: "linear-gradient(135deg, #FFD166, #FF6B9D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {line2}
              {line2.length < TYPEWRITER_LINES[1].length && (
                <span className="inline-block w-0.5 h-7 bg-gold ml-1 animate-pulse" style={{ WebkitTextFillColor: "#FFD166" }} />
              )}
            </motion.p>
          )}

          {/* Reveal: Raksha Bandhan title */}
          <AnimatePresence>
            {showReveal && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold animate-shimmer-text mb-2">
                  Happy Raksha Bandhan ❤️
                </p>
                <p className="font-inter text-lg md:text-xl text-white/60 mt-3 tracking-wide">
                  For{" "}
                  <span className="text-gold font-semibold">Bhargavi</span>
                  {", "}
                  <span className="text-pink font-semibold">Akshara</span>
                  {", & "}
                  <span className="text-purple-light font-semibold">SriNayani</span>
                  {" "}— My Beautiful Sisters
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <AnimatePresence>
            {showCta && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  id="open-surprise-btn"
                  onClick={onEnter}
                  className="relative font-poppins font-semibold text-base md:text-lg px-10 py-4 rounded-full text-bg overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #FFD166, #FF6B9D)",
                    boxShadow: "0 0 40px rgba(255,209,102,0.4), 0 0 80px rgba(255,107,157,0.2)",
                  }}
                  whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(255,209,102,0.6), 0 0 100px rgba(255,107,157,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  data-hover
                >
                  <span className="relative z-10 flex items-center gap-2">
                    ✨ Open Your Surprise
                  </span>
                  {/* Shine sweep */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </motion.button>
                <p className="font-inter text-xs text-white/30 mt-4">
                  With love, Dhanunjaya 💛
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function Stars() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ left: string; top: string; width: string; height: string; opacity: number; animation: string }[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        opacity: Math.random() * 0.5 + 0.1,
        animation: `starTwinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
      }))
    );
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={s}
        />
      ))}
    </div>
  );
}
