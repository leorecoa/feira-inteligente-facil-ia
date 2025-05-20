
import { useEffect, useState } from "react";

interface SuggestionBubblesProps {
  animating?: boolean;
}

export default function SuggestionBubbles({ animating = true }: SuggestionBubblesProps) {
  if (!animating) return null;
  
  return (
    <>
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
    </>
  );
}
