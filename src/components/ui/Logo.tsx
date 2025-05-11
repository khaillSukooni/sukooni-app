
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
      <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-purple p-1.5 rounded-md text-white mr-2">
        TT
      </span>
      <span className="gradient-text">TherapyTalk</span>
    </div>
  );
};

export default Logo;
