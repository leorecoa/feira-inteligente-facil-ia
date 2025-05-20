
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomItemFormProps {
  itemName: string;
  onItemNameChange: (value: string) => void;
  onCancel: () => void;
  onAdd: () => void;
}

export default function CustomItemForm({ 
  itemName, 
  onItemNameChange, 
  onCancel, 
  onAdd 
}: CustomItemFormProps) {
  return (
    <Card className="p-4 mb-4">
      <h3 className="font-medium mb-2">Adicionar Item Personalizado</h3>
      <Input
        placeholder="Nome do produto"
        className="mb-3"
        value={itemName}
        onChange={(e) => onItemNameChange(e.target.value)}
        autoFocus
      />
      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-1" />
          Cancelar
        </Button>
        <Button 
          size="sm"
          className="bg-feira-green hover:bg-feira-green-dark text-white"
          onClick={onAdd}
        >
          <Check className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>
    </Card>
  );
}
