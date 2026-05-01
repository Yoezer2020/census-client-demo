"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { Loader2 } from "lucide-react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, status } = useSessionContext();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (status !== "loading" && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, status, router]);

  // Show loading state while checking authentication
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

  // If not authenticated, don't render content
  if (!isAuthenticated) {
    return null;
  }

  // Render authenticated content
  return <>{children}</>;
}
