
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SeasonalityHeader from "@/components/seasonality/SeasonalityHeader";
import SeasonalItemsList from "@/components/seasonality/SeasonalItemsList";
import useSeasonalItems from "@/components/seasonality/useSeasonalItems";
import useShoppingToast from "@/components/seasonality/useShoppingToast";

export default function Seasonality() {
  const navigate = useNavigate();
  const { seasonalItems, currentMonth } = useSeasonalItems();
  const { handleAddToCart } = useShoppingToast();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-orange/20 via-white to-feira-orange/10">
      <Header
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
        title="Sazonalidade"
        showSearch={false}
        showNotification={false}
      />

      <PageContainer>
        <SeasonalityHeader currentMonth={currentMonth} />
        <SeasonalItemsList 
          items={seasonalItems} 
          onAddToCart={handleAddToCart} 
        />
      </PageContainer>

      <BottomNav />
    </div>
  );
}
