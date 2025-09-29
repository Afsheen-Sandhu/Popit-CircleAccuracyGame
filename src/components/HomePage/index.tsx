// src/components/HomePage/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import Circle from "../Circle";
import CircleGame from "../CircleGame";
import { COLORS, getRandomColor, getRandomPosition, getRandomSize } from "../../lib/constants";



const HomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [decorativeCircles, setDecorativeCircles] = useState<{ id: number; x: number; y: number; size: number; color: string; }[]>([]);

  const handleStart = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    const circles = Array.from({ length: 15 }, (_, i) => ({
      id: -(i + 1),
      ...getRandomPosition(100),
      size: getRandomSize(20, 100),
      color: getRandomColor() + "40",
    }));
    setDecorativeCircles(circles);
  }, []);

  if (gameStarted) {
    return <CircleGame />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Decorative circles */}
      {decorativeCircles.map((circle) => (
        <Circle
          key={circle.id}
          id={circle.id}
          x={circle.x}
          y={circle.y}
          size={circle.size}
          color={circle.color}
          className="opacity-90 blur-[1px]"
        />
      ))}
      
      <div className="text-center space-y-8 p-8 z-10">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Popit</h1>
        <p className="text-2xl text-white/90 max-w-2xl">
          Popit is a simple tool to help you manage your popcorn.
        </p>
        <div className="text-lg text-white/80 space-y-2">
          <p>Start Your Popping</p>
        </div>
        <div className="mt-4 p-4 rounded-lg backdrop-blur-sm">
          <Button
            className="px-8 py-4"
            size={"lg"}
            variant={"default"}
            onClick={handleStart}
          >
            Start
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;