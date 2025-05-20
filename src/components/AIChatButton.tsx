
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function AIChatButton() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const openAIHelp = () => {
    toast({
      title: "Assistente de IA",
      description: "O que você gostaria de saber sobre compras, receitas ou planejamento de feira?",
      duration: 4000,
    });
    
    // Navigate to the chat
    navigate("/ai-chat");
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 animate-fade-in" style={{animationDelay: "800ms"}}>
      <div className="flex flex-col items-end">
        <button 
          onClick={openAIHelp}
          className="bg-feira-green/90 backdrop-blur-sm rounded-lg shadow-md py-2 px-4 mb-2 text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <p className="font-medium text-feira-orange">Peça ajuda à nossa IA!</p>
          <p className="text-xs text-feira-orange/80">Receitas, dicas de compras, ideias...</p>
        </button>
        <Button 
          onClick={openAIHelp}
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-110 text-white shadow-lg transition-all duration-300 animate-pulse-subtle"
          aria-label="Fale com a IA"
        >
          <MessageCircle className="h-6 w-6 animate-bounce" />
        </Button>
      </div>
    </div>
  );
}
