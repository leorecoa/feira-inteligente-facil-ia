
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function GenerateButton({ loading, onClick }: GenerateButtonProps) {
  return (
    <Button 
      className="relative overflow-hidden bg-gradient-to-r from-feira-green to-feira-green-dark hover:from-feira-green-dark hover:to-feira-green text-white shadow-md transition-all duration-500 hover:shadow-lg group"
      onClick={onClick}
      disabled={loading}
    >
      {/* Button shine effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-shine"></span>
      
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analisando compras...
        </div>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
          Gerar Sugestões Inteligentes
        </>
      )}
    </Button>
  );
}
