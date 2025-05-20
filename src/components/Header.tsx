
import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotification?: boolean;
  className?: string;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

export default function Header({
  title,
  showSearch = true,
  showNotification = true,
  className,
  onSearchClick,
  onNotificationClick,
}: HeaderProps) {
  return (
    <header className={cn("bg-background sticky top-0 z-40 border-b border-border", className)}>
      <div className="feira-container flex items-center justify-between h-16">
        <div className="flex-1">
          {title ? (
            <h1 className="text-lg font-medium">{title}</h1>
          ) : (
            <div className="flex items-center">
              <span className="text-feira-green font-bold text-xl">Minha Feira</span>
              <span className="font-bold text-xl text-feira-orange ml-1">Fácil Fácil</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {showSearch && (
            <button
              onClick={onSearchClick}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Pesquisar"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          {showNotification && (
            <button
              onClick={onNotificationClick}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground relative"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-feira-orange rounded-full" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
