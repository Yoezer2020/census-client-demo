"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DUMMY_USER } from "@/lib/dummy-data";

interface User {
  email: string;
  fullName: string;
  cidNo: string;
}

interface SessionContextType {
  session: { user: User } | null;
  status: "authenticated" | "loading" | "unauthenticated";
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<{ user: User } | null>(null);
  const [status, setStatus] = useState<
    "authenticated" | "loading" | "unauthenticated"
  >("loading");

  useEffect(() => {
    // Always start unauthenticated (no persistence)
    setStatus("unauthenticated");
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mother login (default demo user)
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      const user: User = {
        email: DUMMY_USER.email,
        fullName: DUMMY_USER.fullName,
        cidNo: DUMMY_USER.cidNo,
      };
      setSession({ user });
      setStatus("authenticated");
      return true;
    }

    // Father login (for approval flow)
    if (email === "father@test.bt" && password === "father123") {
      const user: User = {
        email: "father@test.bt",
        fullName: "Father Demo User",
        cidNo: "11105001234", // Father CID
      };
      setSession({ user });
      setStatus("authenticated");
      return true;
    }

    return false;
  };

  const logout = () => {
    setSession(null);
    setStatus("unauthenticated");
    // Redirect to login page
    window.location.href = "/login";
  };

  const value: SessionContextType = {
    session,
    status,
    isAuthenticated: status === "authenticated",
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      "useSessionContext must be used within SessionContextProvider",
    );
  }
  return context;
}
