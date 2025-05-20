
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeasonalItem, { SeasonalItemType } from "./SeasonalItem";

interface SeasonalItemsListProps {
  items: SeasonalItemType[];
  onAddToCart: (item: SeasonalItemType) => void;
}

export default function SeasonalItemsList({ items, onAddToCart }: SeasonalItemsListProps) {
  return (
    <Tabs defaultValue="frutas" className="mb-6">
      <TabsList className="w-full">
        <TabsTrigger value="frutas" className="flex-1">Frutas</TabsTrigger>
        <TabsTrigger value="legumes" className="flex-1">Legumes</TabsTrigger>
        <TabsTrigger value="verduras" className="flex-1">Verduras</TabsTrigger>
      </TabsList>
      
      {["frutas", "legumes", "verduras"].map((category) => (
        <TabsContent key={category} value={category} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {items
              .filter(item => item.category === category)
              .map(item => (
                <SeasonalItem 
                  key={item.id} 
                  item={item}
                  onAddToCart={onAddToCart}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
