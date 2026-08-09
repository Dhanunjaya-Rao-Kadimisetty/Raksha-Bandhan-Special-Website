declare module "canvas-confetti" {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: Shape[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    useWorker?: boolean;
  }

  type Shape = "circle" | "square" | "star" | { type: string };

  interface CreateTypes {
    (options?: Options): Promise<null> | null;
    reset: () => void;
    shapeFromText: (opts: { text: string; scalar?: number }) => Shape;
  }

  const confetti: CreateTypes & {
    shapeFromText: (opts: { text: string; scalar?: number }) => Shape;
  };

  export = confetti;
}
