import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center relative puzzle-page">
      <span className="absolute top-4 left-4 text-4xl" aria-hidden>🌷</span>
      <span className="absolute top-4 right-4 text-4xl" aria-hidden>🌸</span>
      <span className="absolute bottom-4 left-4 text-4xl" aria-hidden>💐</span>
      <span className="absolute bottom-4 right-4 text-4xl" aria-hidden>🌹</span>

      <main className="max-w-lg w-full flex flex-col items-center text-center relative z-10">
        <h1 className="text-3xl font-bold mb-2 drop-shadow-sm" style={{ color: "#7c2d12", textShadow: "2px 2px 0 #fef08a" }}>
          Oops!
        </h1>
        <p className="text-xl font-bold mb-6" style={{ color: "#be123c" }}>
          This page wandered off. 404 — not found.
        </p>

        <div className="w-full max-w-sm bg-white/60 rounded-xl p-6 border-4 border-pink-400 shadow-lg mb-8">
          <p className="text-lg mb-6" style={{ color: "#7c2d12" }}>
            Let&apos;s get you back to the puzzle.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-bold text-lg border-4 border-pink-500 bg-pink-200 text-rose-900 shadow-lg hover:bg-pink-300 hover:border-pink-600 transition-colors"
          >
            Back to puzzle
          </Link>
        </div>
      </main>
    </div>
  );
}
