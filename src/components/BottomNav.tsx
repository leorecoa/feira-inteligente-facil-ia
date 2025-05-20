
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, List, BarChart3, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-feira-green border-t py-2 px-6 z-50 flex items-center justify-between">
      <Link
        to="/"
        className={`flex flex-col items-center ${
          path === "/" ? "text-feira-orange font-medium" : "text-black"
        }`}
      >
        <Home className="h-6 w-6 text-yellow-400" />
        <span className="text-xs mt-1">Início</span>
      </Link>

      <Link
        to="/listas"
        className={`flex flex-col items-center ${
          path.includes("/lista") ? "text-feira-orange font-medium" : "text-black"
        }`}
      >
        <ShoppingCart className="h-6 w-6 text-yellow-400" />
        <span className="text-xs mt-1">Compras</span>
      </Link>

      <Link
        to="/history"
        className={`flex flex-col items-center ${
          path === "/history" ? "text-feira-orange font-medium" : "text-black"
        }`}
      >
        <List className="h-6 w-6 text-yellow-400" />
        <span className="text-xs mt-1">Histórico</span>
      </Link>

      <Link
        to="/estatisticas"
        className={`flex flex-col items-center ${
          path === "/estatisticas" ? "text-feira-orange font-medium" : "text-black"
        }`}
      >
        <BarChart3 className="h-6 w-6 text-yellow-400" />
        <span className="text-xs mt-1">Estatísticas</span>
      </Link>

      <Link
        to="/perfil"
        className={`flex flex-col items-center ${
          path === "/perfil" ? "text-feira-orange font-medium" : "text-black"
        }`}
      >
        <User className="h-6 w-6 text-yellow-400" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
