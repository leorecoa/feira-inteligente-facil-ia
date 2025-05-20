
import { useRef, useState, useEffect } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = "pt-BR";
    speechSynthesisRef.current.rate = 1.0;
    speechSynthesisRef.current.onend = () => setIsSpeaking(false);

    return () => {
      if (speechSynthesisRef.current && isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakMessage = (content: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Start new speech
    speechSynthesisRef.current.text = content;
    window.speechSynthesis.speak(speechSynthesisRef.current);
    setIsSpeaking(true);
  };

  return { isSpeaking, speakMessage };
}
