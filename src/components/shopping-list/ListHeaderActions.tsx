
import React from "react";
import { Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ListHeaderActionsProps {
  onShare: () => void;
  onMore: () => void;
}

export default function ListHeaderActions({ onShare, onMore }: ListHeaderActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onShare}
        aria-label="Compartilhar lista"
      >
        <Share2 className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onMore}
        aria-label="Mais opções"
      >
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
}
