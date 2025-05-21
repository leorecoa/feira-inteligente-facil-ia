
import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailSaveButtonProps {
  onSave: () => void;
}

export default function DetailSaveButton({ onSave }: DetailSaveButtonProps) {
  return (
    <Button
      className="bg-feira-green hover:bg-feira-green-dark text-white w-full"
      size="lg"
      onClick={onSave}
    >
      <Save className="mr-2 h-5 w-5" />
      Salvar Lista
    </Button>
  );
}
