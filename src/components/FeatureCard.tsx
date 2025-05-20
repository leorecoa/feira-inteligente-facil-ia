
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: "green" | "orange" | "default";
  className?: string;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  color = "default",
  className,
  onClick,
}: FeatureCardProps) {
  const getColorClass = () => {
    switch (color) {
      case "green":
        return "bg-feira-green/10 text-feira-green";
      case "orange":
        return "bg-feira-orange/10 text-feira-orange";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 h-full transition-all hover:shadow-md", 
        onClick && "cursor-pointer hover:border-feira-green/50",
        className
      )}
      onClick={onClick}
    >
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", getColorClass())}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
