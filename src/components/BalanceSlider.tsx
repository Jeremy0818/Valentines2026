"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TILT_RANGE = 25; // max degrees each way
const TILT_SPEED = 0.35; // per frame when holding
const TILT_DECAY = 0.02; // per frame when not holding
const BALL_TILT_FACTOR = 0.012; // tilt -> ball velocity
const RANDOM_NUDGE_STRENGTH = 0.018; // random push per frame
const CENTER_ZONE = 0.2; // ball in [-0.2, 0.2] = balanced
const HOLD_SECONDS = 3;
const PLANK_HALF_PX = 128; // half width in px (w-64 = 256px)

interface BalanceSliderProps {
  onComplete: () => void;
}

export default function BalanceSlider({ onComplete }: BalanceSliderProps) {
  const [tilt, setTilt] = useState(0);
  const [ballPosition, setBallPosition] = useState(-1);
  const [secondsInZone, setSecondsInZone] = useState(0);
  const [holdSide, setHoldSide] = useState<"left" | "right" | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tiltRef = useRef(0);
  const ballRef = useRef(-1);
  const holdRef = useRef<"left" | "right" | null>(null);

  tiltRef.current = tilt;
  ballRef.current = ballPosition;
  holdRef.current = holdSide;

  const inZone = ballPosition >= -CENTER_ZONE && ballPosition <= CENTER_ZONE;

  // Physics + win condition tick
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const hold = holdRef.current;
      let newTilt = tiltRef.current;
      if (hold === "left") newTilt = Math.max(-1, newTilt - TILT_SPEED);
      else if (hold === "right") newTilt = Math.min(1, newTilt + TILT_SPEED);
      else newTilt *= 1 - TILT_DECAY;

      const randomNudge = (Math.random() - 0.5) * 2 * RANDOM_NUDGE_STRENGTH;
      let newBall = ballRef.current + newTilt * BALL_TILT_FACTOR + randomNudge;
      newBall = Math.max(-1, Math.min(1, newBall));

      setTilt(newTilt);
      setBallPosition(newBall);
    }, 16); // ~60fps
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Win: ball in center zone for 3 seconds
  useEffect(() => {
    if (!inZone) {
      setSecondsInZone(0);
      return;
    }
    const t = setInterval(() => {
      setSecondsInZone((prev) => {
        const next = prev + 0.05;
        if (next >= HOLD_SECONDS) {
          clearInterval(t);
          onComplete();
        }
        return Math.min(next, HOLD_SECONDS);
      });
    }, 50);
    return () => clearInterval(t);
  }, [inZone, onComplete]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const side = x < rect.width / 2 ? "left" : "right";
    setHoldSide(side);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(() => {
    setHoldSide(null);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHoldSide(null);
  }, []);

  const tiltDeg = tilt * TILT_RANGE;
  const ballOffsetPercent = 50 + ballPosition * 45; // 5% to 95% of plank

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Seesaw with ball */}
      <div className="flex flex-col items-center">
        <div className="relative w-full flex justify-center items-end" style={{ height: 120 }}>
          <div
            className="absolute bottom-0 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[24px] border-b-amber-800"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />
          {/* Plank + ball (same transform so ball rides on plank) */}
          <div
            className="absolute left-1/2 rounded-md border-2 border-amber-900 overflow-visible"
            style={{
              width: 256,
              height: 20,
              bottom: 22,
              transform: `translateX(-50%) rotate(${tiltDeg}deg)`,
              transformOrigin: "center center",
            }}
          >
            <div className="absolute inset-0 rounded-md bg-amber-700 shadow-lg" />
            {/* Ball on plank */}
            <div
              className="absolute w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${ballOffsetPercent}%`,
                top: "50%",
              }}
            />
          </div>
        </div>
        <p className="text-sm text-center mt-2 text-amber-900 font-medium">
          Hold left or right to tilt. Keep the ball in the center!
        </p>
      </div>

      {/* Click-and-hold tilt control */}
      <div className="space-y-2">
        <label className="block text-center text-sm font-medium">
          Hold left side to tilt left · Hold right side to tilt right
        </label>
        <div
          className="relative h-14 flex cursor-pointer select-none touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={`flex-1 flex items-center justify-center rounded-l-lg border-2 border-amber-800 transition-colors ${
              holdSide === "left" ? "bg-amber-600" : "bg-amber-200"
            }`}
          >
            ← Tilt left
          </div>
          <div className="w-2 bg-amber-900" />
          <div
            className={`flex-1 flex items-center justify-center rounded-r-lg border-2 border-amber-800 transition-colors ${
              holdSide === "right" ? "bg-amber-600" : "bg-amber-200"
            }`}
          >
            Tilt right →
          </div>
        </div>
      </div>

      <p className="text-center text-sm">
        {inZone ? (
          <span className="text-green-700 font-bold">
            Ball in center! {secondsInZone.toFixed(1)}s / {HOLD_SECONDS}s
          </span>
        ) : (
          <span className="text-red-600">Keep the ball in the center zone!</span>
        )}
      </p>
    </div>
  );
}
