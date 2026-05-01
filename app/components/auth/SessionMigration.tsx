"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { migrateLocalStorageToNextAuth } from "@/lib/ndi-auth";

/**
 * SessionMigration Component
 * Automatically migrates users from localStorage to NextAuth
 * Place this in your root layout or main page
 */
export function SessionMigration() {
  const { data: session, status } = useSession();
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    async function migrate() {
      // Only attempt migration if:
      // 1. NextAuth session is not loaded yet
      // 2. We haven't migrated already
      // 3. We're not currently loading
      if (status === "unauthenticated" && !migrated) {
        const success = await migrateLocalStorageToNextAuth();
        if (success) {
          setMigrated(true);
          // Reload to pick up new session
          window.location.reload();
        }
      }
    }

    migrate();
  }, [status, migrated]);

  // This component doesn't render anything
  return null;
}
