
import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14"
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Basket icon */}
          <svg 
            viewBox="0 0 100 100" 
            className={`${sizeClasses[size]} text-feira-green transition-all duration-300 group-hover:scale-105`}
          >
            <path 
              d="M80,35H67.5c0-9.6-7.9-17.5-17.5-17.5S32.5,25.4,32.5,35H20l-5,55h70L80,35z" 
              fill="currentColor" 
              opacity="0.7"
            />
            <path 
              d="M50,25c5.5,0,10,4.5,10,10H40C40,29.5,44.5,25,50,25z" 
              fill="#FFFFFF" 
              opacity="0.9"
            />
            {/* Fruits on top */}
            <circle cx="40" cy="30" r="8" fill="#FF9800" opacity="0.8" />
            <circle cx="55" cy="25" r="7" fill="#4CAF50" opacity="0.9" />
            <circle cx="65" cy="32" r="6" fill="#FF9800" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Logo text */}
      {showText && (
        <div className="flex items-center ml-2">
          <span className="font-bold text-feira-green relative">
            Minha Feira
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-feira-green/30 rounded-full"></span>
          </span>
          <span className="font-bold text-feira-orange ml-1 relative">
            Fácil Fácil
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-feira-orange/30 rounded-full"></span>
          </span>
        </div>
      )}
    </div>
  );
}
