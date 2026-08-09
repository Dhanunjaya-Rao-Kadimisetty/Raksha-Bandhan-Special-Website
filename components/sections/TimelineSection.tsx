"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE_MONTHS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

const COLOR_MAP: Record<string, { border: string; glow: string; text: string; badge: string }> = {
  gold: {
    border: "rgba(255,209,102,0.3)",
    glow: "rgba(255,209,102,0.15)",
    text: "#FFD166",
    badge: "rgba(255,209,102,0.15)",
  },
  pink: {
    border: "rgba(255,107,157,0.3)",
    glow: "rgba(255,107,157,0.15)",
    text: "#FF6B9D",
    badge: "rgba(255,107,157,0.15)",
  },
  purple: {
    border: "rgba(124,92,255,0.3)",
    glow: "rgba(124,92,255,0.15)",
    text: "#7C5CFF",
    badge: "rgba(124,92,255,0.15)",
  },
};

export default function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="timeline" className="relative section-padding overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,92,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-poppins text-sm tracking-[0.3em] text-gold/70 uppercase mb-4"
          >
            Our Beautiful Memories
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6"
          >
            A Year Full of{" "}
            <span className="text-gold-gradient">Love</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-inter text-base md:text-lg text-white/50 max-w-xl mx-auto"
          >
            Every month of 2026 painted a beautiful memory with Bhargavi and Akshara
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>
        </motion.div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-6 px-4 min-w-max">
            {/* Golden connecting line */}
            <div className="absolute hidden md:block" style={{ top: "calc(50% + 40px)" }}>
              <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full" />
            </div>

            {TIMELINE_MONTHS.map((item, i) => {
              const colors = COLOR_MAP[item.color] || COLOR_MAP.gold;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
                  className="glass rounded-3xl p-6 w-72 flex-shrink-0 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                  style={{
                    border: `1px solid ${activeCard === item.id ? colors.text : colors.border}`,
                    boxShadow: activeCard === item.id
                      ? `0 20px 60px ${colors.glow}, 0 0 40px ${colors.glow}`
                      : "none",
                  }}
                  data-hover
                >
                  {/* Background glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)` }}
                  />

                  {/* Special highlight for Raksha Bandhan card */}
                  {item.isSpecial && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-pink to-purple rounded-t-3xl" />
                  )}

                  <div className="relative z-10">
                    {/* Month badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-semibold tracking-wide mb-5"
                      style={{ background: colors.badge, color: colors.text }}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.shortMonth} 2026</span>
                    </div>

                    <h3
                      className="font-playfair text-xl font-bold mb-3"
                      style={{ color: colors.text }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm text-white/60 leading-relaxed min-h-[80px]">
                      {item.description}
                    </p>

                    {/* Number */}
                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className="font-poppins text-xs font-bold"
                        style={{ color: colors.text, opacity: 0.5 }}
                      >
                        0{item.id}
                      </span>
                      <div className="flex-1 h-px" style={{ background: colors.border }} />
                      {item.isSpecial && (
                        <span className="text-xs text-gold font-poppins font-semibold">✨ Special</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-inter text-xs text-white/30 mt-6 flex items-center justify-center gap-2"
        >
          <span>←</span> Scroll to explore memories <span>→</span>
        </motion.p>
      </div>
    </section>
  );
}
