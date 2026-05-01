"use client";

import { useState } from "react";

/**
 * TEST COMPONENT - FOR DEVELOPMENT ONLY
 *
 * This component simulates a successful NDI login for testing the routing
 * without needing the actual backend integration.
 *
 * To use:
 * 1. Import this in your page.tsx
 * 2. Add <NDILoginTest /> component
 * 3. Click "Simulate Login" to test the flow
 * 4. Remove this component before production
 */

export default function NDILoginTest() {
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateSuccessfulLogin = () => {
    setIsSimulating(true);

    // Simulate the mock data that would come from backend
    const mockLoginData = {
      user: {
        name: "Test User",
        cid: "12345678901",
        email: "test@example.com",
      },
      accessToken: "mock-access-token-12345",
      refreshToken: "mock-refresh-token-67890",
    };

    // Store authentication status
    localStorage.setItem("ndi_authenticated", "true");
    localStorage.setItem("ndi_user", JSON.stringify(mockLoginData.user));

    console.log("Simulated login success:", mockLoginData);

    // Redirect after a short delay
    setTimeout(() => {
      console.log("Redirecting to dashboard...");
      window.location.href = "/dashboard";
    }, 1000);
  };

  const clearAuth = () => {
    localStorage.removeItem("ndi_authenticated");
    localStorage.removeItem("ndi_user");
    console.log("Cleared authentication data");
    alert("Authentication cleared! Refresh the page.");
  };

  const checkAuth = () => {
    const isAuth = localStorage.getItem("ndi_authenticated");
    const user = localStorage.getItem("ndi_user");
    console.log("Auth Status:", {
      isAuthenticated: isAuth === "true",
      user: user ? JSON.parse(user) : null,
    });
    alert(`Authenticated: ${isAuth === "true"}\nCheck console for details`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="bg-white rounded-lg shadow-2xl p-4 border-2 border-purple-500">
        <h3 className="text-sm font-bold text-purple-600 mb-2">
          NDI Login Test
        </h3>
        <p className="text-xs text-gray-600 mb-3">Development Only</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={simulateSuccessfulLogin}
            disabled={isSimulating}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSimulating ? "Redirecting..." : "✓ Simulate Login"}
          </button>

          <button
            onClick={checkAuth}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Check Auth Status
          </button>

          <button
            onClick={clearAuth}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Clear Auth
          </button>
        </div>
      </div>
    </div>
  );
}
