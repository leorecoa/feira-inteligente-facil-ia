
import React from "react";

interface DetailListSummaryProps {
  checkedItems: number;
  totalItems: number;
  totalPrice: number;
}

export default function DetailListSummary({ 
  checkedItems, 
  totalItems, 
  totalPrice 
}: DetailListSummaryProps) {
  return (
    <div>
      <div className="text-sm text-muted-foreground">
        {checkedItems} de {totalItems} itens concluídos
      </div>
      <div className="text-lg font-medium">
        Total: <span className="text-feira-green">R$ {totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
