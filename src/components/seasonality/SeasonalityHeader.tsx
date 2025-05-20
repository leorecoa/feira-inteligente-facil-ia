
import { Leaf, Calendar } from "lucide-react";

interface SeasonalityHeaderProps {
  currentMonth: string;
}

export default function SeasonalityHeader({ currentMonth }: SeasonalityHeaderProps) {
  return (
    <div className="mb-6 bg-feira-orange/10 p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-feira-orange/20 flex items-center justify-center mr-3">
          <Leaf className="h-5 w-5 text-feira-orange" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Produtos da Estação</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Mês de {currentMonth}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Produtos da estação geralmente têm melhor qualidade, sabor e preço. Confira o que está na época:
      </p>
    </div>
  );
}
