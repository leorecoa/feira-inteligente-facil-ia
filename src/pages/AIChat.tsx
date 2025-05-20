
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { generateAIResponse, AIChatMessage } from "@/utils/aiService";
import ChatMessageList, { Message } from "@/components/ai/ChatMessageList";
import MessageInputForm from "@/components/ai/MessageInputForm";
import QuickSuggestions from "@/components/ai/QuickSuggestions";
import AIFeatureCarousel from "@/components/ai/AIFeatureCarousel";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { QUICK_SUGGESTIONS } from "@/constants/aiSuggestions";

export default function AIChat() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpeaking, speakMessage } = useSpeechSynthesis();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Olá! Sou sua assistente de feira inteligente. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

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
          rightElement={null}
          showSearch={false}
          showNotification={false}
        />
      </div>
      
      <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-4">
        {/* AI Features Carousel */}
        <AIFeatureCarousel />
        
        {/* Chat messages container */}
        <ChatMessageList 
          messages={messages} 
          isLoading={isLoading} 
          onSpeakMessage={speakMessage}
          isSpeaking={isSpeaking}
        />
        
        {/* Quick suggestion buttons */}
        <QuickSuggestions 
          suggestions={QUICK_SUGGESTIONS} 
          onSelectSuggestion={handleSendMessage}
        />
        
        {/* Message input form with custom footer */}
        <MessageInputForm 
          isLoading={isLoading} 
          onSendMessage={handleSendMessage}
          onVoiceInput={handleVoiceInput}
        />
      </div>
    </div>
  );
}
