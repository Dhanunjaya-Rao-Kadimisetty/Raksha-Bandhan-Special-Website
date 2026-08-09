"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💛", "💖", "💕", "🌸", "✨"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }));
    setHearts(initial);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            animation: `heartFloat ${heart.duration}s ease-in ${heart.delay}s infinite`,
            opacity: 0.4,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
