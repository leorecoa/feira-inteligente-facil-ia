
import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageInputFormProps {
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onVoiceInput: () => void;
}

export default function MessageInputForm({ 
  isLoading, 
  onSendMessage, 
  onVoiceInput 
}: MessageInputFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative">
      <div className="absolute bottom-full left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className="rounded-t-xl bg-white shadow-lg p-3 border-t border-feira-green/20 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1000')] bg-cover bg-bottom rounded-t-xl"></div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow"
            onClick={onVoiceInput}
          >
            <Mic className="h-5 w-5 text-feira-green" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite ou pergunte algo..."
              className="pr-10 py-6 bg-white rounded-full border-none shadow"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
              disabled={inputValue.trim() === "" || isLoading}
            >
              <Send className="h-5 w-5 text-feira-green" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
