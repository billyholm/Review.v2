"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Calendar, TrendingUp, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SentSMS {
  id: string;
  phoneNumber: string;
  timestamp: number;
  companyName: string;
}

export default function DashboardPage() {
  const [sentSMS, setSentSMS] = useState<SentSMS[]>([]);
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSMS = JSON.parse(localStorage.getItem("sentSMS") || "[]");
      setSentSMS(savedSMS);
      
      const savedName = localStorage.getItem("companyName");
      if (savedName) {
        setCompanyName(savedName);
      }
    }
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const recentSMS = sentSMS.slice().reverse().slice(0, 10); // Get last 10, most recent first

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            {companyName && (
              <p className="text-lg text-slate-600">{companyName}</p>
            )}
          </div>
          <Link
            href="/send-sms"
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
          >
            Skicka nytt SMS
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Skickade SMS
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{sentSMS.length}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Denna månad
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {sentSMS.filter((sms) => {
                const smsDate = new Date(sms.timestamp);
                const now = new Date();
                return smsDate.getMonth() === now.getMonth() && smsDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-accent-500" />
              <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Genomsnittlig svarstid
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">24h</p>
          </div>
        </div>

        {/* Recent SMS List */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Senaste skickade SMS</h2>
          
          {recentSMS.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">Inga SMS har skickats ännu</p>
              <Link
                href="/send-sms"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Skicka ditt första SMS
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSMS.map((sms) => (
                <div
                  key={sms.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{sms.phoneNumber}</p>
                    <p className="text-sm text-slate-500 mt-1">{formatDate(sms.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-2 text-accent-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Skickat</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to home link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}

