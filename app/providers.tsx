"use client";

import { ReactNode } from "react";
import { SessionContextProvider } from "./context/SessionContext";

export function Providers({ children }: { children: ReactNode }) {
  return <SessionContextProvider>{children}</SessionContextProvider>;
}
