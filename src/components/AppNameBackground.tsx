
import React from "react";

export default function AppNameBackground() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[-1]">
      <div className="relative w-full h-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-feira-green/10 via-white to-feira-orange/10"></div>
        
        {/* App name as large text in background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-opacity-5 select-none">
          {/* Logo icon in the background */}
          <div className="absolute opacity-5">
            <svg 
              viewBox="0 0 100 100" 
              className="h-[50vh] text-feira-green"
            >
              <path 
                d="M80,35H67.5c0-9.6-7.9-17.5-17.5-17.5S32.5,25.4,32.5,35H20l-5,55h70L80,35z" 
                fill="currentColor" 
              />
              <path 
                d="M50,25c5.5,0,10,4.5,10,10H40C40,29.5,44.5,25,50,25z" 
                fill="#FFFFFF" 
              />
              <circle cx="40" cy="30" r="8" fill="#FF9800" />
              <circle cx="55" cy="25" r="7" fill="#4CAF50" />
              <circle cx="65" cy="32" r="6" fill="#FF9800" />
            </svg>
          </div>
          
          <h1 className="text-[20vw] font-bold text-feira-green/5 leading-none">Minha</h1>
          <h1 className="text-[20vw] font-bold text-feira-green/5 leading-none">Feira</h1>
          <h1 className="text-[20vw] font-bold text-feira-orange/5 leading-none">Fácil</h1>
          <h1 className="text-[20vw] font-bold text-feira-orange/5 leading-none">Fácil</h1>
        </div>
      </div>
    </div>
  );
}
