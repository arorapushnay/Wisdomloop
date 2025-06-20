import { ReactNode } from "react";

const badgeColors = {
  success: "bg-green-700/80 text-green-200 border-green-600",
  warning: "bg-yellow-700/80 text-yellow-200 border-yellow-600",
  error: "bg-red-700/80 text-red-200 border-red-600",
  neutral: "bg-zinc-700/80 text-zinc-200 border-zinc-600",
};

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "error" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${badgeColors[variant]} ${className}`}>
      {children}
    </span>
  );
}
