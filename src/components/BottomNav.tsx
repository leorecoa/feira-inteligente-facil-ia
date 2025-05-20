
import { Home, ShoppingBag, BarChart2, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { name: "Início", icon: Home, path: "/" },
    { name: "Minhas Listas", icon: ShoppingBag, path: "/listas" },
    { name: "Estatísticas", icon: BarChart2, path: "/estatisticas" },
    { name: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive
                  ? "text-feira-green font-medium"
                  : "text-muted-foreground hover:text-feira-green-light"
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive && "fill-feira-green/20")} />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
