
import { X } from "lucide-react";
import ProductItem from "@/components/ProductItem";

interface ShoppingItem {
  id: string;
  name: string;
  category?: string;
  price?: number;
  amount?: number;
  unit?: string;
  isChecked?: boolean;
}

interface ShoppingItemsListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string, checked: boolean) => void;
  onAmountChange: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function ShoppingItemsList({
  items,
  onToggleItem,
  onAmountChange,
  onRemoveItem
}: ShoppingItemsListProps) {
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="border border-border rounded-lg overflow-hidden mb-6">
      {items.map((item) => (
        <div key={item.id} className="relative">
          <ProductItem
            {...item}
            onToggle={onToggleItem}
            onAmountChange={onAmountChange}
          />
          <button 
            className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors p-1"
            onClick={() => onRemoveItem(item.id)}
            aria-label="Remover item"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
