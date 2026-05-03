"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { useSessionContext } from "@/app/context/SessionContext";
import { DUMMY_USER } from "@/lib/dummy-data";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, status, login } = useSessionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please use the demo credentials below.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-white px-2 py-8 sm:py-12">
        {/* Responsive Background */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/images/background.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase mb-2 sm:mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden xs:inline">Demo Portal - Test Access</span>
            <span className="xs:hidden">Demo Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-2 sm:mb-4 leading-tight">
            <span className="block">National Civil Registration &</span>
            <span className="text-primary italic block">Census System</span>
            <span className="block text-lg sm:text-xl md:text-2xl font-normal text-amber-600 mt-2">
              Demo Portal
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 sm:mb-4 leading-relaxed max-w-xl text-center font-medium">
            Experience the Census system with sample data and workflows. Perfect
            for training, testing, and demonstrations.
          </p>

          {/* Demo Credentials Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-2xl mx-auto mb-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center size-12 bg-blue-50 rounded-2xl mb-3">
                <ShieldCheck className="size-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Test Accounts & Workflows
              </h2>
              <p className="text-sm text-gray-600">
                Use these credentials to test different user flows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mother Account */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">👩</span>
                  <h3 className="font-semibold text-blue-900 text-sm">
                    Mother Account
                  </h3>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">Email</div>
                    <div className="font-mono text-gray-900">
                      {DUMMY_USER.email}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">Password</div>
                    <div className="font-mono text-gray-900">
                      {DUMMY_USER.password}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">CID</div>
                    <div className="font-mono text-gray-900">11234567890</div>
                  </div>
                </div>
                <div className="text-xs text-gray-700">
                  <div className="font-medium text-gray-900 mb-1">
                    Can test:
                  </div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Birth/Death registration</li>
                    <li>
                      CID:{" "}
                      <span className="font-semibold">New application</span>{" "}
                      (Nu. 100)
                    </li>
                    <li>View submitted applications</li>
                  </ul>
                </div>
              </div>

              {/* Father Account */}
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">👨</span>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    Father Account (Approver)
                  </h3>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">Email</div>
                    <div className="font-mono text-gray-900">
                      father@test.bt
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">Password</div>
                    <div className="font-mono text-gray-900">father123</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-xs">
                    <div className="text-gray-500 mb-0.5">CID</div>
                    <div className="font-mono text-gray-900">11105001234</div>
                  </div>
                </div>
                <div className="text-xs text-gray-700">
                  <div className="font-medium text-gray-900 mb-1">
                    Can test:
                  </div>
                  <ul className="space-y-0.5 list-disc list-inside">
                    <li>Approve birth applications</li>
                    <li>Approve Change of HoH requests</li>
                    <li>Approve Move In/Out HoH relieving</li>
                    <li>
                      CID: <span className="font-semibold">Replacement</span>{" "}
                      (Nu. 300)
                    </li>
                    <li>View pending tasks/approvals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-purple-50 rounded-xl border border-purple-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💳</span>
                <h4 className="font-semibold text-purple-900 text-sm">
                  CID Issuance Test Scenarios
                </h4>
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-white rounded-lg p-2">
                  <span className="font-semibold text-gray-900">
                    Mother (11234567890):
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    No CID card found → New CID application (Nu. 100)
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <span className="font-semibold text-gray-900">
                    Father (11105001234):
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    CID validity expired → Replacement card (Nu. 300)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-green-50 rounded-xl border border-green-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🏠</span>
                <h4 className="font-semibold text-green-900 text-sm">
                  Change of HoH Workflow
                </h4>
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-white rounded-lg p-2">
                  <span className="font-semibold text-gray-900">Step 1:</span>
                  <span className="text-gray-600">
                    {" "}
                    Mother submits Change of HoH (Household: HH-2024-001, New
                    HoH: Father 11105001234)
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <span className="font-semibold text-gray-900">Step 2:</span>
                  <span className="text-gray-600">
                    {" "}
                    Father logs in → Sees pending approval in "Pending Actions"
                    table
                  </span>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <span className="font-semibold text-gray-900">Step 3:</span>
                  <span className="text-gray-600">
                    {" "}
                    Father approves → Application status changes to "APPROVED"
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-amber-50 to-blue-50 rounded-lg border border-amber-200 p-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">💡</span>
                <div className="text-xs">
                  <span className="font-semibold text-gray-900">
                    Quick Test Flow:
                  </span>
                  <span className="text-gray-700">
                    {" "}
                    Login as mother → Submit application (Birth/Change of HoH) →
                    Logout → Login as father → View &amp; approve in Pending
                    Actions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center size-14 bg-primary/10 rounded-2xl mb-4">
                <LogIn className="size-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Demo Login
              </h2>
              <p className="text-sm text-gray-600">
                Sign in with demo credentials above
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 rounded-lg border border-red-100 p-3 mb-4 flex items-start gap-2">
                <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="size-5" />
                Sign In
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Demo system with sample data for training purposes only
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
