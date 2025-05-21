
import React from "react";
import { Plus } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ProductItem, { ProductItemProps } from "@/components/ProductItem";

interface ItemsListSectionProps {
  items: ProductItemProps[];
  onToggleItem: (id: string, checked: boolean) => void;
  onAmountChange: (id: string, amount: number) => void;
  onAddItem: () => void;
}

export default function ItemsListSection({
  items,
  onToggleItem,
  onAmountChange,
  onAddItem
}: ItemsListSectionProps) {
  return (
    <div className="mb-6">
      <SectionTitle>Itens da Lista</SectionTitle>
      <div className="border border-border rounded-lg overflow-hidden">
        {items.map((item) => (
          <ProductItem
            key={item.id}
            {...item}
            onToggle={onToggleItem}
            onAmountChange={onAmountChange}
          />
        ))}
        <div 
          className="p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={onAddItem}
        >
          <span className="flex items-center justify-center text-muted-foreground font-medium">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </span>
        </div>
      </div>
    </div>
  );
}
