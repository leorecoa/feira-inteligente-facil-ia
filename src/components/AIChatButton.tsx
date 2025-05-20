
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
      onMouseUp: () => {
        navigate("/ai-chat");
      },
      className: "cursor-pointer hover:brightness-95 transition-all"
    });
    
    // Navigate to the chat directly
    navigate("/ai-chat");
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 animate-fade-in" style={{animationDelay: "800ms"}}>
      <div className="flex flex-col items-end">
        <button 
          onClick={openAIHelp}
          className="bg-feira-green rounded-lg shadow-md py-2 px-4 mb-2 text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <p className="font-medium text-feira-orange">Peça ajuda à nossa IA!</p>
          <p className="text-xs text-feira-orange/80">Receitas, dicas de compras, ideias...</p>
        </button>
      </div>
    </div>
  );
}
