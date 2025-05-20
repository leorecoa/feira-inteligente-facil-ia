
import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotification?: boolean;
  className?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  backgroundImage?: string;
  fullCoverBackground?: boolean;
}

export default function Header({
  title,
  showSearch = true,
  showNotification = true,
  className,
  leftElement,
  rightElement,
  onSearchClick,
  onNotificationClick,
  backgroundImage,
  fullCoverBackground = false,
}: HeaderProps) {
  return (
    <header className={cn(
      "bg-background sticky top-0 z-40 border-b border-border relative",
      className
    )}>
      {backgroundImage && (
        <div 
          className={cn(
            "absolute opacity-10 bg-cover bg-center",
            fullCoverBackground ? "fixed inset-0 w-screen h-screen z-0 bg-gradient-to-b from-feira-green/20 via-white to-feira-orange/10" : "inset-0"
          )}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="feira-container flex items-center justify-between h-16 relative z-10">
        <div className="flex-1 flex items-center justify-center">
          {leftElement}
          {title ? (
            <h1 className="text-lg font-medium">{title}</h1>
          ) : (
            <div className="flex items-center justify-center w-full animate-fade-in">
              <div className="flex items-center">
                <span className="text-feira-green font-bold text-xl animate-title-entrance relative">
                  Minha Feira
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-feira-green/30 rounded-full transform scale-x-0 animate-scale-in" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}></span>
                </span>
                <span className="font-bold text-xl text-feira-orange ml-1 animate-title-entrance-delayed relative">
                  Fácil Fácil
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-feira-orange/30 rounded-full transform scale-x-0 animate-scale-in" style={{animationDelay: '1s', animationFillMode: 'forwards'}}></span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {rightElement}
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
