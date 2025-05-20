
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mic, VolumeIcon, Bot, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Sample quick questions for suggestion buttons
const QUICK_SUGGESTIONS = [
  "O que está na época?",
  "Como armazenar bananas?",
  "Monte minha lista",
  "Dicas para economizar",
  "Substituições mais baratas",
  "Receitas rápidas",
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
      content: "Olá! Sou sua assistente de feira. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

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
      // Simulate API call to AI service
      setTimeout(() => {
        const mockResponses: { [key: string]: string } = {
          "o que está na época": "Neste mês de maio, temos várias frutas e legumes na época: abacate, banana prata, laranja, mexerica, chuchu, abobrinha, cenoura e beterraba. Comprar produtos da estação geralmente significa melhor preço e qualidade!",
          "como armazenar bananas": "Bananas devem ser armazenadas em temperatura ambiente, longe da luz solar direta. Para retardar o amadurecimento, mantenha-as separadas de outras frutas. Se já estiverem maduras, você pode guardar na geladeira por 1-2 dias, mas a casca ficará escura (a fruta continua boa).",
          "monte minha lista": "Com base na sazonalidade atual e nos preços médios, sugiro incluir na sua lista: 1kg de bananas, 1kg de laranjas, 500g de abacate, 2kg de batatas, 500g de cenoura, 1 maço de couve, 6 ovos e 1kg de arroz. Quer que eu adicione mais algum item específico?",
          "dicas para economizar": "Para economizar na feira: 1) Priorize produtos da estação. 2) Compare preços em diferentes bancas. 3) Faça uma lista antes e siga-a. 4) Procure frutas e legumes com pequenas imperfeições estéticas (são mais baratos e igualmente nutritivos). 5) Compre em maior quantidade itens não perecíveis quando estiverem em promoção.",
          "substituições mais baratas": "Algumas substituições econômicas: 1) Em vez de morango (caro fora de época), prefira maçã ou banana. 2) Troque brócolis por couve, que costuma ser mais barata. 3) Substitua pimentão por cebola e cenoura em refogados. 4) Use ovos como fonte de proteína em vez de carnes caras.",
          "receitas rápidas": "Aqui está uma receita rápida com itens básicos: Omelete de legumes - Bata 2 ovos, adicione sal e pimenta. Refogue cebola, tomate e quaisquer legumes que tenha (cenoura ralada, abobrinha). Despeje os ovos batidos e cozinhe até ficar firme. Pronto em 10 minutos!"
        };

        let aiResponse = "Não tenho informações específicas sobre isso, mas posso ajudá-lo com sugestões de produtos da estação, dicas de economia, receitas simples ou estratégias de armazenamento de alimentos.";
        
        // Check if the question matches any key phrases
        const lowercaseContent = content.toLowerCase();
        for (const [key, response] of Object.entries(mockResponses)) {
          if (lowercaseContent.includes(key)) {
            aiResponse = response;
            break;
          }
        }

        // Add AI response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA. Tente novamente mais tarde.",
        variant: "destructive",
      });
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
    // Mock voice input functionality for future implementation
    toast({
      title: "Entrada por voz",
      description: "Esta funcionalidade estará disponível em breve!",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#A8E6A1] via-[#FFF5A1] to-[#F6E9D7]">
      <Header
        className="bg-transparent border-none"
        leftElement={
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
        title="Assistente IA"
        showSearch={false}
        showNotification={false}
      />
      
      <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-4">
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
        
        {/* Message input form */}
        <form onSubmit={handleSubmit} className="flex gap-2 pb-6">
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
              placeholder="Digite sua mensagem..."
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
