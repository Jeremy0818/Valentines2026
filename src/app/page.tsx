"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import BalanceSlider from "@/components/BalanceSlider";
import MovingButton from "@/components/MovingButton";

export default function PuzzlePage() {
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);

  const handleStep1Complete = useCallback(() => {
    setStep1Complete(true);
  }, []);

  const handleStep2Complete = useCallback(() => {
    setStep2Complete(true);
  }, []);

  return (
    <div className="puzzle-page min-h-screen p-6 flex flex-col items-center justify-center relative">
      <span className="absolute top-4 left-4 text-4xl" aria-hidden>🌷</span>
      <span className="absolute top-4 right-4 text-4xl" aria-hidden>🌸</span>
      <span className="absolute bottom-4 left-4 text-4xl" aria-hidden>💐</span>
      <span className="absolute bottom-4 right-4 text-4xl" aria-hidden>🌹</span>

      <h1 className="text-3xl font-bold mb-8 text-center drop-shadow-sm" style={{ color: "#7c2d12", textShadow: "2px 2px 0 #fef08a" }}>
        Valentine&apos;s Puzzle
      </h1>

      {!step1Complete && (
        <section className="w-full max-w-lg mb-8 bg-white/60 rounded-xl p-6 border-4 border-pink-400 shadow-lg">
          <p className="text-xl mb-4 text-center font-bold" style={{ color: "#be123c" }}>
            Do you love me?
          </p>
          <MovingButton onComplete={handleStep1Complete} />
        </section>
      )}

      {step1Complete && !step2Complete && (
        <section className="w-full max-w-lg flex flex-col items-center bg-white/60 rounded-xl p-6 border-4 border-green-500 shadow-lg">
          <p className="text-xl mb-6 text-center font-bold" style={{ color: "#166534" }}>
            How much do you love me? Keep the slider in the heart zone for 3
            seconds!
          </p>
          <BalanceSlider onComplete={handleStep2Complete} />
        </section>
      )}

      {step2Complete && (
        <main className="max-w-lg w-full flex flex-col items-center text-center relative z-10 bg-white/60 rounded-xl p-6 border-4 border-pink-400 shadow-lg">
          <h2 className="text-3xl font-semibold text-rose-900 mb-4">
            You did it!
          </h2>
          <p className="text-xl text-rose-800 mb-8 leading-relaxed">
            Happy Valentine&apos;s Day — I love you!
          </p>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-8 bg-rose-200">
            <Image
              src="/success.png"
              alt="Valentine"
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </div>
          <p className="text-rose-700">
            Thanks for playing. You&apos;re the best.
          </p>
        </main>
      )}
    </div>
  );
}
