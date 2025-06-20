// Card.tsx
import { ReactNode } from "react";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  tag?: string;
  tagColor?: string;
  tooltip?: ReactNode;
}

export function Card({ title, subtitle, children, className = "", tag, tagColor = "bg-accent text-background", tooltip }: CardProps) {
  return (
    <motion.section
      className={cn(
        "relative bg-card/90 rounded-2xl shadow-card p-6 md:p-8 flex flex-col gap-4 h-full justify-between transition-all duration-200 border border-border hover:shadow-xl animate-fade-in",
        className
      )}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(124,58,237,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight flex-1 flex items-center">
          {title}
          {tag === "Optional" && (
            <span className="ml-2 bg-zinc-800 px-2 py-0.5 text-xs text-muted-foreground rounded-full font-semibold">Optional</span>
          )}
        </h2>
        {tag && tag !== "Optional" && (
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer ${tagColor} hover:scale-105 hover:shadow-glow`}>{tag}</span>
        )}
        {tooltip && <span className="ml-2">{tooltip}</span>}
      </div>
      {subtitle && <div className="text-muted text-base mb-2 font-normal">{subtitle}</div>}
      <div>{children}</div>
    </motion.section>
  );
}
