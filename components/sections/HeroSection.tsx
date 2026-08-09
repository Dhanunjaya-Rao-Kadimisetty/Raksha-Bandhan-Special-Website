"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center section-padding overflow-hidden"
    >
      {/* Parallax background glow */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,92,255,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,209,102,0.10) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Floating Rakhi SVG Illustration */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center mb-12"
        >
          <RakhiIllustration />
        </motion.div>

        {/* Sisters badge */}
        <motion.div variants={fadeUp} className="flex justify-center flex-wrap gap-3 mb-8">
          <span className="glass-gold px-5 py-2 rounded-full font-poppins text-sm font-semibold text-gold tracking-wide">
            Bhargavi
          </span>
          <span className="glass-pink px-5 py-2 rounded-full font-poppins text-sm font-semibold text-pink tracking-wide">
            Akshara
          </span>
          <span className="px-5 py-2 rounded-full font-poppins text-sm font-semibold text-purple-light tracking-wide" style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.2)" }}>
            SriNayani
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
        >
          To the World&apos;s{" "}
          <span className="text-gold-gradient">Best Sisters</span>{" "}
          <span className="animate-heart-beat inline-block">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-inter text-lg md:text-xl lg:text-2xl text-cream/70 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          You&apos;ve always protected me with your love,
          <br />
          your care, and your endless support.
          <br />
          <span className="text-gold/80 font-medium">
            — From your brother, Dhanunjaya
          </span>
        </motion.p>

        {/* Divider with hearts */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-2xl">💛</span>
          <span className="text-2xl">🌸</span>
          <span className="text-2xl">💛</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <p className="font-inter text-xs tracking-[0.2em] text-white/30 uppercase">
            Scroll to explore
          </p>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RakhiIllustration() {
  return (
    <motion.div
      className="relative w-40 h-40 md:w-52 md:h-52"
      animate={{
        rotate: [-5, 5, -5],
        y: [0, -12, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow behind rakhi */}
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        {/* Thread */}
        <ellipse cx="100" cy="170" rx="80" ry="8" fill="none" stroke="#FFD166" strokeWidth="4" strokeDasharray="8,4" opacity="0.6" />
        {/* Main circle */}
        <circle cx="100" cy="100" r="55" fill="none" stroke="url(#goldGrad)" strokeWidth="4" />
        <circle cx="100" cy="100" r="48" fill="rgba(255,209,102,0.08)" stroke="rgba(255,209,102,0.3)" strokeWidth="1" />
        {/* Center jewel */}
        <circle cx="100" cy="100" r="18" fill="url(#goldGrad)" />
        <circle cx="100" cy="100" r="12" fill="rgba(255,107,157,0.8)" />
        <circle cx="96" cy="96" r="4" fill="rgba(255,255,255,0.6)" />
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx={100 + 35 * Math.cos((angle * Math.PI) / 180)}
            cy={100 + 35 * Math.sin((angle * Math.PI) / 180)}
            rx="10"
            ry="16"
            fill={i % 2 === 0 ? "url(#goldGrad)" : "url(#pinkGrad)"}
            transform={`rotate(${angle + 90} ${100 + 35 * Math.cos((angle * Math.PI) / 180)} ${100 + 35 * Math.sin((angle * Math.PI) / 180)})`}
            opacity="0.85"
          />
        ))}
        {/* Sparkles */}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => (
          <circle
            key={i}
            cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
            cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
            r="3"
            fill={i % 2 === 0 ? "#FFD166" : "#FF6B9D"}
            opacity="0.8"
          />
        ))}
        {/* Thread strings */}
        <path d="M 55 155 Q 100 170 145 155" fill="none" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        {/* Defs */}
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
          <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#FF8FAB" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
