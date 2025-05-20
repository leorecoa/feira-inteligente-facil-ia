import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mic, VolumeIcon, Bot, Lightbulb, ShoppingBag, ChevronRight, Settings, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { generateAIResponse, AIChatMessage, getOpenAIApiKey } from "@/utils/aiService";
import ApiKeyForm from "@/components/ai/ApiKeyForm";

// Sample quick questions for suggestion buttons
const QUICK_SUGGESTIONS = [
  "Monte uma lista para almoço de domingo",
  "Quais legumes estão em safra?",
  "Lista para intolerância à lactose",
  "Frutas mais baratas do mês",
  "Monte uma lista básica",
  "Dicas para economizar",
];

// Interface for chat messages
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIChat() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Olá! Sou sua assistente de feira inteligente. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!getOpenAIApiKey());

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize speech synthesis
  useEffect(() => {
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = "pt-BR";
    speechSynthesisRef.current.rate = 1.0;
    speechSynthesisRef.current.onend = () => setIsSpeaking(false);

    return () => {
      if (speechSynthesisRef.current && isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // Check if API key exists when component mounts
    setHasApiKey(!!getOpenAIApiKey());
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare message history for AI context
      const messageHistory: AIChatMessage[] = messages
        .slice(-5) // Only use last 5 messages for context
        .map(msg => ({
          role: msg.sender === "ai" ? "assistant" : "user",
          content: msg.content
        }));
      
      // Add the new user message
      messageHistory.push({ role: "user", content });
      
      // Get AI response
      const response = await generateAIResponse(messageHistory);
      
      if (response.error) {
        toast({
          title: "Erro",
          description: response.error,
          variant: "destructive",
        });
      } else {
        // Add AI response to chat
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.content,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const handleSpeakMessage = (content: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Start new speech
    speechSynthesisRef.current.text = content;
    window.speechSynthesis.speak(speechSynthesisRef.current);
    setIsSpeaking(true);
  };

  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      toast({
        title: "Fale agora",
        description: "Estou ouvindo você...",
      });
      
      // Implementation would go here - for now we'll just give feedback
      setTimeout(() => {
        toast({
          title: "Entrada por voz",
          description: "Esta funcionalidade estará completa em breve!",
        });
      }, 2000);
    } else {
      toast({
        title: "Não suportado",
        description: "Seu navegador não suporta reconhecimento de voz.",
        variant: "destructive",
      });
    }
  };

  const handleApiKeySaved = () => {
    setShowSettings(false);
    setHasApiKey(true);
    toast({
      title: "Configuração Salva",
      description: "Agora você pode usar o assistente de IA completo com a API da OpenAI.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-orange/10">
      {/* Custom Header with Food-themed Background */}
      <div className="relative bg-gradient-to-r from-feira-green/90 to-feira-orange/80 border-none shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000')] bg-cover bg-center"></div>
        <Header
          className="bg-transparent border-none"
          leftElement={
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-white" 
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          }
          title="Assistente IA"
          rightElement={
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-white"
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Configurações"
            >
              <Settings className="h-5 w-5" />
            </Button>
          }
          showSearch={false}
          showNotification={false}
        />
      </div>
      
      <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-4">
        {/* API Settings Panel */}
        {showSettings && (
          <div className="my-3">
            <ApiKeyForm onSave={handleApiKeySaved} onCancel={() => setShowSettings(false)} />
          </div>
        )}
        
        {/* API Status Banner */}
        {!hasApiKey && !showSettings && (
          <div className="my-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <KeyRound className="h-5 w-5 text-yellow-500 mr-2" />
              <div>
                <p className="text-sm font-medium">API OpenAI não configurada</p>
                <p className="text-xs text-muted-foreground">Resposta em modo local limitado</p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              onClick={() => setShowSettings(true)}
            >
              Configurar
            </Button>
          </div>
        )}
        
        {/* AI Features Carousel */}
        <div className="my-3 px-1 py-2 bg-white/60 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex-shrink-0 px-3 py-1.5 bg-feira-green/10 rounded-lg flex items-center border border-feira-green/20">
              <Lightbulb className="h-4 w-4 text-feira-green mr-1.5" />
              <span className="text-sm whitespace-nowrap">Sugestões inteligentes</span>
            </div>
            <div className="flex-shrink-0 px-3 py-1.5 bg-feira-orange/10 rounded-lg flex items-center border border-feira-orange/20">
              <ShoppingBag className="h-4 w-4 text-feira-orange mr-1.5" />
              <span className="text-sm whitespace-nowrap">Monte listas</span>
              <ChevronRight className="h-3 w-3 ml-1 text-feira-orange/60" />
            </div>
            <div className="flex-shrink-0 px-3 py-1.5 bg-feira-green/10 rounded-lg flex items-center border border-feira-green/20">
              <Bot className="h-4 w-4 text-feira-green mr-1.5" />
              <span className="text-sm whitespace-nowrap">Dicas de economia</span>
              <ChevronRight className="h-3 w-3 ml-1 text-feira-green/60" />
            </div>
          </div>
        </div>
        
        {/* Chat messages container */}
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
                    onClick={() => handleSpeakMessage(message.content)}
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
        
        {/* Quick suggestion buttons */}
        <div className="pb-4 px-1">
          <div className="flex flex-wrap gap-2 justify-center">
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="bg-white/80 border-feira-green/30 text-sm py-1 px-3 rounded-full hover:bg-feira-green/20"
                onClick={() => handleQuickSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Message input form with custom footer */}
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
                onClick={handleVoiceInput}
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
      </div>
    </div>
  );
}
