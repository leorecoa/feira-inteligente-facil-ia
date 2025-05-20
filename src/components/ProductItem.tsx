
import { Check, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ProductItemProps {
  id: string;
  name: string;
  category?: string;
  price?: number;
  amount?: number;
  unit?: string;
  isChecked?: boolean;
  isRecommended?: boolean;
  isSeasonal?: boolean;
  onToggle?: (id: string, checked: boolean) => void;
  onAmountChange?: (id: string, amount: number) => void;
  className?: string;
}

export default function ProductItem({
  id,
  name,
  category,
  price,
  amount = 1,
  unit = "un",
  isChecked = false,
  isRecommended = false,
  isSeasonal = false,
  onToggle,
  onAmountChange,
  className,
}: ProductItemProps) {
  const [currentAmount, setCurrentAmount] = useState(amount);

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id, !isChecked);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newAmount = currentAmount + 1;
    setCurrentAmount(newAmount);
    if (onAmountChange) {
      onAmountChange(id, newAmount);
    }
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentAmount > 1) {
      const newAmount = currentAmount - 1;
      setCurrentAmount(newAmount);
      if (onAmountChange) {
        onAmountChange(id, newAmount);
      }
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center py-3 border-b border-border last:border-b-0 transition-all",
        isChecked && "text-muted-foreground",
        className
      )}
      onClick={handleToggle}
    >
      <div 
        className={cn(
          "w-6 h-6 rounded-full border border-input flex items-center justify-center flex-shrink-0 cursor-pointer",
          isChecked && "bg-feira-green border-feira-green text-white"
        )}
      >
        {isChecked && <Check className="h-4 w-4" />}
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex items-start">
          <span className={cn("leading-tight font-medium", isChecked && "line-through opacity-80")}>
            {name}
          </span>
          <div className="flex ml-2 space-x-1">
            {isRecommended && (
              <span className="inline-flex items-center rounded-full bg-feira-orange/10 px-2 py-0.5 text-xs font-medium text-feira-orange">
                Recomendado
              </span>
            )}
            {isSeasonal && (
              <span className="inline-flex items-center rounded-full bg-feira-green/10 px-2 py-0.5 text-xs font-medium text-feira-green">
                Da Estação
              </span>
            )}
          </div>
        </div>
        
        {category && (
          <span className="text-xs text-muted-foreground">
            {category}
          </span>
        )}
      </div>
      
      <div className="flex items-center">
        {price && (
          <span className={cn(
            "text-sm mr-4 font-medium", 
            isChecked ? "text-muted-foreground" : "text-feira-green-dark"
          )}>
            R$ {price.toFixed(2)}
          </span>
        )}
        
        <div className="flex items-center border border-input rounded-md">
          <button 
            onClick={handleDecrease}
            disabled={currentAmount <= 1}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Diminuir quantidade"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm">{currentAmount}{unit}</span>
          <button 
            onClick={handleIncrease}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Aumentar quantidade"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
