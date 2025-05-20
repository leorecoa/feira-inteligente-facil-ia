
import { Button } from "@/components/ui/button";

interface QuickSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export default function QuickSuggestions({ 
  suggestions, 
  onSelectSuggestion 
}: QuickSuggestionsProps) {
  return (
    <div className="pb-4 px-1">
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            className="bg-white/80 border-feira-green/30 text-sm py-1 px-3 rounded-full hover:bg-feira-green/20"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
