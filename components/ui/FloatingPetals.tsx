"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

const PETAL_COLORS = [
  "#FFD166",
  "#FF6B9D",
  "#FFB3CC",
  "#FFE4A0",
  "#FF8FAB",
  "#FFC8DD",
];

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const ps: Petal[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 10,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 8,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      rotation: Math.random() * 360,
    }));
    setPetals(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            backgroundColor: petal.color,
            borderRadius: "50% 0 50% 0",
            opacity: 0.35,
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
