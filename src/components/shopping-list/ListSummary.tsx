
interface ListSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export default function ListSummary({ totalItems, totalPrice }: ListSummaryProps) {
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
