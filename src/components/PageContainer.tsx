
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBottomPadding?: boolean;
}

export default function PageContainer({ 
  children, 
  className,
  withBottomPadding = true
}: PageContainerProps) {
  return (
    <div className={cn(
      "feira-container py-6", 
      withBottomPadding && "pb-24",
      className
    )}>
      {children}
    </div>
  );
}
