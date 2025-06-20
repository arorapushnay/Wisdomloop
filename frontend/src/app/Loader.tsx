import { motion } from "framer-motion";

export function Loader({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        className="animate-spin"
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#a78bfa"
          strokeWidth="4"
          strokeDasharray="80"
          strokeDashoffset="60"
          strokeLinecap="round"
          opacity="0.3"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#7c3aed"
          strokeWidth="4"
          strokeDasharray="40"
          strokeDashoffset="10"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export function Skeleton({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`bg-muted/30 rounded-lg animate-pulse ${className}`}
      style={{ minHeight: 24, ...style }}
    />
  );
}
