
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuggestionCard from "./SuggestionCard";

interface SuggestionsListProps {
  suggestions: {item: string; reason: string}[];
  onNewSuggestions: () => void;
}

export default function SuggestionsList({ suggestions, onNewSuggestions }: SuggestionsListProps) {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-1 gap-3">
        {suggestions.map((item, index) => (
          <Card 
            key={index} 
            className="p-4 hover:shadow-md transition-all duration-500 border-2 border-feira-green/10 hover:border-feira-green/30 bg-gradient-to-r from-white to-feira-green/5 overflow-hidden relative group"
          >
            {/* Card shine effect */}
            <div className="absolute inset-0 w-full h-full bg-white/40 transform -translate-x-full opacity-30 group-hover:animate-shine"></div>
            
            <SuggestionCard item={item.item} reason={item.reason} />
          </Card>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full mt-2 border-feira-green/30 text-feira-green hover:bg-feira-green/10 transition-all duration-300 relative overflow-hidden group"
        onClick={onNewSuggestions}
      >
        {/* Button shine effect */}
        <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
        <span className="relative z-10">Solicitar Novas Sugestões</span>
      </Button>
    </div>
  );
}
