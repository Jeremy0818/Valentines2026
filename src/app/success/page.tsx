import Image from "next/image";
import Link from "next/link";

function FlowerCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="40" cy="35" r="8" fill="#f9a8d4" />
      <circle cx="28" cy="45" r="6" fill="#fbcfe8" />
      <circle cx="52" cy="45" r="6" fill="#fbcfe8" />
      <circle cx="40" cy="50" r="5" fill="#f9a8d4" />
      <ellipse cx="40" cy="72" rx="4" ry="12" fill="#86efac" />
      <ellipse cx="35" cy="70" rx="3" ry="10" fill="#86efac" transform="rotate(-20 35 70)" />
      <ellipse cx="45" cy="70" rx="3" ry="10" fill="#86efac" transform="rotate(20 45 70)" />
    </svg>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FlowerCorner className="absolute top-4 left-4 text-pink-300" />
      <FlowerCorner className="absolute top-4 right-4 scale-x-[-1] text-pink-300" />
      <FlowerCorner className="absolute bottom-4 left-4 scale-y-[-1] text-pink-300" />
      <FlowerCorner className="absolute bottom-4 right-4 scale-[-1] text-pink-300" />

      <main className="max-w-lg w-full flex flex-col items-center text-center relative z-10">
        <h1 className="text-3xl font-semibold text-rose-900 mb-4">
          You did it!
        </h1>
        <p className="text-xl text-rose-800 mb-8 leading-relaxed">
          Happy Valentine&apos;s Day — I love you!
        </p>

        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-8 bg-rose-200">
          <Image
            src="/a2171713-b484-451b-8164-1681b96ddf93.JPG"
            alt="Valentine"
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        </div>

        <p className="text-rose-700 mb-6">
          Thanks for playing. You&apos;re the best.
        </p>

        <Link
          href="/"
          className="text-sm text-rose-600 hover:text-rose-800 underline"
        >
          Back to puzzle
        </Link>
      </main>
    </div>
  );
}
