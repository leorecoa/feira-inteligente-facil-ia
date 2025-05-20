
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { saveShoppingList } from "@/services/shoppingListService";
import { useToast } from "@/components/ui/use-toast";

interface SuggestionCardProps {
  item: string;
  reason: string;
}

export default function SuggestionCard({ item, reason }: SuggestionCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAddToList = () => {
    // Create a new shopping list with this item
    const newList = saveShoppingList(`Lista ${item}`, [{
      id: `item-${Date.now()}`,
      name: item,
      category: "Outros",
      price: 0,
      amount: 1,
      unit: "un",
      isChecked: false
    }]);
    
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com ${item}`,
    });
    
    // Navigate to the lists page
    setTimeout(() => {
      navigate("/listas");
    }, 1000);
  };
  
  return (
    <div className="flex justify-between items-start relative z-10">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-feira-green/10 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
          <Lightbulb className="h-6 w-6 text-feira-green group-hover:animate-pulse" />
        </div>
        <div>
          <h3 className="font-medium text-lg text-black">{item}</h3>
          <p className="text-sm text-black mt-1">{reason}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="border-feira-green text-feira-green hover:bg-feira-green/10 transition-colors duration-300 group-hover:bg-feira-green group-hover:text-white"
        onClick={handleAddToList}
      >
        Adicionar
      </Button>
    </div>
  );
}
