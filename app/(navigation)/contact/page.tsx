"use client";

import ContactSection from "@/app/components/sections/ContactSection";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-gray-900">
          Contact & <span className="text-primary italic">Support</span>
        </h1>
        <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto font-medium">
          We're here to help. Reach out through any of our channels or submit
          your grievances directly.
        </p>
      </div>

      <ContactSection />
    </div>
  );
}
