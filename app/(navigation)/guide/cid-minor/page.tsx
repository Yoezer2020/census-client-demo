"use client";

import { Info, ArrowLeft, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import GuideAssistant from "@/app/components/guide/GuideAssistant";

export default function CIDMinorGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Application Guide
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            New CID/SR Card Application
          </h1>
          <p className="text-xl text-secondary font-bold mb-2">
            Aged 15-17 Years
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete guide for processing and issuance of new CID/SR Card for
            minors
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-bold">
            <Info className="w-4 h-4" />
            Parental Consent Required
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Assistant Introduction */}
            <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                  <Info className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3">
                  Need Help with Your Application?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                  Our AI-powered guide assistant is here to help! Click the chat
                  button in the bottom-right corner to get instant answers about
                  eligibility, required documents, application process, and
                  more.
                </p>
                {/* <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    ✓ Instant Answers
                  </div>
                  <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    ✓ 24/7 Available
                  </div>
                  <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                    ✓ Smart Suggestions
                  </div>
                </div> */}
                {/* <div className="inline-flex items-center gap-2 text-sm text-blue-700">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  Click the 💬 button to start chatting
                </div> */}
              </div>
            </section>

            {/* Service Centers in Thimphu - Moved from Sidebar */}
            <div className="bg-gray-100 rounded-3xl p-6 shadow-xl text-black">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Service Centers in Thimphu
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-4 bg-white/10 rounded-xl">
                  <p className="font-bold mb-2 text-black">DCRC Head Office</p>
                  <p className="text-sm text-black leading-relaxed">
                    Chhophel lam, Kawajangsa
                    <br />
                    Above golf course
                  </p>
                </div>

                <div className="p-4 bg-gray-100/10 rounded-xl">
                  <p className="font-bold mb-2 text-black">
                    Dzongkhag CRC Office
                  </p>
                  <p className="text-sm text-black leading-relaxed mb-2">
                    Thimphu Dzongkhag Administration
                    <br />
                    Chogyel lam, Near Changlimithang ground
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>02-321934</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-100/10 rounded-xl">
                  <p className="font-bold mb-2 text-black">
                    Thromde CRC Office
                  </p>
                  <p className="text-sm text-black leading-relaxed mb-2">
                    Gongzin lam
                    <br />
                    Near 8 11 convenience store
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>02-332429</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6 space-y-6 self-start">
            {/* Quick Info */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-secondary" />
                Quick Information
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-bold text-secondary mb-1">
                    Processing Time
                  </div>
                  <div className="text-2xl font-black text-black">
                    2 Days
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    For completion and card printing
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-bold text-secondary mb-1">
                    Card Validity
                  </div>
                  <div className="text-2xl font-black text-black">
                    10 Years
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    From date of issuance
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-bold text-secondary mb-1">
                    Card Fee
                  </div>
                  <div className="text-2xl font-black text-black">
                    Nu. 100
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Payable in cash at revenue counter
                  </p>
                </div>
              </div>
            </div>

            {/* Help Card - Made Smaller */}
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 shadow-2xl">
              <div className="flex items-center gap-2 text-black font-bold text-sm mb-3">
                <Info className="w-4 h-4 text-primary" />
                Need Help?
              </div>
              <p className="text-xs text-black leading-relaxed mb-4">
                Questions? Contact our nearest service center for expert guidance.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2.5 bg-white hover:bg-primary hover:text-white text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI Guide Assistant */}
      <GuideAssistant />
    </div>
  );
}
