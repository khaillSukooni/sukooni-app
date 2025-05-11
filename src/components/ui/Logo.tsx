
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/e2d84133-723e-4eb0-9fe1-d46b149290a6.png" 
        alt="Sukooni" 
        className={cn(sizeClasses[size])}
      />
    </div>
  );
};

export default Logo;
