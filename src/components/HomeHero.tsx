
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  const navigate = useNavigate();

  const handleCreateNewList = () => {
    navigate("/nova-lista");
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold mb-2 text-center text-black animate-pulse-subtle">Olá, bem-vindo!</h1>
        <p className="text-black text-center animate-fade-in" style={{animationDelay: "200ms"}}>
          Organize suas compras de forma inteligente e economize tempo e dinheiro.
        </p>
      </div>

      <Button 
        className="bg-feira-green hover:bg-feira-green-dark text-white w-full mb-8 animate-fade-in hover:scale-105 transition-transform"
        style={{animationDelay: "300ms"}}
        size="lg"
        onClick={handleCreateNewList}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Criar Nova Lista de Compras
      </Button>
    </div>
  );
}
