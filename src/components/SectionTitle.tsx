
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn("text-xl font-medium text-foreground mb-4", className)}>
      {children}
    </h2>
  );
}
