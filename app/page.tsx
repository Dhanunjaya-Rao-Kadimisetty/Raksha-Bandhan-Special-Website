"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Landing
import LandingScreen from "@/components/landing/LandingScreen";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import GallerySection from "@/components/sections/GallerySection";
import LetterSection from "@/components/sections/LetterSection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import PromisesSection from "@/components/sections/PromisesSection";
import CountdownSection from "@/components/sections/CountdownSection";
import SurpriseSection from "@/components/sections/SurpriseSection";
import FinalSection from "@/components/sections/FinalSection";

// UI
import FloatingParticles from "@/components/ui/FloatingParticles";
import FloatingHearts from "@/components/ui/FloatingHearts";
import FloatingPetals from "@/components/ui/FloatingPetals";

// Lazy-load heavy components
const GlowCursor = dynamic(() => import("@/components/ui/GlowCursor"), { ssr: false });
const MusicPlayer = dynamic(() => import("@/components/sections/MusicPlayer"), { ssr: false });

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => setShowContent(true), 1200);
  };

  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      {/* Custom cursor (desktop only) */}
      {isDesktop && <GlowCursor />}

      {/* Ambient background effects — always visible */}
      <FloatingParticles />
      {showContent && (
        <>
          <FloatingHearts />
          <FloatingPetals />
        </>
      )}

      {/* Landing gate */}
      <AnimatePresence>
        {!entered && (
          <LandingScreen onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Navigation dots */}
            <NavDots />

            {/* All sections */}
            <HeroSection />
            <TimelineSection />
            <GallerySection />
            <LetterSection />
            <PromisesSection />
            <ReasonsSection />
            <CountdownSection />
            <SurpriseSection />
            <FinalSection />

            {/* Floating music player */}
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Minimal side nav dots
const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Memories" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "promises", label: "Promises" },
  { id: "reasons", label: "Reasons" },
  { id: "countdown", label: "Wait" },
  { id: "surprise", label: "Surprise" },
  { id: "final", label: "Finale" },
];

function NavDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 hidden md:flex">
      {NAV_SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          data-hover
          className="group flex items-center gap-2 justify-end"
        >
          <span className="font-inter text-xs text-white/0 group-hover:text-white/60 transition-all duration-300 pr-1">
            {label}
          </span>
          <motion.div
            className="rounded-full transition-all duration-300 flex-shrink-0"
            animate={{
              width: active === id ? 16 : 6,
              height: active === id ? 6 : 6,
              backgroundColor: active === id ? "#FFD166" : "rgba(255,255,255,0.25)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
