
import { useState, useEffect } from "react";
import { Bot, Sparkles, Settings, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import { useToast } from "@/components/ui/use-toast";
import { getOpenAIApiKey } from "@/utils/aiService";
import { useNavigate } from "react-router-dom";
import AIFeatureCarousel from "./ai/AIFeatureCarousel";
import AIStatusBanner from "./ai/AIStatusBanner";

export default function AISuggestions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{item: string; reason: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setHasApiKey(!!getOpenAIApiKey());
  }, []);

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  const generateSuggestions = () => {
    setLoading(true);
    
    // If no API key, redirect to the AI Chat page to set one
    if (!hasApiKey) {
      toast({
        title: "API não configurada",
        description: "Vamos configurar a API para ativar sugestões avançadas.",
      });
      
      setTimeout(() => navigate("/ai-chat"), 1500);
      setLoading(false);
      return;
    }
    
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
    <div className="mb-8">
      <SectionTitle>Sugestões Inteligentes</SectionTitle>
      
      <AIStatusBanner 
        hasApiKey={hasApiKey} 
        onConfigureClick={() => navigate("/ai-chat")}
        showSettings={showSettings}
      />
      
      <AIFeatureCarousel />
      
      {!showSuggestions ? (
        <Card className="p-5 relative overflow-hidden border-2 border-feira-green/20 shadow-md">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-feira-green/30 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-feira-orange/30 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-feira-green/20 to-feira-green/40 flex items-center justify-center shadow-md">
              <Bot className="h-8 w-8 text-feira-green animate-pulse-subtle" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-feira-green to-feira-green-dark">
                IA com Sugestões Personalizadas
              </h3>
              <p className="text-sm text-muted-foreground">
                Nossa IA pode analisar seus hábitos e sugerir produtos com base no seu histórico
              </p>
            </div>
            
            <div className="flex flex-col w-full space-y-3">
              <Button 
                className="bg-gradient-to-r from-feira-green to-feira-green-dark hover:from-feira-green-dark hover:to-feira-green text-white shadow-md transition-all duration-300 hover:shadow-lg"
                onClick={generateSuggestions}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Gerando sugestões...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Sugestões
                  </>
                )}
              </Button>
              
              {!hasApiKey && (
                <div className="flex items-center justify-between bg-feira-orange/10 rounded-lg p-2.5 text-sm">
                  <span className="flex items-center text-feira-orange-dark">
                    <Settings className="h-4 w-4 mr-1.5" />
                    <span className="text-xs">Configuração da API OpenAI necessária</span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-feira-orange hover:text-feira-orange-dark p-1 h-auto"
                    onClick={handleSettingsToggle}
                  >
                    Configurar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((item, index) => (
              <Card 
                key={index} 
                className="p-4 hover:shadow-md transition-all duration-300 border-2 border-feira-green/10 hover:border-feira-green/30 bg-gradient-to-r from-white to-feira-green/5"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-feira-green/10 flex items-center justify-center mt-0.5">
                      <Lightbulb className="h-5 w-5 text-feira-green" />
                    </div>
                    <div>
                      <h3 className="font-medium text-feira-green-dark">{item.item}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-feira-green text-feira-green hover:bg-feira-green/10 transition-colors duration-300"
                  >
                    Adicionar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-feira-green/30 text-feira-green hover:bg-feira-green/10 transition-all duration-300"
            onClick={() => setShowSuggestions(false)}
          >
            Solicitar Novas Sugestões
          </Button>
        </div>
      )}
    </div>
  );
}
