
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, History as HistoryIcon, TrendingDown, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SectionTitle from "@/components/SectionTitle";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";

interface HistoryItem {
  id: number;
  name: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  lastPurchase: string;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("3m");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { id: 1, name: "Tomate", currentPrice: 6.99, previousPrice: 8.49, priceChange: -17.7, lastPurchase: "15/05/2025" },
    { id: 2, name: "Batata", currentPrice: 5.49, previousPrice: 4.99, priceChange: 10.0, lastPurchase: "15/05/2025" },
    { id: 3, name: "Cebola", currentPrice: 3.99, previousPrice: 4.99, priceChange: -20.0, lastPurchase: "08/05/2025" },
    { id: 4, name: "Banana", currentPrice: 5.99, previousPrice: 5.99, priceChange: 0, lastPurchase: "08/05/2025" },
    { id: 5, name: "Maçã", currentPrice: 8.99, previousPrice: 7.99, priceChange: 12.5, lastPurchase: "01/05/2025" },
  ]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const calculateTotalSavings = () => {
    const savings = historyItems.reduce((total, item) => {
      if (item.priceChange < 0) {
        return total + (Math.abs(item.priceChange) / 100 * item.previousPrice);
      }
      return total;
    }, 0);
    
    return savings.toFixed(2);
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
        title="Histórico de Preços"
        showSearch={false}
        showNotification={false}
      />

      <PageContainer>
        <div className="mb-6 bg-feira-orange/10 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-feira-orange/20 flex items-center justify-center mr-3">
              <HistoryIcon className="h-5 w-5 text-feira-orange" />
            </div>
            <h2 className="text-lg font-medium">Acompanhamento de Preços</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Acompanhe a evolução dos preços de produtos que você compra frequentemente.
          </p>
        </div>

        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-feira-green" />
            Economia Estimada
          </h3>
          <div className="text-2xl font-bold text-feira-green mb-2">
            R$ {calculateTotalSavings()}
          </div>
          <p className="text-xs text-muted-foreground">
            Esta é sua economia estimada nos últimos 30 dias com base nas variações de preço.
          </p>
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <SectionTitle className="m-0">Variação de Preços</SectionTitle>
            <div className="flex border rounded-md overflow-hidden">
              {["1m", "3m", "6m"].map((period) => (
                <button
                  key={period}
                  className={`px-2 py-1 text-xs ${
                    selectedPeriod === period
                      ? "bg-feira-orange text-white"
                      : "bg-white text-muted-foreground"
                  }`}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <Card className="p-4 mb-4">
            <h3 className="font-medium mb-3">Tomate - Últimos {selectedPeriod}</h3>
            <div className="h-40">
              <PriceHistoryChart />
            </div>
          </Card>
        </div>

        <SectionTitle>Produtos Monitorados</SectionTitle>
        <div className="space-y-3">
          {historyItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Última compra: {item.lastPurchase}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">R$ {item.currentPrice.toFixed(2)}</div>
                  <div className={`flex items-center text-xs mt-1 ${
                    item.priceChange < 0 
                      ? 'text-feira-green' 
                      : item.priceChange > 0 
                        ? 'text-destructive' 
                        : 'text-muted-foreground'
                  }`}>
                    {item.priceChange < 0 ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : item.priceChange > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : null}
                    {item.priceChange === 0 
                      ? 'Sem alteração' 
                      : `${item.priceChange > 0 ? '+' : ''}${item.priceChange}%`}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
