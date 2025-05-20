
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SectionTitle from "@/components/SectionTitle";

export default function AIPersonalized() {
  const navigate = useNavigate();
  const [personalizedItems, setPersonalizedItems] = useState([
    { id: 1, name: "Alface Crespa", reason: "Compra frequente a cada 7 dias" },
    { id: 2, name: "Tomate Italiano", reason: "Compra frequente a cada 5 dias" },
    { id: 3, name: "Banana Prata", reason: "Preço mais baixo nos últimos 30 dias" },
    { id: 4, name: "Maçã Gala", reason: "Produto da estação com bom preço" },
    { id: 5, name: "Batata", reason: "Você compra a cada 14 dias em média" },
  ]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-green/10">
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
        title="IA Personalizada"
        showSearch={false}
        showNotification={false}
      />

      <PageContainer>
        <div className="mb-6 bg-feira-green/10 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-feira-green/20 flex items-center justify-center mr-3">
              <Lightbulb className="h-5 w-5 text-feira-green" />
            </div>
            <h2 className="text-lg font-medium">Recomendações Inteligentes</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Com base nos seus hábitos de compra, nossa IA sugere os seguintes itens para a sua próxima feira:
          </p>
        </div>

        <SectionTitle>Sugestões para Você</SectionTitle>
        <div className="space-y-3 mb-6">
          {personalizedItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-feira-green text-feira-green hover:bg-feira-green/10"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Button 
          className="w-full bg-feira-green hover:bg-feira-green-dark text-white"
        >
          Adicionar Todos à Lista
        </Button>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
