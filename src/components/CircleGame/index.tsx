"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import Circle from "../Circle";
import {
  getRandomColor,
  getRandomPosition,
  getRandomSize,
} from "@/lib/constants";
import ClickAccuracyChart from "../ClickAccuracyChart";
import { Button } from "../ui/button/button";

type GameCircle = {
  size: number;
  color: string;
  x: number;
  y: number;
};

export default function CircleGame() {
  const [circle, setCircle] = useState<GameCircle | null>(null);
  const [score, setScore] = useState(0);
  const [clickData, setClickData] = useState<
    { timestamp: number; accuracy: number }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStart, setGameStart] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [spawnedCircles, setSpawnedCircles] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const createNewCircle = useCallback(() => {
    if (gameOver) return;

    const newCircle: GameCircle = {
      ...getRandomPosition(150),
      size: getRandomSize(50, 100),
      color: getRandomColor(),
    };

    setCircle(newCircle);
    setSpawnedCircles((prev) => prev + 1);

    timeOutRef.current = setTimeout(() => {
      setCircle(null);
      createNewCircle();
    }, 5000);
  }, [gameOver]);

  useEffect(() => {
    if (!gameActive) return;
    createNewCircle();
  }, [gameActive, createNewCircle]);

  useEffect(() => {
    if (!gameActive) return;
    const gameTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setGameActive(false);
          setCircle(null);
          if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
          }
          clearInterval(gameTimer);
         
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameTimer);
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, [gameActive]);

  const handleClick = (
    clickedCircle: GameCircle,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    
    if (gameOver) return;
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickX = e.clientX;
    const clickY = e.clientY;
    const distance = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );
    const accuracy = Math.max(0, 100 - (distance / (rect.width / 2)) * 100);
  
    if (gameStart !== null) {
      const timestamp = Date.now() - gameStart;
      setClickData((prev) => {
        const updated = [...prev, { timestamp, accuracy }];
        console.log('clickData after click:', updated);
        return updated;
      });
    }
  
    toast.success(`🎯 Accuracy: ${accuracy.toFixed(1)}%`, { duration: 1500 });
  
    setCircle(null);
    setScore((prev) => prev + 1);
  
    if (!gameOver) {
      setTimeout(createNewCircle, 10); 
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const restartGame = () => {
    setCircle(null);
    setScore(0);
    setClickData([]);
    setTimeLeft(60);
    setGameStart(Date.now());
    setGameOver(false);
    setSpawnedCircles(0);
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    setGameActive(true);
    
  };

  useEffect(() => {
    
    setGameStart(Date.now());
    setGameActive(true);
  }, []);

  if (gameOver) {
    console.log('clickData at game over:', clickData);
  }
  return (
    <div className="relative w-screen h-screen backdrop-blur bg-gradient-to-br from-primary/85 to-secondary/85 overflow-hidden">
      <Toaster />
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="text-5xl font-bold text-info drop-shadow-lg">
          Score: {score}
        </div>
      </div>
      <div className="absolute top-5 left-5 z-10">
        <div
          className={`text-4xl font-semibold drop-shadow-lg ${
            timeLeft <= 10 ? "text-error animate-pulse" : "text-warning"
          }`}
        >
          Time: {formatTime(timeLeft)}
        </div>
      </div>
      <div className="absolute top-5 right-5 z-10">
        <div className="text-4xl font-semibold text-accent drop-shadow-lg ">
          Circles: {spawnedCircles}
        </div>
      </div>
      {gameOver && (
        <div className="absolute inset-0 bg-base/30 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-primary-content rounded-lg p-8 text-center shadow-2xl max-w-4xl w-full mx-4">
            <h2 className="text-4xl font-bold text-base-300 mb-4">
              Game Over!
            </h2>
            <p className="text-2xl text-base-100 mb-2">Final Score: {score}</p>
            <p className="text-lg text-base-200 mb-4">
              {spawnedCircles >= 31 ? "31 circles completed!" : "Time's Up!"}
            </p>
            <Button
              onClick={restartGame}
              variant={"secondary"}
              size={"lg"}
              className=""
            >
              Play Again
            </Button>
            <div style={{ width: 500, maxWidth: "100%", margin: "0 auto" }}>
              <ClickAccuracyChart clickData={clickData} />
            </div>
          </div>
        </div>
      )}
      {circle && !gameOver && (
        <Circle
          key={`${circle.x}-${circle.y}`}
          x={circle.x}
          y={circle.y}
          size={circle.size}
          color={circle.color}
          onClick={(e) => handleClick(circle, e)}
          className="animate-shrink shadow-lg"
        />
      )}
    </div>
  );
}
