"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionContext } from "./context/SessionContext";
import { Loader2, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, status } = useSessionContext();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 text-center max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full border-2 border-primary/20 mb-2">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary" />
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 animate-spin text-primary" />

          {/* Loading Text */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              Loading Census Portal
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
              {status === "loading"
                ? "Authenticating your session..."
                : isAuthenticated
                  ? "Redirecting to dashboard..."
                  : "Redirecting to login..."}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-xs">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Demo Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-100 border border-amber-200 rounded-full">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-amber-800">
            Demo Environment
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Civil Registration & Census System - Demo Portal
        </p>
      </div>
    </div>
  );
}
