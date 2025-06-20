// LucideIcon.tsx
// Utility to import Lucide icons on demand
import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export function LucideIcon({ name, ...props }: { name: keyof typeof icons } & LucideProps) {
  const Lucide = icons[name] as React.ComponentType<LucideProps> | undefined;
  if (!Lucide) return null;
  return <Lucide {...props} />;
}
