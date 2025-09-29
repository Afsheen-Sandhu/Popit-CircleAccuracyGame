// src/lib/constants.ts
export const COLORS = [
  "#000000", // black
  "#1a1a1a", // dark gray
  "#ff0000", // red
  "#00ff00", // green
  "#0000ff", // blue
  "#ffff00", // yellow
  "#ffa500", // orange
  "#008080"  // teal
];

export const getRandomColor = (colors: string[] = COLORS) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomPosition = (offset: number = 100) => {
  if (typeof window !== "undefined") {
    return {
      x: Math.random() * (window.innerWidth - offset),
      y: Math.random() * (window.innerHeight - offset)
    };
  }
  return { x: 0, y: 0 };
};

export const getRandomSize = (min: number = 20, max: number = 100) => {
  return min + Math.random() * (max - min);
};
