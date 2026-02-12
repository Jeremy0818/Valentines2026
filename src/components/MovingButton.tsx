"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PADDING = 24;
const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 48;

interface MovingButtonProps {
  onComplete: () => void;
}

export default function MovingButton({ onComplete }: MovingButtonProps) {
  const [noPosition, setNoPosition] = useState({ x: PADDING, y: PADDING });
  const [mounted, setMounted] = useState(false);
  const [moveAreaSize, setMoveAreaSize] = useState({ w: 300, h: 280 });
  const moveAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (moveAreaRef.current) {
        const { width, height } = moveAreaRef.current.getBoundingClientRect();
        setMoveAreaSize({ w: width, h: height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const moveNoToRandomPosition = useCallback(() => {
    const maxX = Math.max(0, moveAreaSize.w - BUTTON_WIDTH - PADDING);
    const maxY = Math.max(0, moveAreaSize.h - BUTTON_HEIGHT - PADDING);
    setNoPosition({
      x: Math.random() * maxX + PADDING / 2,
      y: Math.random() * maxY + PADDING / 2,
    });
  }, [moveAreaSize.w, moveAreaSize.h]);

  const handleNoMouseEnter = useCallback(() => {
    if (!mounted) {
      setMounted(true);
      moveNoToRandomPosition();
      return;
    }
    moveNoToRandomPosition();
  }, [mounted, moveNoToRandomPosition]);

  return (
    <div className="relative w-full min-h-[280px] flex items-center justify-center gap-8">
      {/* Yes stays in place - this is the correct choice */}
      <button
        type="button"
        onClick={onComplete}
        className="px-6 py-3 text-lg font-bold rounded-lg shadow-lg transition-none select-none flex-shrink-0 cursor-pointer"
        style={{
          width: BUTTON_WIDTH,
          height: BUTTON_HEIGHT,
          backgroundColor: "#e11d48",
          color: "white",
          border: "3px solid #fda4af",
        }}
      >
        Yes
      </button>

      {/* No moves on hover - forced to click Yes */}
      <div
        ref={moveAreaRef}
        className="relative flex-1 min-h-[280px]"
        onMouseMove={(e) => {
          if (!moveAreaRef.current) return;
          const rect = moveAreaRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const noCenterX = noPosition.x + BUTTON_WIDTH / 2;
          const noCenterY = noPosition.y + BUTTON_HEIGHT / 2;
          const dist = Math.hypot(x - noCenterX, y - noCenterY);
          if (dist < 100 && mounted) {
            moveNoToRandomPosition();
          }
        }}
      >
        <button
          type="button"
          onClick={moveNoToRandomPosition}
          onMouseEnter={handleNoMouseEnter}
          className="absolute px-6 py-3 text-lg font-bold rounded-lg shadow-lg transition-none select-none"
          style={{
            left: noPosition.x,
            top: noPosition.y,
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            backgroundColor: "#6b7280",
            color: "white",
            border: "3px solid #9ca3af",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
