
import { Input } from "@/components/ui/input";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export default function ListNameInput() {
  const { listName, setListName } = useShoppingList();
  
  return (
    <div className="mb-6">
      <Input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="text-lg font-medium p-3 border-2 focus-visible:ring-feira-green"
        placeholder="Nome da lista"
      />
    </div>
  );
}
