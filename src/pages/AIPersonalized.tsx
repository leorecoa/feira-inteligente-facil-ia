
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SectionTitle from "@/components/SectionTitle";
import { useToast } from "@/components/ui/use-toast";
import { saveShoppingList } from "@/services/shoppingListService";

export default function AIPersonalized() {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  
  const handleAddItem = (item: { id: number; name: string; reason: string }) => {
    // Create a new shopping list with just this product
    const newList = saveShoppingList(`Lista ${item.name}`, [{
      id: `item-${Date.now()}`,
      name: item.name,
      category: "Outros",
      price: 0,
      amount: 1,
      unit: "un",
      isChecked: false
    }]);
    
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com ${item.name}`,
    });
    
    // Navigate to the lists
    setTimeout(() => {
      navigate("/listas");
    }, 1000);
  };
  
  const handleAddAllItems = () => {
    // Create a new shopping list with all items
    const items = personalizedItems.map(item => ({
      id: `item-${Date.now()}-${item.id}`,
      name: item.name,
      category: "Outros",
      price: 0,
      amount: 1,
      unit: "un",
      isChecked: false
    }));
    
    const newList = saveShoppingList("Lista Personalizada", items);
    
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com todos os itens`,
    });
    
    // Navigate to the lists
    setTimeout(() => {
      navigate("/listas");
    }, 1000);
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
            <h2 className="text-lg font-medium text-black">Recomendações Inteligentes</h2>
          </div>
          <p className="text-sm text-black">
            Com base nos seus hábitos de compra, nossa IA sugere os seguintes itens para a sua próxima feira:
          </p>
        </div>

        <SectionTitle>Sugestões para Você</SectionTitle>
        <div className="space-y-3 mb-6">
          {personalizedItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-black">{item.name}</h3>
                  <p className="text-xs text-black mt-1">{item.reason}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-feira-green text-feira-green hover:bg-feira-green/10"
                  onClick={() => handleAddItem(item)}
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
          onClick={handleAddAllItems}
        >
          Adicionar Todos à Lista
        </Button>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
