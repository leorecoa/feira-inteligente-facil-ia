
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import SuggestionBubbles from "./SuggestionBubbles";
import SuggestionPrompt from "./SuggestionPrompt";
import SuggestionsList from "./SuggestionsList";
import GenerateButton from "./GenerateButton";
import "./SuggestionAnimations.css";

export default function SuggestionsContainer() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{item: string; reason: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animatingBubbles, setAnimatingBubbles] = useState(false);

  useEffect(() => {
    // Start the bubble animation when component mounts
    setAnimatingBubbles(true);
  }, []);

  const generateSuggestions = () => {
    setLoading(true);
    
    // Animated loading simulation
    toast({
      title: "Processando seus dados",
      description: "Nossa IA está analisando seu histórico de compras...",
    });
    
    // Simulando chamada para API de IA
    setTimeout(() => {
      setSuggestions([
        { 
          item: "Couve-flor", 
          reason: "Está na estação e combina com seu histórico de compras" 
        },
        { 
          item: "Maçã Verde", 
          reason: "Preço mais baixo nos últimos 3 meses" 
        },
        { 
          item: "Alho", 
          reason: "Você geralmente compra a cada 15 dias" 
        }
      ]);
      setShowSuggestions(true);
      setLoading(false);
      
      toast({
        title: "Sugestões geradas!",
        description: "Nossa IA analisou seu histórico e gerou recomendações.",
      });
    }, 1500);
  };

  // Instead of generating suggestions, let's navigate to AI chat
  const goToAIChat = () => {
    navigate("/ai-chat");
  };

  return (
    <div className="relative">
      {!showSuggestions ? (
        <Card className="p-5 relative overflow-hidden border-2 border-feira-green/20 shadow-md">
          {/* Animated background with floating bubbles */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-feira-green/5 to-feira-orange/5"></div>
            
            <SuggestionBubbles animating={animatingBubbles} />
            
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-feira-green/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-feira-orange/10 blur-3xl"></div>
          </div>
          
          <SuggestionPrompt />
          
          <div className="flex flex-col w-full space-y-3 relative z-10">
            <GenerateButton loading={loading} onClick={goToAIChat} />
          </div>
          
          <div className="w-full pt-3 relative z-10">
            <div className="flex items-center justify-start space-x-1.5 text-xs text-black animate-fade-in">
              <Sparkles className="h-3 w-3 text-feira-orange" />
              <span>Nossa IA aprende com suas compras para sugerir produtos melhores</span>
            </div>
          </div>
        </Card>
      ) : (
        <SuggestionsList 
          suggestions={suggestions} 
          onNewSuggestions={() => setShowSuggestions(false)} 
        />
      )}
    </div>
  );
}
