
import React from "react";

export default function AppNameBackground() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[-1]">
      <div className="relative w-full h-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-feira-green/10 via-white to-feira-orange/10"></div>
        
        {/* App name as large text in background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-opacity-5 select-none">
          <h1 className="text-[20vw] font-bold text-feira-green/5 leading-none">Minha</h1>
          <h1 className="text-[20vw] font-bold text-feira-green/5 leading-none">Feira</h1>
          <h1 className="text-[20vw] font-bold text-feira-orange/5 leading-none">Fácil</h1>
          <h1 className="text-[20vw] font-bold text-feira-orange/5 leading-none">Fácil</h1>
        </div>
      </div>
    </div>
  );
}
