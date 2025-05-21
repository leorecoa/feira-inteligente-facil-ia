
import { Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Logo from "./Logo";

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
              <Logo />
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
