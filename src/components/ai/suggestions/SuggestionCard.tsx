
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuggestionCardProps {
  item: string;
  reason: string;
}

export default function SuggestionCard({ item, reason }: SuggestionCardProps) {
  return (
    <div className="flex justify-between items-start relative z-10">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-feira-green/10 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
          <Lightbulb className="h-6 w-6 text-feira-green group-hover:animate-pulse" />
        </div>
        <div>
          <h3 className="font-medium text-lg text-feira-green-dark">{item}</h3>
          <p className="text-sm text-muted-foreground mt-1">{reason}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="border-feira-green text-feira-green hover:bg-feira-green/10 transition-colors duration-300 group-hover:bg-feira-green group-hover:text-white"
      >
        Adicionar
      </Button>
    </div>
  );
}
