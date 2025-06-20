// LucideIcon.tsx
// Utility to import Lucide icons on demand
import * as icons from "lucide-react";
import { IconProps } from "lucide-react";

export function LucideIcon({ name, ...props }: { name: string } & IconProps) {
  const Lucide = (icons as any)[name];
  if (!Lucide) return null;
  return <Lucide {...props} />;
}
