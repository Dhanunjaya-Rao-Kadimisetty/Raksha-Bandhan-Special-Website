"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import dynamic from "next/dynamic";

const ConfettiBlast = dynamic(() => import("@/components/ui/ConfettiBlast"), { ssr: false });

const TARGET_DATE = new Date("2026-08-28T00:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setIsCompleted(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      const remaining = calculateTime();
      setTimeLeft(remaining);
      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <section id="countdown" className="relative section-padding overflow-hidden">
      <ConfettiBlast trigger={isCompleted} />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="font-poppins text-sm tracking-[0.3em] text-pink/70 uppercase mb-4">
            The Wait
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-10">
            Counting Down to <span className="text-pink">Raksha Bandhan</span>
          </motion.h2>

          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-wrap justify-center gap-4 md:gap-8"
              >
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="glass-pink w-20 h-24 md:w-28 md:h-32 rounded-2xl flex items-center justify-center mb-3 shadow-pink">
                      <span className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-widest tabular-nums">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-poppins text-xs md:text-sm text-pink/80 uppercase tracking-widest font-semibold">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-10 md:p-16 max-w-2xl mx-auto relative overflow-hidden"
                style={{ border: "1px solid rgba(255,107,157,0.4)", boxShadow: "0 0 60px rgba(255,107,157,0.2)" }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 border-[3px] border-pink/30 rounded-3xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <h3 className="font-playfair text-4xl md:text-5xl font-bold text-gold-gradient mb-6 leading-tight">
                  The Day is Finally Here!
                </h3>
                <p className="font-inter text-lg text-white/80 leading-relaxed mb-6">
                  Happy Raksha Bandhan to my beautiful sisters. My heart is full today and always. ❤️
                </p>
                <div className="flex justify-center gap-4 text-3xl">
                  <span>🌸</span>
                  <span>💛</span>
                  <span>🌸</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
