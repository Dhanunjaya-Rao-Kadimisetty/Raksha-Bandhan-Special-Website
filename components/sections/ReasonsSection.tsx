"use client";

import { motion } from "framer-motion";
import { REASONS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

const COLOR_STYLES: Record<string, { border: string; shadow: string; badge: string; text: string }> = {
  pink: {
    border: "rgba(255,107,157,0.25)",
    shadow: "rgba(255,107,157,0.3)",
    badge: "rgba(255,107,157,0.12)",
    text: "#FF6B9D",
  },
  gold: {
    border: "rgba(255,209,102,0.25)",
    shadow: "rgba(255,209,102,0.3)",
    badge: "rgba(255,209,102,0.12)",
    text: "#FFD166",
  },
  purple: {
    border: "rgba(124,92,255,0.25)",
    shadow: "rgba(124,92,255,0.3)",
    badge: "rgba(124,92,255,0.12)",
    text: "#7C5CFF",
  },
};

export default function ReasonsSection() {
  return (
    <section id="reasons" className="relative section-padding overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute left-0 top-1/2 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute right-0 bottom-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="font-poppins text-sm tracking-[0.3em] text-pink/70 uppercase mb-4">
            Why You&apos;re My World
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Reasons You&apos;re{" "}
            <span className="text-purple-gradient">Amazing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-base text-white/50 max-w-md mx-auto">
            There aren&apos;t enough words, but here are a few
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink/40" />
            <span className="text-pink text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink/40" />
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {REASONS.map((reason, i) => {
            const colors = COLOR_STYLES[reason.color] || COLOR_STYLES.gold;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: `0 20px 60px ${colors.shadow}, 0 0 40px ${colors.shadow}`,
                }}
                className="relative glass rounded-3xl p-8 group cursor-default transition-all duration-500 overflow-hidden"
                style={{ border: `1px solid ${colors.border}` }}
                data-hover
              >
                {/* Hover glow background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${colors.badge} 0%, transparent 70%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${colors.text}, transparent)` }}
                />

                <div className="relative z-10">
                  {/* Emoji */}
                  <motion.div
                    className="text-5xl mb-5 inline-block"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {reason.emoji}
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="font-playfair text-xl font-bold mb-3"
                    style={{ color: colors.text }}
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm text-white/60 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Number badge */}
                  <div
                    className="mt-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-poppins font-bold"
                    style={{ background: colors.badge, color: colors.text }}
                  >
                    {reason.id}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
