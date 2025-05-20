
import { X } from "lucide-react";
import ProductItem from "@/components/ProductItem";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export default function ShoppingItemsList() {
  const { items, handleToggleItem, handleAmountChange, handleRemoveItem } = useShoppingList();
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="border border-border rounded-lg overflow-hidden mb-6">
      {items.map((item) => (
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
  );
}
