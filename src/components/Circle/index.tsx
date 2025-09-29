// src/components/Circle/Circle.tsx
import React from 'react';

interface CircleProps {
  
  x: number;
  y: number;
  size: number;
  color: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Circle: React.FC<CircleProps> = ({ 
  
  x, 
  y, 
  size, 
  color, 
  onClick, 
  className = '',
  style 
}) => {
  return (
    <div
    
      onClick={onClick}
      className={`absolute rounded-full ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        ...style
      }}
    ></div>
  );
};

export default Circle;