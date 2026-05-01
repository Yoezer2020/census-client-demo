"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ServicePageLayoutProps {
  serviceId: string;
  children: React.ReactNode;
}

export default function ServicePageLayout({
  serviceId,
  children,
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Main form area */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
