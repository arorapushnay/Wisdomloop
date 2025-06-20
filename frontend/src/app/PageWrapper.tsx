import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`max-w-screen-lg mx-auto px-4 py-10 ${className}`}>
      {children}
    </div>
  );
}
