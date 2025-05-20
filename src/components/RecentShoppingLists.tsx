
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionTitle from "./SectionTitle";
import ShoppingListCard from "./ShoppingListCard";

interface ShoppingList {
  id: string;
  name: string;
  itemCount: number;
  date: string;
  isActive: boolean;
}

interface RecentShoppingListsProps {
  lists: ShoppingList[];
}

export default function RecentShoppingLists({ lists }: RecentShoppingListsProps) {
  const navigate = useNavigate();

  const handleViewAllLists = () => {
    navigate("/listas");
  };

  if (lists.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-fade-in" style={{animationDelay: "400ms"}}>
      <div className="flex justify-between items-center mb-3">
        <SectionTitle className="m-0">Listas Recentes</SectionTitle>
        <Button 
          variant="link" 
          className="text-feira-green p-0 h-auto"
          onClick={handleViewAllLists}
        >
          Ver todas
        </Button>
      </div>
      <div className="space-y-3">
        {lists.map((list) => (
          <ShoppingListCard key={list.id} {...list} />
        ))}
      </div>
    </div>
  );
}
