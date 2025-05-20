
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import { useToast } from "@/components/ui/use-toast";

export default function AISuggestions() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{item: string; reason: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateSuggestions = () => {
    setLoading(true);
    
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
      
      {!showSuggestions ? (
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-feira-green/10 flex items-center justify-center">
            <Bot className="h-6 w-6 text-feira-green" />
          </div>
          <div>
            <h3 className="font-medium">IA com Sugestões Personalizadas</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Nossa IA pode analisar seus hábitos e sugerir produtos
            </p>
          </div>
          <Button 
            className="bg-feira-green hover:bg-feira-green-dark text-white"
            onClick={generateSuggestions}
            disabled={loading}
          >
            {loading ? (
              <>Gerando sugestões...</>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Sugestões
              </>
            )}
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.item}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-feira-green text-feira-green hover:bg-feira-green/10"
                >
                  Adicionar
                </Button>
              </div>
            </Card>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => setShowSuggestions(false)}
          >
            Solicitar Novas Sugestões
          </Button>
        </div>
      )}
    </div>
  );
}
