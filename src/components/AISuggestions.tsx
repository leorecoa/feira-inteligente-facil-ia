
import { useState, useEffect } from "react";
import { Bot, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import AIFeatureCarousel from "./ai/AIFeatureCarousel";

export default function AISuggestions() {
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

  return (
    <div className="mb-8 relative">
      <SectionTitle>Sugestões Inteligentes</SectionTitle>
      
      <AIFeatureCarousel />
      
      {!showSuggestions ? (
        <Card className="p-5 relative overflow-hidden border-2 border-feira-green/20 shadow-md">
          {/* Animated background with floating bubbles */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-feira-green/5 to-feira-orange/5"></div>
            
            {animatingBubbles && (
              <>
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
                <div className="bubble bubble-4"></div>
                <div className="bubble bubble-5"></div>
              </>
            )}
            
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-feira-green/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-feira-orange/10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-feira-green/20 to-feira-green/40 flex items-center justify-center shadow-md animate-pulse-subtle">
              <Bot className="h-10 w-10 text-feira-green" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-feira-green to-feira-green-dark animate-textColorShift">
                Sugestões Personalizadas
              </h3>
              <p className="text-base text-muted-foreground">
                Nossa IA analisa seus hábitos de compra e sugere produtos ideais para você
              </p>
            </div>
            
            <div className="flex flex-col w-full space-y-3">
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-feira-green to-feira-green-dark hover:from-feira-green-dark hover:to-feira-green text-white shadow-md transition-all duration-500 hover:shadow-lg group"
                onClick={generateSuggestions}
                disabled={loading}
              >
                {/* Button shine effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
                
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analisando compras...
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                    Gerar Sugestões Inteligentes
                  </>
                )}
              </Button>
            </div>
            
            <div className="w-full pt-3">
              <div className="flex items-center justify-start space-x-1.5 text-xs text-muted-foreground animate-fade-in">
                <Sparkles className="h-3 w-3 text-feira-orange" />
                <span>Nossa IA aprende com suas compras para sugerir produtos melhores</span>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((item, index) => (
              <Card 
                key={index} 
                className="p-4 hover:shadow-md transition-all duration-500 border-2 border-feira-green/10 hover:border-feira-green/30 bg-gradient-to-r from-white to-feira-green/5 overflow-hidden relative group"
              >
                {/* Card shine effect */}
                <div className="absolute inset-0 w-full h-full bg-white/40 transform -translate-x-full opacity-30 group-hover:animate-shine"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full bg-feira-green/10 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <Lightbulb className="h-6 w-6 text-feira-green group-hover:animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-feira-green-dark">{item.item}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-feira-green text-feira-green hover:bg-feira-green/10 transition-colors duration-300 group-hover:bg-feira-green group-hover:text-white"
                  >
                    Adicionar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-feira-green/30 text-feira-green hover:bg-feira-green/10 transition-all duration-300 relative overflow-hidden group"
            onClick={() => setShowSuggestions(false)}
          >
            {/* Button shine effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
            <span className="relative z-10">Solicitar Novas Sugestões</span>
          </Button>
        </div>
      )}
      
      {/* Add CSS for the animations */}
      <style>
        {`
        @keyframes shine {
          100% {
            transform: translateX(100%) skew(-12deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes textColorShift {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(15deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
        
        .animate-shine {
          animation: shine 0.85s ease-in-out;
        }
        
        .animate-textColorShift {
          animation: textColorShift 4s infinite ease-in-out;
        }
        
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.5);
          opacity: 0.6;
        }
        
        .bubble-1 {
          width: 60px;
          height: 60px;
          left: 10%;
          top: 20%;
          animation: float 7s infinite ease-in-out;
        }
        
        .bubble-2 {
          width: 40px;
          height: 40px;
          right: 20%;
          top: 30%;
          animation: float 5s infinite ease-in-out;
          animation-delay: 1s;
        }
        
        .bubble-3 {
          width: 30px;
          height: 30px;
          left: 30%;
          bottom: 20%;
          animation: float 6s infinite ease-in-out;
          animation-delay: 2s;
        }
        
        .bubble-4 {
          width: 25px;
          height: 25px;
          right: 10%;
          bottom: 30%;
          animation: float 8s infinite ease-in-out;
          animation-delay: 3s;
        }
        
        .bubble-5 {
          width: 15px;
          height: 15px;
          left: 50%;
          top: 50%;
          animation: float 4s infinite ease-in-out;
          animation-delay: 1.5s;
        }
        `}
      </style>
    </div>
  );
}
