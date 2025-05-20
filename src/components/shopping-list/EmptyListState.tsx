
import { ShoppingBag } from "lucide-react";

export default function EmptyListState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center mb-6">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg">Lista vazia</h3>
      <p className="text-muted-foreground mt-1">
        Adicione itens à sua lista usando a barra de busca acima
      </p>
    </div>
  );
}
