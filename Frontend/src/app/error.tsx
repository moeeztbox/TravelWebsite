"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="text-center max-w-4xl mx-auto relative">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
          Something Went Wrong
        </h1>

        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-px bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>

        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          An unexpected error occurred while loading this page. Please try
          again, or head back to the homepage.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wider uppercase text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black border border-black font-medium tracking-wider uppercase text-sm hover:bg-gray-100 transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
