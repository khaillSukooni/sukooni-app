
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("font-bold flex items-center", sizeClasses[size], className)}>
      <span className="bg-brand-blue p-1.5 rounded-md text-white mr-2 flex items-center justify-center">
        S
      </span>
      <span className="text-brand-blue font-semibold">Sukooni</span>
    </div>
  );
};

export default Logo;
