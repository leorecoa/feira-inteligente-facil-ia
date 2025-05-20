
import { useRef, useEffect } from "react";
import { Bot, VolumeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Interface for chat messages
export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSpeakMessage: (content: string) => void;
  isSpeaking: boolean;
}

export default function ChatMessageList({ 
  messages, 
  isLoading, 
  onSpeakMessage,
  isSpeaking
}: ChatMessageListProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto py-4 space-y-4"
    >
      {messages.map((message) => (
        <div 
          key={message.id}
          className={cn(
            "flex",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div className={cn(
            "max-w-[80%] p-3 rounded-2xl",
            message.sender === "user" 
              ? "bg-white text-foreground shadow-sm" 
              : "bg-feira-green/20 text-foreground shadow-sm" 
          )}>
            {message.content}
            
            {message.sender === "ai" && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-6 w-6 inline-flex items-center justify-center rounded-full hover:bg-feira-green/30"
                onClick={() => onSpeakMessage(message.content)}
                aria-label={isSpeaking ? "Parar leitura" : "Ler mensagem"}
              >
                <VolumeIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] p-3 bg-feira-green/20 rounded-2xl flex items-center gap-2">
            <div className="animate-pulse">
              <Bot className="h-5 w-5 text-feira-green" />
            </div>
            <span>Digitando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
