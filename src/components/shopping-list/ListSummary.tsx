
import { useShoppingList } from "@/contexts/ShoppingListContext";

export default function ListSummary() {
  const { totalItems, totalPrice } = useShoppingList();
  
  return (
    <div className="mb-4">
      <div className="text-sm text-muted-foreground">
        {totalItems} {totalItems === 1 ? 'item' : 'itens'}
      </div>
      <div className="text-lg font-medium">
        Total estimado: <span className="text-feira-green">R$ {totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
