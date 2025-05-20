
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveListButtonProps {
  onClick: () => void;
}

export default function SaveListButton({ onClick }: SaveListButtonProps) {
  return (
    <Button
      className="bg-feira-green hover:bg-feira-green-dark text-white w-full"
      size="lg"
      onClick={onClick}
    >
      <Save className="mr-2 h-5 w-5" />
      Salvar Lista
    </Button>
  );
}
