"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
          Bli det självklara valet i Stockholm
        </h1>

        {/* First Paragraph */}
        <p className="text-xl md:text-2xl text-slate-700">
          93% av kunderna kollar recensioner innan de köper. Om du inte syns, finns du inte.
        </p>

        {/* Second Paragraph */}
        <p className="text-xl md:text-2xl text-slate-700">
          ReviewPeak förvandlar dina nöjda kunder till din största säljkår – helt automatiskt.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Starta din resa mot 5 stjärnor
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm md:text-base text-slate-500 pt-8">
          ANVÄNDS AV 2,400+ SMÅ FÖRETAG
        </p>
      </div>
    </main>
  );
}
