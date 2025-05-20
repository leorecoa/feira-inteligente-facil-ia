
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { saveShoppingList } from "@/services/shoppingListService";
import { SeasonalItemType } from "./SeasonalItem";

export default function useShoppingToast() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [latestListId, setLatestListId] = useState<string | null>(null);

  const handleAddToCart = (item: SeasonalItemType) => {
    // Create a new shopping list with just this item
    const categoryMap: Record<string, string> = {
      'frutas': 'Frutas',
      'legumes': 'Legumes',
      'verduras': 'Verduras'
    };
    
    const newList = saveShoppingList(`Lista ${item.name}`, [{
      id: `item-${Date.now()}`,
      name: item.name,
      category: categoryMap[item.category] || 'Outros',
      price: item.price,
      amount: 1,
      unit: item.category === 'frutas' ? 'kg' : 'un',
      isChecked: false
    }]);
    
    // Store the latest list ID for navigation
    setLatestListId(newList.id);
    
    // Show toast that immediately navigates to the specific list when clicked
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com ${item.name}`,
      duration: 5000,
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/lista/${newList.id}`)}
          className="bg-white hover:bg-gray-100"
        >
          Ver lista
        </Button>
      ),
      // Make the entire toast clickable to go to the specific list
      onMouseUp: () => {
        if (newList.id) {
          navigate(`/lista/${newList.id}`);
        }
      },
      className: "cursor-pointer hover:brightness-95 transition-all"
    });
  };

  return { handleAddToCart, latestListId };
}
