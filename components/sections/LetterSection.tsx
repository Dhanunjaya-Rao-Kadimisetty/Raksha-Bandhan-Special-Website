"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, letterReveal } from "@/lib/animations";

const LETTER_LINES = [
  { text: "Dear Bhargavi, Akshara & SriNayani,", type: "salutation" },
  { text: "", type: "space" },
  { text: "No matter how much we argue,", type: "body" },
  { text: "you've all been my greatest blessings.", type: "body" },
  { text: "", type: "space" },
  { text: "Thank you for protecting me,", type: "body" },
  { text: "supporting me,", type: "body" },
  { text: "and believing in me.", type: "body" },
  { text: "", type: "space" },
  { text: "Life keeps changing,", type: "body" },
  { text: "but one thing never will —", type: "body" },
  { text: "", type: "space" },
  { text: "You'll always be my first best friends.", type: "highlight" },
  { text: "", type: "space" },
  { text: "We may be sisters from another mother,", type: "body" },
  { text: "but our bond feels like we've been together since childhood.", type: "body" },
  { text: "Bhargavi — your wisdom and strength guide me.", type: "body" },
  { text: "Akshara — your laughter lights up every room.", type: "body" },
  { text: "SriNayani — your presence brings so much comfort and joy.", type: "body" },
  { text: "", type: "space" },
  { text: "Happy Raksha Bandhan.", type: "closing" },
  { text: "I love you all forever.", type: "closing" },
  { text: "", type: "space" },
  { text: "— Your Brother, Dhanunjaya ❤️", type: "signature" },
];

export default function LetterSection() {
  return (
    <section id="letter" className="relative section-padding overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="font-poppins text-sm tracking-[0.3em] text-gold/70 uppercase mb-4">
            From the Heart
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            A Letter From{" "}
            <span className="text-gold-gradient">Your Brother</span>{" "}
            <span className="text-2xl">❤️</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-8 md:p-12 lg:p-16"
          style={{
            background: "rgba(255,209,102,0.04)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255,209,102,0.2)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Wax seal top */}
          <div className="flex justify-center mb-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl animate-glow-pulse"
              style={{
                background: "linear-gradient(135deg, #FFD166, #FF6B9D)",
                boxShadow: "0 0 30px rgba(255,209,102,0.4)",
              }}
            >
              ❤️
            </div>
          </div>

          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-t-3xl" />

          {/* Letter text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-0"
          >
            {LETTER_LINES.map((line, i) => {
              if (line.type === "space") {
                return <div key={i} className="h-5" />;
              }

              let className = "font-inter text-base md:text-lg leading-relaxed";
              if (line.type === "salutation") {
                className = "font-playfair text-xl md:text-2xl text-gold font-bold mb-2";
              } else if (line.type === "highlight") {
                className = "font-playfair text-xl md:text-2xl text-gold-gradient font-bold italic";
              } else if (line.type === "closing") {
                className = "font-playfair text-lg md:text-xl text-cream/90 italic";
              } else if (line.type === "signature") {
                className = "font-playfair text-lg md:text-xl font-bold mt-4 animate-shimmer-text";
              } else {
                className = "font-inter text-base md:text-lg text-white/70 leading-relaxed";
              }

              return (
                <motion.p key={i} variants={letterReveal} className={className}>
                  {line.text}
                </motion.p>
              );
            })}
          </motion.div>

          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-b-3xl" />

          {/* Corner ornaments */}
          <div className="absolute top-6 left-6 text-gold/20 text-3xl font-playfair">&ldquo;</div>
          <div className="absolute bottom-6 right-6 text-gold/20 text-3xl font-playfair">&rdquo;</div>
        </motion.div>
      </div>
    </section>
  );
}
