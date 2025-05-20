
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getOpenAIApiKey, setOpenAIApiKey } from "@/utils/aiService";
import { KeyRound, Save, X } from "lucide-react";

interface ApiKeyFormProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ApiKeyForm({ onSave, onCancel }: ApiKeyFormProps) {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(getOpenAIApiKey());
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      setOpenAIApiKey(apiKey.trim());
      toast({
        title: "API Key Salva",
        description: "Sua chave de API foi salva com sucesso e será usada para as consultas à IA.",
      });
      if (onSave) onSave();
    } else {
      toast({
        title: "Chave Inválida",
        description: "Por favor, insira uma chave de API válida.",
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Configurar API OpenAI</h3>
          <p className="text-sm text-muted-foreground">
            Insira sua chave de API da OpenAI para ativar o assistente de IA completo
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">Chave de API da OpenAI</Label>
          <div className="flex">
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={isVisible ? "text" : "password"}
              placeholder="sk-..."
              className="flex-1"
            />
            <Button
              variant="outline"
              type="button"
              onClick={toggleVisibility}
              className="ml-2"
            >
              {isVisible ? "Esconder" : "Mostrar"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Sua chave será salva apenas no armazenamento local do seu navegador
          </p>
        </div>
        
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
          )}
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Salvar Chave
          </Button>
        </div>
      </div>
    </Card>
  );
}
