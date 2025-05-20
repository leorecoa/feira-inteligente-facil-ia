
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface SeasonalItemType {
  id: number;
  name: string;
  category: "frutas" | "legumes" | "verduras";
  price: number;
  imageSrc: string;
}

interface SeasonalItemProps {
  item: SeasonalItemType;
  onAddToCart: (item: SeasonalItemType) => void;
}

export default function SeasonalItem({ item, onAddToCart }: SeasonalItemProps) {
  return (
    <Card key={item.id} className="overflow-hidden">
      <div className="h-32 bg-muted relative">
        <img 
          src={item.imageSrc} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
        <span className="absolute top-2 right-2 bg-feira-orange text-white text-xs font-medium px-1.5 py-0.5 rounded">
          Da Estação
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm">{item.name}</h3>
        <p className="text-feira-orange-dark text-sm font-medium mt-1">
          R$ {item.price.toFixed(2)}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-2 text-feira-orange border border-feira-orange/30 hover:bg-feira-orange/10"
          onClick={() => onAddToCart(item)}
        >
          <ShoppingBag className="h-3 w-3 mr-1" />
          Adicionar
        </Button>
      </div>
    </Card>
  );
}
