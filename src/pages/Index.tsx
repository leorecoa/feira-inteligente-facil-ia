
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageContainer from "@/components/PageContainer";
import AISuggestions from "@/components/AISuggestions";
import SeasonalProducts from "@/components/SeasonalProducts";
import HomeHero from "@/components/HomeHero";
import RecentShoppingLists from "@/components/RecentShoppingLists";
import HomeFeatures from "@/components/HomeFeatures";
import AIChatButton from "@/components/AIChatButton";

export default function Index() {
  const { toast } = useToast();
  const [recentLists, setRecentLists] = useState([
    // All mock lists removed to clean the app for first use
  ]);

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
        <HomeHero />
        
        {recentLists.length > 0 && (
          <RecentShoppingLists lists={recentLists} />
        )}
        
        <div className="animate-fade-in" style={{animationDelay: "500ms"}}>
          <AISuggestions />
        </div>
        
        <div className="animate-fade-in" style={{animationDelay: "600ms"}}>
          <SeasonalProducts />
        </div>
        
        <HomeFeatures />
      </PageContainer>
      
      <AIChatButton />
      
      <BottomNav />
    </div>
  );
}
