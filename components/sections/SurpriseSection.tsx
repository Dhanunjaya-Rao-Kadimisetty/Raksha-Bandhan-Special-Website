"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ConfettiBlast = dynamic(() => import("@/components/ui/ConfettiBlast"), { ssr: false });

export default function SurpriseSection() {
  const [revealed, setRevealed] = useState(false);
  const [confettiFired, setConfettiFired] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    setConfettiFired(true);
  };

  return (
    <section id="surprise" className="relative section-padding overflow-hidden">
      <ConfettiBlast trigger={confettiFired} />

      {/* Dynamic background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={revealed ? {
          background: [
            "radial-gradient(ellipse at center, rgba(124,92,255,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse at center, rgba(255,209,102,0.18) 0%, transparent 60%)",
            "radial-gradient(ellipse at center, rgba(255,107,157,0.15) 0%, transparent 60%)",
            "radial-gradient(ellipse at center, rgba(124,92,255,0.12) 0%, transparent 65%)",
          ]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="font-poppins text-sm tracking-[0.3em] text-purple/70 uppercase mb-4"
          >
            Wait, There&apos;s More
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6"
          >
            I Have One{" "}
            <span className="text-purple-gradient">More Surprise</span>
          </motion.h2>
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple/40" />
            <span className="text-purple text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple/40" />
          </motion.div>
        </motion.div>

        {/* CTA Button or Reveal */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                id="surprise-reveal-btn"
                onClick={handleReveal}
                className="relative font-poppins font-semibold text-lg px-12 py-5 rounded-full text-cream overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #7C5CFF, #FF6B9D)",
                  boxShadow: "0 0 50px rgba(124,92,255,0.5)",
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 80px rgba(124,92,255,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles size={20} />
                  Click for Your Surprise ✨
                  <Sparkles size={20} />
                </span>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              </motion.button>

              {/* Pulsing rings */}
              <div className="relative flex justify-center mt-8">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{ border: "1px solid rgba(124,92,255,0.3)", width: 80 + i * 40, height: 80 + i * 40 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative glass rounded-3xl p-10 md:p-16 max-w-2xl mx-auto"
              style={{ border: "1px solid rgba(255,209,102,0.3)", boxShadow: "0 0 80px rgba(255,209,102,0.2)" }}
            >
              {/* Sparkle decorations */}
              {["✨", "💛", "🌸", "❤️", "✨"].map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${[10, 5, 85, 90, 15][i]}%`,
                    left: `${[5, 88, 8, 85, 50][i]}%`,
                  }}
                  animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                >
                  {s}
                </motion.span>
              ))}

              <div className="text-center space-y-6">
                <motion.p
                  className="font-playfair text-2xl md:text-3xl text-cream/90 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  No matter where life takes us...
                </motion.p>
                <motion.p
                  className="font-playfair text-3xl md:text-4xl font-bold text-gold-gradient leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  You&apos;ll always be my favourite people.
                </motion.p>
                <motion.p
                  className="font-inter text-base text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Bhargavi. Akshara. SriNayani. My heart, always.
                </motion.p>
                <motion.p
                  className="font-playfair text-2xl md:text-3xl font-bold animate-shimmer-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Happy Raksha Bandhan ❤️
                </motion.p>

                {/* Hearts explosion */}
                <motion.div
                  className="flex justify-center gap-3 text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  {["💛", "❤️", "🌸", "❤️", "💛"].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -15, 0], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
