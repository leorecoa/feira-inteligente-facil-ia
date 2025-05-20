
import { ShoppingBag, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ShoppingListCardProps {
  id: string;
  name: string;
  itemCount: number;
  date: string;
  isActive?: boolean;
  className?: string;
}

export default function ShoppingListCard({
  id,
  name,
  itemCount,
  date,
  isActive = false,
  className,
}: ShoppingListCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:border-feira-green/50 overflow-hidden group", 
        isActive && "border-feira-green/70",
        className
      )}
      onClick={() => navigate(`/lista/${id}`)}
    >
      <div className="flex items-center p-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isActive ? "bg-feira-green/10" : "bg-muted"
        )}>
          <ShoppingBag 
            className={cn(
              "h-5 w-5", 
              isActive ? "text-feira-green" : "text-muted-foreground"
            )} 
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-medium leading-tight">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-feira-green transition-colors" />
      </div>
    </Card>
  );
}
