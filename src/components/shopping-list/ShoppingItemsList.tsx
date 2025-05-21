
import { X } from "lucide-react";
import ProductItem from "@/components/ProductItem";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { Separator } from "@/components/ui/separator";

export default function ShoppingItemsList() {
  const { items, handleToggleItem, handleAmountChange, handleRemoveItem } = useShoppingList();
  
  if (items.length === 0) {
    return null;
  }
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const categoryName = getCategoryDisplayName(item.category);
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  // Get categories in order
  const categories = Object.keys(groupedItems);
  
  return (
    <div className="border border-border rounded-lg overflow-hidden mb-6">
      {categories.map((category, index) => (
        <div key={category}>
          {index > 0 && <Separator />}
          <div className="bg-muted/30 px-4 py-2 font-medium text-sm">
            {category}
          </div>
          {groupedItems[category].map((item) => (
            <div key={item.id} className="relative">
              <ProductItem
                {...item}
                onToggle={handleToggleItem}
                onAmountChange={handleAmountChange}
              />
              <button 
                className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors p-1"
                onClick={() => handleRemoveItem(item.id)}
                aria-label="Remover item"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Helper function to get a user-friendly category name
function getCategoryDisplayName(categoryId: string): string {
  const categoryMap: Record<string, string> = {
    "frutas": "Frutas",
    "legumes": "Legumes",
    "verduras": "Verduras",
    "acougue": "Açougue",
    "bebes": "Bebês",
    "bebidas": "Bebidas",
    "congelados": "Congelados",
    "eletronicos": "Eletrônicos",
    "enlatados": "Enlatados",
    "laticinios": "Laticínios",
    "limpeza": "Material de Limpeza",
    "mercearia": "Mercearia",
    "padaria": "Padaria",
    "peixaria": "Peixaria",
    "pet": "Pet",
    "Outros": "Outros Itens"
  };
  
  return categoryMap[categoryId] || "Outros Itens";
}
