"use client";

import { useState } from "react";
import { ArrowRight, Lock, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [companyName, setCompanyName] = useState("");
  const [googleReviewsLink, setGoogleReviewsLink] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage or send to API
    if (typeof window !== "undefined") {
      localStorage.setItem("companyName", companyName);
      localStorage.setItem("googleReviewsLink", googleReviewsLink);
    }
    router.push("/send-sms");
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 text-center">
          Berätta om din verksamhet
        </h1>

        {/* Subheading */}
        <p className="text-lg text-slate-600 mb-12 text-center">
          Vi anpassar systemet efter just ditt företag
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Vad heter ditt företag?
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="t.ex. Svenssons Frisersalong"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
              required
            />
          </div>

          {/* Google Reviews Link */}
          <div>
            <label
              htmlFor="googleReviewsLink"
              className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"
            >
              Klistra in din länk till Google Reviews
              <Info className="w-4 h-4 text-slate-400" />
            </label>
            <input
              type="url"
              id="googleReviewsLink"
              value={googleReviewsLink}
              onChange={(e) => setGoogleReviewsLink(e.target.value)}
              placeholder="https://g.page/r/..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
              required
            />
            <p className="mt-2 text-sm text-slate-500">
              Vi använder denna för att skicka direktlänkar till dina kunder
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg px-6 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 flex items-center justify-center gap-2"
          >
            Konfigurera mitt system
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Privacy Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <Lock className="w-4 h-4" />
          <span>Dina uppgifter hanteras säkert och delas aldrig med tredje part</span>
        </div>
      </div>
    </main>
  );
}

