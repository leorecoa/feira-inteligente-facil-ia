
import { Lightbulb, ShoppingBag, Bot, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIFeatureCarousel() {
  const navigate = useNavigate();
  
  const goToAIChat = () => {
    navigate("/ai-chat");
  };

  return (
    <div className="my-3 px-1 py-2 bg-white/60 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
        <div 
          className="flex-shrink-0 px-3 py-1.5 bg-feira-green/10 rounded-lg flex items-center border border-feira-green/20 cursor-pointer hover:bg-feira-green/20"
          onClick={goToAIChat}
        >
          <Lightbulb className="h-4 w-4 text-feira-green mr-1.5" />
          <span className="text-sm whitespace-nowrap text-black">Sugestões inteligentes</span>
          <ChevronRight className="h-3 w-3 ml-1 text-feira-green/60" />
        </div>
        <div 
          className="flex-shrink-0 px-3 py-1.5 bg-feira-orange/10 rounded-lg flex items-center border border-feira-orange/20 cursor-pointer hover:bg-feira-orange/20"
          onClick={goToAIChat}
        >
          <ShoppingBag className="h-4 w-4 text-feira-orange mr-1.5" />
          <span className="text-sm whitespace-nowrap text-black">Monte listas</span>
          <ChevronRight className="h-3 w-3 ml-1 text-feira-orange/60" />
        </div>
        <div 
          className="flex-shrink-0 px-3 py-1.5 bg-feira-green/10 rounded-lg flex items-center border border-feira-green/20 cursor-pointer hover:bg-feira-green/20"
          onClick={goToAIChat}
        >
          <Bot className="h-4 w-4 text-feira-green mr-1.5" />
          <span className="text-sm whitespace-nowrap text-black">Dicas de economia</span>
          <ChevronRight className="h-3 w-3 ml-1 text-feira-green/60" />
        </div>
      </div>
    </div>
  );
}
