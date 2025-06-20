"use client";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function MarketplaceProviders({ children }: { children: React.ReactNode }) {
  return <Tooltip.Provider>{children}</Tooltip.Provider>;
}
