"use client";
import { SessionProvider } from "next-auth/react";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </SessionProvider>
  );
}
