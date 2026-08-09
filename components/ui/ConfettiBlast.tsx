"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiBlastProps {
  trigger: boolean;
}

export default function ConfettiBlast({ trigger }: ConfettiBlastProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (!trigger || fired.current) return;
    fired.current = true;

    const gold = "#FFD166";
    const pink = "#FF6B9D";
    const purple = "#7C5CFF";
    const cream = "#FAFAFA";

    // Center burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors: [gold, pink, purple, cream],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
      shapes: ["circle", "square"],
    });

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: [gold, pink, purple],
        ticks: 180,
      });
    }, 200);

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: [gold, pink, purple],
        ticks: 180,
      });
    }, 400);

    // Hearts rain
    setTimeout(() => {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
      const star = confetti.shapeFromText({ text: "✨", scalar: 2 });
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        shapes: [heart, star],
        scalar: 2,
        ticks: 250,
        gravity: 0.5,
      });
    }, 600);

    return () => {
      fired.current = false;
    };
  }, [trigger]);

  return null;
}
