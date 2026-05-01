"use client";

import React from "react";
import { useSessionContext } from "@/app/context/SessionContext";

interface WithSessionProps {
  session: any;
  isAuthenticated: boolean;
  onAuthRequired?: (serviceName?: string) => void;
}

/**
 * HOC to inject session into components
 * Usage: export default withSession(YourComponent);
 */
export function withSession<P extends WithSessionProps>(
  Component: React.ComponentType<P>,
) {
  return function WithSessionComponent(props: Omit<P, keyof WithSessionProps>) {
    const { session, isAuthenticated } = useSessionContext();

    return (
      <Component
        {...(props as P)}
        session={session}
        isAuthenticated={isAuthenticated}
      />
    );
  };
}

/**
 * SessionContextWrapper - Provides session data to children
 * Useful for wrapping multiple components that need session
 */
export function SessionContextWrapper({
  children,
}: {
  children: (context: ReturnType<typeof useSessionContext>) => React.ReactNode;
}) {
  const sessionContext = useSessionContext();
  return <>{children(sessionContext)}</>;
}
