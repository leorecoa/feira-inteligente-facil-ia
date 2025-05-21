
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeasonalItem, { SeasonalItemType } from "./SeasonalItem";

interface SeasonalItemsListProps {
  items: SeasonalItemType[];
  onAddToCart: (item: SeasonalItemType) => void;
}

export default function SeasonalItemsList({ items, onAddToCart }: SeasonalItemsListProps) {
  const categories = [
    { value: "frutas", label: "Frutas" },
    { value: "legumes", label: "Legumes" },
    { value: "verduras", label: "Verduras" },
    { value: "acougue", label: "Açougue" },
    { value: "bebes", label: "Bebês" },
    { value: "bebidas", label: "Bebidas" },
    { value: "congelados", label: "Congelados" },
    { value: "eletronicos", label: "Eletrônicos" },
    { value: "enlatados", label: "Enlatados" },
    { value: "laticinios", label: "Laticínios" },
    { value: "limpeza", label: "Limpeza" },
    { value: "mercearia", label: "Mercearia" },
    { value: "padaria", label: "Padaria" },
    { value: "peixaria", label: "Peixaria" },
    { value: "pet", label: "Pet" }
  ];

  return (
    <Tabs defaultValue="frutas" className="mb-6">
      <TabsList className="w-full overflow-x-auto flex">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.value} 
            value={category.value} 
            className="flex-1 min-w-max"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category.value} value={category.value} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {items
              .filter(item => item.category === category.value)
              .map(item => (
                <SeasonalItem 
                  key={item.id} 
                  item={{...item, price: 0}} // Reset price to zero
                  onAddToCart={onAddToCart}
                />
              ))}
            
            {/* Show placeholder message when no items are available in this category */}
            {items.filter(item => item.category === category.value).length === 0 && (
              <div className="col-span-2 text-center py-8 px-4 border border-dashed rounded-lg border-muted-foreground/50">
                <p className="text-muted-foreground">
                  Nenhum item disponível nesta categoria no momento.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
