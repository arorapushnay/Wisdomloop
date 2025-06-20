"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
  className?: string;
  size?: number;
  hideText?: boolean;
}

export default function Logo({ className = "", size = 32, hideText = false }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";
  return (
    <span className={`flex items-center gap-2 select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="Wisdomloop Logo"
        width={size}
        height={size}
        className="rounded-lg shadow-md bg-white dark:bg-zinc-900 transition-colors"
        priority
      />
      {!hideText && (
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent dark:from-purple-300 dark:via-pink-300 dark:to-indigo-300">
          Wisdomloop
        </span>
      )}
    </span>
  );
}
