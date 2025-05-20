
import { Bot } from "lucide-react";

export default function SuggestionPrompt() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-5">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-feira-green/20 to-feira-green/40 flex items-center justify-center shadow-md animate-pulse-subtle">
        <Bot className="h-10 w-10 text-feira-green" />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-feira-green to-feira-green-dark animate-textColorShift">
          Sugestões Personalizadas
        </h3>
        <p className="text-base text-muted-foreground">
          Nossa IA analisa seus hábitos de compra e sugere produtos ideais para você
        </p>
      </div>
    </div>
  );
}
