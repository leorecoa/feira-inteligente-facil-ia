
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductRegistrationButtonProps {
  className?: string;
}

export default function ProductRegistrationButton({ className }: ProductRegistrationButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cadastrar-produto");
  };

  return (
    <Button
      className={`bg-feira-green hover:bg-feira-green-dark text-white ${className}`}
      size="icon"
      onClick={handleClick}
      aria-label="Cadastrar produto por foto"
    >
      <Camera className="h-5 w-5" />
    </Button>
  );
}
