"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactSection from "@/app/components/sections/ContactSection";
import NewsHighlights from "@/app/components/sections/NewsHighlights";
import QuickLinks from "@/app/components/forms/QuickLinks";
import WebLinksButton from "@/app/components/forms/WebLinksButton";
import { useSessionContext } from "@/app/context/SessionContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { session, isAuthenticated } = useSessionContext();
  const router = useRouter();

  console.log("Dashboard - Session Data:", { session, isAuthenticated });

  const handleAuthRequired = (serviceName?: string) => {
    // User is already authenticated, no need to show login
    console.log(`Auth required for: ${serviceName}`);
  };

  const handleTrackApplications = () => {
    router.push("/dashboard?openModal=true");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-white">
        <div
          className="absolute inset-0 z-0 opacity-[0.15] sm:opacity-[0.2] pointer-events-none"
          style={{
            backgroundImage: "url(/assets/images/background.svg)",
            backgroundSize: "120%",
            backgroundPosition: "80% center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <style jsx>{`
          @media (min-width: 640px) {
            div[style*="background.svg"] {
              background-size: 90% !important;
              background-position: 95% center !important;
            }
          }
          @media (min-width: 768px) {
            div[style*="background.svg"] {
              background-size: 75% !important;
              background-position: 98% center !important;
            }
          }
          @media (min-width: 1024px) {
            div[style*="background.svg"] {
              background-size: 65% !important;
            }
          }
        `}</style>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 sm:-mt-20 md:-mt-24 lg:-mt-38">
          <div className="max-w-4xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-[1.15] sm:leading-[1.1]">
              <span className="block sm:inline">Welcome back,</span>{" "}
              <span className="text-primary italic block sm:inline">
                {session?.user?.fullName || "User"}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl font-medium">
              Access personalized civil registration services. Manage your
              applications, track vital events, and maintain household records
              with ease.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <WebLinksButton
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
              <button
                onClick={handleTrackApplications}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg border border-border bg-white text-foreground font-semibold hover:bg-muted transition-colors subtle-elevation text-sm sm:text-base"
              >
                Track Your Application Status
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services: Card-Based Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
                Your Services
              </h2>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                Access personalized registration portals and manage your vital
                life events.
              </p>
            </div>
          </div>

          <QuickLinks
            isAuthenticated={isAuthenticated}
            onAuthRequired={handleAuthRequired}
          />
        </div>
      </section>

      {/* News Highlights */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Latest News & Updates
            </h2>
            <Link
              href="/about"
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              View All
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <NewsHighlights />
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Need Help?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
              Our support team is available during official working hours to
              assist with your queries.
            </p>
          </div>
          <ContactSection />
        </div>
      </section>
    </div>
  );
}
