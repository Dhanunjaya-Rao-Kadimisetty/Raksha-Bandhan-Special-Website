"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const PROMISES = [
  {
    id: 1,
    title: "A Safe Space",
    text: "I promise to always be your safe space—someone who will listen to you without judging, no matter what.",
    icon: "🕊️",
    color: "gold",
  },
  {
    id: 2,
    title: "Endless Prayers",
    text: "I promise to always pray for your happiness. When you smile, I will smile. Your joy is my joy.",
    icon: "🙏",
    color: "pink",
  },
  {
    id: 3,
    title: "Forever Respect",
    text: "I promise that no matter where life takes us, my respect and unconditional love for you three will never fade.",
    icon: "💫",
    color: "purple",
  },
];

const COLOR_MAP: Record<string, { border: string; glow: string; text: string }> = {
  gold: { border: "rgba(255,209,102,0.3)", glow: "rgba(255,209,102,0.1)", text: "#FFD166" },
  pink: { border: "rgba(255,107,157,0.3)", glow: "rgba(255,107,157,0.1)", text: "#FF6B9D" },
  purple: { border: "rgba(124,92,255,0.3)", glow: "rgba(124,92,255,0.1)", text: "#7C5CFF" },
};

export default function PromisesSection() {
  return (
    <section id="promises" className="relative section-padding overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="font-poppins text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            My Vows To You
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            A Brother&apos;s{" "}
            <span className="text-gold-gradient">Promises</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-base text-white/50 max-w-xl mx-auto">
            I may not have much right now, but what I do have is a heart full of love and respect for you three. These are my lifelong promises.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PROMISES.map((promise, i) => {
            const colors = COLOR_MAP[promise.color];
            return (
              <motion.div
                key={promise.id}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative glass rounded-3xl p-8 overflow-hidden group transition-all duration-300"
                style={{ border: `1px solid ${colors.border}` }}
              >
                {/* Glow Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${colors.glow} 0%, transparent 80%)` }}
                />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{promise.icon}</div>
                  <h3 className="font-playfair text-2xl font-bold mb-4" style={{ color: colors.text }}>
                    {promise.title}
                  </h3>
                  <p className="font-inter text-sm md:text-base text-white/70 leading-relaxed font-light italic">
                    &ldquo;{promise.text}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
