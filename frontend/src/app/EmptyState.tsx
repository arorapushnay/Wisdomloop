import { ReactNode } from "react";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  message?: string;
  className?: string;
}

export function EmptyState({ icon, message = "No data yet. Upload or generate to get started.", className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="mb-3">
        {icon || <FileQuestion className="w-10 h-10 text-zinc-500" />}
      </div>
      <div className="text-zinc-400 text-base font-medium">{message}</div>
    </div>
  );
}
