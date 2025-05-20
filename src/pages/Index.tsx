import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Calendar, Apple, Brain, MessageCircle, Lightbulb, Leaf, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageContainer from "@/components/PageContainer";
import ShoppingListCard from "@/components/ShoppingListCard";
import FeatureCard from "@/components/FeatureCard";
import SeasonalProducts from "@/components/SeasonalProducts";
import AISuggestions from "@/components/AISuggestions";
import SectionTitle from "@/components/SectionTitle";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recentLists, setRecentLists] = useState([
    {
      id: "1",
      name: "Feira Semanal",
      itemCount: 12,
      date: "20/05/2025",
      isActive: true,
    },
    {
      id: "2",
      name: "Supermercado Mensal",
      itemCount: 32,
      date: "15/05/2025",
      isActive: false,
    },
  ]);

  const handleCreateNewList = () => {
    navigate("/nova-lista");
  };

  const handleSearchClick = () => {
    toast({
      title: "Pesquisa",
      description: "Funcionalidade de pesquisa em desenvolvimento.",
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você tem 3 notificações não lidas.",
    });
  };

  const handleOpenAIChat = () => {
    navigate("/ai-chat");
  };

  const handleAIPersonalized = () => {
    navigate("/ai-personalized");
  };

  const handleSeasonality = () => {
    navigate("/seasonality");
  };

  const handleReminders = () => {
    navigate("/reminders");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  const handleViewAllLists = () => {
    navigate("/listas");
  };

  const openAIHelp = () => {
    toast({
      title: "Assistente de IA",
      description: "O que você gostaria de saber sobre compras, receitas ou planejamento de feira?",
      duration: 4000,
    });
    
    // Small delay before navigating to the chat to allow the toast to be seen
    setTimeout(() => {
      navigate("/ai-chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Full-screen background image with gradient overlay */}
      <div 
        className="full-page-background" 
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000)" }}
      />
      <div className="gradient-overlay" />
      
      <Header 
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
        fullCoverBackground={true}
      />
      
      <PageContainer className="relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-2 text-center text-black animate-pulse-subtle">Olá, bem-vindo!</h1>
          <p className="text-black text-center animate-fade-in" style={{animationDelay: "200ms"}}>
            Organize suas compras de forma inteligente e economize tempo e dinheiro.
          </p>
        </div>

        <Button 
          className="bg-feira-green hover:bg-feira-green-dark text-white w-full mb-8 animate-fade-in hover:scale-105 transition-transform"
          style={{animationDelay: "300ms"}}
          size="lg"
          onClick={handleCreateNewList}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Criar Nova Lista de Compras
        </Button>
        
        {recentLists.length > 0 && (
          <div className="mb-8 animate-fade-in" style={{animationDelay: "400ms"}}>
            <div className="flex justify-between items-center mb-3">
              <SectionTitle className="m-0">Listas Recentes</SectionTitle>
              <Button 
                variant="link" 
                className="text-feira-green p-0 h-auto"
                onClick={handleViewAllLists}
              >
                Ver todas
              </Button>
            </div>
            <div className="space-y-3">
              {recentLists.map((list) => (
                <ShoppingListCard key={list.id} {...list} />
              ))}
            </div>
          </div>
        )}
        
        <div className="animate-fade-in" style={{animationDelay: "500ms"}}>
          <AISuggestions />
        </div>
        
        <div className="animate-fade-in" style={{animationDelay: "600ms"}}>
          <SeasonalProducts />
        </div>
        
        <div className="mb-8 animate-fade-in" style={{animationDelay: "700ms"}}>
          <SectionTitle>Recursos Inteligentes</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard
              title="IA Personalizada"
              description="Sugestões com base nos seus hábitos de compra"
              icon={Lightbulb}
              color="green"
              onClick={handleAIPersonalized}
            />
            <FeatureCard
              title="Sazonalidade"
              description="Descubra frutas e verduras da estação"
              icon={Leaf}
              color="orange"
              onClick={handleSeasonality}
            />
            <FeatureCard
              title="Lembretes"
              description="Notificações inteligentes para não esquecer a feira"
              icon={Calendar}
              color="green"
              onClick={handleReminders}
            />
            <FeatureCard
              title="Histórico"
              description="Acompanhe preços e otimize suas compras"
              icon={History}
              color="orange"
              onClick={handleHistory}
            />
          </div>
        </div>
      </PageContainer>
      
      {/* Enhanced AI chat button with improved label */}
      <div className="fixed bottom-20 right-5 z-50 animate-fade-in" style={{animationDelay: "800ms"}}>
        <div className="flex flex-col items-end">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md py-2 px-4 mb-2 text-sm animate-pulse">
            <p className="font-medium text-feira-green">Peça ajuda à nossa IA!</p>
            <p className="text-xs text-muted-foreground">Receitas, dicas de compras, ideias...</p>
          </div>
          <Button 
            onClick={openAIHelp}
            size="icon"
            className="h-14 w-14 rounded-full bg-feira-orange hover:bg-feira-orange-dark hover:scale-110 text-white shadow-lg transition-all duration-300"
            aria-label="Fale com a IA"
          >
            <MessageCircle className="h-6 w-6 animate-pulse-subtle" />
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
