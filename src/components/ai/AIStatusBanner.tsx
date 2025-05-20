
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIStatusBannerProps {
  hasApiKey: boolean;
  onConfigureClick: () => void;
  showSettings: boolean;
}

export default function AIStatusBanner({ 
  hasApiKey, 
  onConfigureClick,
  showSettings 
}: AIStatusBannerProps) {
  if (hasApiKey || showSettings) return null;
  
  return (
    <div className="my-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <KeyRound className="h-5 w-5 text-yellow-500 mr-2" />
        <div>
          <p className="text-sm font-medium">API OpenAI não configurada</p>
          <p className="text-xs text-muted-foreground">Resposta em modo local limitado</p>
        </div>
      </div>
      <Button 
        variant="outline"
        size="sm"
        className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
        onClick={onConfigureClick}
      >
        Configurar
      </Button>
    </div>
  );
}
