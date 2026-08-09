"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "rgba(255,209,102,",
  "rgba(255,107,157,",
  "rgba(124,92,255,",
  "rgba(255,228,160,",
];

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const maxLife = 200 + Math.random() * 300;
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.3 + Math.random() * 0.8),
        alpha: 0,
        size: 1 + Math.random() * 2.5,
        color,
        life: 0,
        maxLife,
      });
    };

    let spawnTimer = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer % 4 === 0 && particles.current.length < 120) {
        spawn();
      }

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        if (progress < 0.2) p.alpha = progress / 0.2;
        else if (progress > 0.8) p.alpha = (1 - progress) / 0.2;
        else p.alpha = 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.alpha * 0.7).toFixed(2)})`;
        ctx.fill();

        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.alpha * 0.15).toFixed(2)})`;
        ctx.fill();

        return p.life < p.maxLife;
      });

      animFrame.current = requestAnimationFrame(draw);
    };

    animFrame.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
