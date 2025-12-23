"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SendSMSPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [companyName, setCompanyName] = useState("Edholm");
  const router = useRouter();

  useEffect(() => {
    // Get company name from localStorage
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("companyName");
      if (savedName) {
        setCompanyName(savedName);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate SMS sending
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-accent-500 mb-4">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Systemet är redo</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          Nu kör vi
        </h1>

        {/* Instructions */}
        <div className="space-y-4 mb-8 text-slate-700">
          <p>
            Skriv in numret till din senaste nöjda kund nedan.
          </p>
          <p>
            Vi skickar ett psykologiskt optimerat SMS som gör det omöjligt för dem att inte lämna 5 stjärnor.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Kundens mobilnummer
          </label>
          <div className="flex gap-4">
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+46 70 123 45 67"
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
              required
            />
            {!isSuccess ? (
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 whitespace-nowrap"
              >
                SKICKA DIN FÖRSTA INBJUDAN
              </button>
            ) : (
              <button
                type="button"
                className="bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap"
                disabled
              >
                <CheckCircle2 className="w-5 h-5" />
                SMS Skickat!
              </button>
            )}
          </div>
        </form>

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-8">
            <p className="text-accent-800">
              Perfekt! Din kund har nu fått ett vänligt SMS med en direktlänk till {companyName}s recensionssida på Google. I genomsnitt får våra kunder svar inom 24 timmar. Du kommer få en notis när recensionen dyker upp! ✨
            </p>
          </div>
        )}

        {/* SMS Preview */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
          <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
            Förhandsgranskning av SMS
          </h2>
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-slate-700">
            <p>Hej! Tack för att du valde {companyName}! 👋</p>
            <p>
              Det skulle betyda världen för oss om du kunde dela din upplevelse med en snabb recension här: [länk]
            </p>
            <p>Tar bara 30 sekunder. Stort tack! ⭐</p>
          </div>
        </div>
      </div>
    </main>
  );
}

