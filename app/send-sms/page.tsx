"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/PhoneInput";
import Link from "next/link";

interface SentSMS {
  id: string;
  phoneNumber: string;
  timestamp: number;
  companyName: string;
}

export default function SendSMSPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("Edholm");
  const [googleReviewsLink, setGoogleReviewsLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get company data from localStorage
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("companyName");
      const savedLink = localStorage.getItem("googleReviewsLink");
      if (savedName) {
        setCompanyName(savedName);
        
        // Generate short link slug from business name
        const slug = savedName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        
        // Generate short link using current domain
        const generatedShortLink = `${window.location.origin}/r/${slug}`;
        setShortLink(generatedShortLink);
      }
      if (savedLink) {
        setGoogleReviewsLink(savedLink);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    // Get fresh values from localStorage to ensure we have the latest data
    const currentBusinessName = typeof window !== "undefined" 
      ? localStorage.getItem("companyName") || companyName
      : companyName;
    const currentReviewLink = typeof window !== "undefined"
      ? localStorage.getItem("googleReviewsLink") || googleReviewsLink
      : googleReviewsLink;

    // Get slug from localStorage (set during onboarding)
    const slug = typeof window !== "undefined"
      ? localStorage.getItem("slug") || 
        (currentBusinessName
          ? currentBusinessName
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "")
          : "review")
      : "review";

    // Short link will be generated on server side with proper domain
    const shortLink = `/r/${slug}`;

    try {
      // Call API to send SMS with businessName, reviewLink, and shortLink from onboarding
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          businessName: currentBusinessName,
          reviewLink: currentReviewLink,
          shortLink: shortLink,
          slug: slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kunde inte skicka SMS");
      }

      // Save sent SMS to localStorage
      if (typeof window !== "undefined") {
        const sentSMS: SentSMS = {
          id: Date.now().toString(),
          phoneNumber,
          timestamp: Date.now(),
          companyName,
        };

        const existingSMS = JSON.parse(localStorage.getItem("sentSMS") || "[]");
        existingSMS.push(sentSMS);
        localStorage.setItem("sentSMS", JSON.stringify(existingSMS));
      }

      setIsSuccess(true);
      setPhoneNumber(""); // Clear input after successful send
    } catch (err: any) {
      setError(err.message || "Ett fel uppstod när SMS skulle skickas");
      console.error("Error sending SMS:", err);
    } finally {
      setIsLoading(false);
    }
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
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="+46 70 123 45 67"
              required
            />
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`font-semibold px-8 py-3 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                isSuccess
                  ? "bg-accent-500 text-white cursor-not-allowed"
                  : isLoading
                  ? "bg-primary-400 text-white cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Skickar...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  SMS Skickat!
                </>
              ) : (
                "SKICKA DIN FÖRSTA INBJUDAN"
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-accent-50 border-2 border-accent-500 rounded-xl p-6 mb-8 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-accent-900 font-semibold mb-2">SMS skickat! ✅</p>
                <p className="text-accent-800 mb-4">
                  Perfekt! Din kund har nu fått ett vänligt SMS med en direktlänk till {companyName}s recensionssida på Google. I genomsnitt får våra kunder svar inom 24 timmar. Du kommer få en notis när recensionen dyker upp! ✨
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-accent-700 hover:text-accent-800 font-semibold underline"
                >
                  Visa dashboard →
                </Link>
              </div>
            </div>
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
              Det skulle betyda världen för oss om du kunde dela din upplevelse med en snabb recension här: {shortLink ? (
                <a href={shortLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline break-all">
                  {shortLink}
                </a>
              ) : (
                "[länk]"
              )}
            </p>
            <p>Tar bara 30 sekunder. Stort tack! ⭐</p>
          </div>
        </div>
      </div>
    </main>
  );
}

