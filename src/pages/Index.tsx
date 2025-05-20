
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-orange/10">
      <Header 
        onSearchClick={handleSearchClick}
        onNotificationClick={handleNotificationClick}
        backgroundImage="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000"
      />
      
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Olá, bem-vindo!</h1>
          <p className="text-muted-foreground">
            Organize suas compras de forma inteligente e economize tempo e dinheiro.
          </p>
        </div>

        <Button 
          className="bg-feira-green hover:bg-feira-green-dark text-white w-full mb-8"
          size="lg"
          onClick={handleCreateNewList}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Criar Nova Lista de Compras
        </Button>
        
        {recentLists.length > 0 && (
          <div className="mb-8">
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
        
        <AISuggestions />
        
        <SeasonalProducts />
        
        <div className="mb-8">
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
      
      {/* Enhanced AI chat button with label */}
      <div className="fixed bottom-20 right-5 z-50">
        <div className="flex flex-col items-end">
          <div className="bg-white rounded-lg shadow-md py-1 px-3 mb-2 text-sm animate-pulse">
            Peça ajuda à nossa IA!
          </div>
          <Button 
            onClick={handleOpenAIChat}
            size="icon"
            className="h-14 w-14 rounded-full bg-feira-orange hover:bg-feira-orange-dark text-white shadow-lg"
            aria-label="Fale com a IA"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
