"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

function Stars() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ left: string; top: string; width: string; height: string; opacity: number; animation: string }[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 100 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${1 + Math.random() * 2.5}px`,
        height: `${1 + Math.random() * 2.5}px`,
        opacity: Math.random() * 0.4 + 0.05,
        animation: `starTwinkle ${2 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite`,
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

export default function FinalSection() {
  return (
    <section id="final" className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden">
      {/* Star field */}
      <Stars />

      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.06) 0%, rgba(124,92,255,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(255,107,157,0.06) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Decorative top ornament */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/30" />
            <span className="text-gold text-3xl">✦</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>

          {/* Main quote */}
          <motion.blockquote
            variants={fadeUp}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8"
          >
            <span className="text-gold/40 text-6xl md:text-8xl leading-none font-playfair">&ldquo;</span>
            <br />
            <span className="text-cream">Sisters are different flowers</span>
            <br />
            <span className="text-gold-gradient">from the same garden.</span>
            <br />
            <span className="text-gold/40 text-6xl md:text-8xl leading-none font-playfair">&rdquo;</span>
          </motion.blockquote>

          {/* Divider */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 my-12">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-3xl animate-float-y">🌸</span>
            <span className="text-3xl animate-float-y" style={{ animationDelay: "0.5s" }}>💛</span>
            <span className="text-3xl animate-float-y" style={{ animationDelay: "1s" }}>🌸</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          {/* Dedication */}
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="font-inter text-base md:text-lg text-white/50">
              Made with endless love for
            </p>
            <p className="font-playfair text-3xl md:text-4xl font-bold flex flex-wrap justify-center items-center gap-y-2">
              <span className="text-gold">Bhargavi</span>
              <span className="text-white/40 mx-2">,</span>
              <span className="text-pink">Akshara</span>
              <span className="text-white/40 mx-2">&</span>
              <span className="text-purple-light">SriNayani</span>
            </p>
            <p className="font-inter text-sm text-white/30 mt-4">
              — Your Brother
            </p>
            <p className="font-playfair text-2xl md:text-3xl font-bold animate-shimmer-text">
              Dhanunjaya ❤️
            </p>
          </motion.div>

          {/* Year badge */}
          <motion.div
            variants={fadeUp}
            className="mt-16 inline-flex items-center gap-3 glass-gold px-6 py-3 rounded-full"
          >
            <span className="font-poppins text-sm text-gold/80 tracking-widest uppercase">Raksha Bandhan 2026</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 mt-24 w-full text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        <p className="font-inter text-xs text-white/25 tracking-widest uppercase">
          Crafted with ❤️ for the most beautiful souls
        </p>
        <div className="flex justify-center gap-3 mt-4">
          {["💛", "🌸", "❤️", "✨", "💛"].map((e, i) => (
            <motion.span
              key={i}
              className="text-lg opacity-30"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </motion.footer>
    </section>
  );
}
