
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, MoreVertical, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import ProductItem, { ProductItemProps } from "@/components/ProductItem";
import SectionTitle from "@/components/SectionTitle";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import { useToast } from "@/components/ui/use-toast";

export default function ShoppingListDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listName, setListName] = useState("Carregando...");
  const [items, setItems] = useState<ProductItemProps[]>([]);

  useEffect(() => {
    // Simulating API call to get list details
    setTimeout(() => {
      setListName(id === "1" ? "Feira Semanal" : "Lista de Compras");
      setItems([
        {
          id: "1",
          name: "Banana Prata",
          category: "Frutas",
          price: 2.49,
          amount: 1,
          unit: "kg",
          isChecked: false,
          isRecommended: true,
          isSeasonal: true,
        },
        {
          id: "2",
          name: "Tomate",
          category: "Legumes",
          price: 6.99,
          amount: 2,
          unit: "kg",
          isChecked: false,
          isRecommended: false,
          isSeasonal: true,
        },
        {
          id: "3",
          name: "Alface Crespa",
          category: "Verduras",
          price: 3.49,
          amount: 1,
          unit: "un",
          isChecked: true,
          isRecommended: false,
          isSeasonal: false,
        },
        {
          id: "4",
          name: "Maçã",
          category: "Frutas",
          price: 8.90,
          amount: 1,
          unit: "kg",
          isChecked: false,
          isRecommended: true,
          isSeasonal: false,
        },
        {
          id: "5",
          name: "Cenoura",
          category: "Legumes",
          price: 3.99,
          amount: 1,
          unit: "kg",
          isChecked: false,
          isRecommended: false,
          isSeasonal: false,
        },
      ]);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar",
      description: "Funcionalidade de compartilhamento em desenvolvimento.",
    });
  };

  const handleMore = () => {
    toast({
      title: "Mais opções",
      description: "Funcionalidade de opções em desenvolvimento.",
    });
  };

  const handleToggleItem = (id: string, checked: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isChecked: checked } : item
    ));
  };

  const handleAmountChange = (id: string, amount: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, amount } : item
    ));
  };

  const handleAddItem = () => {
    toast({
      title: "Adicionar item",
      description: "Funcionalidade de adicionar item em desenvolvimento.",
    });
  };

  const handleSaveList = () => {
    toast({
      title: "Lista salva",
      description: "Sua lista foi salva com sucesso!",
    });
  };

  const totalItems = items.length;
  const checkedItems = items.filter(item => item.isChecked).length;
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 1), 0);

  return (
    <>
      <Header
        className="px-4"
        title={
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 -ml-2" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span>{listName}</span>
          </div>
        }
        showSearch={false}
        showNotification={false}
      />
      
      <PageContainer>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-muted-foreground">
              {checkedItems} de {totalItems} itens concluídos
            </div>
            <div className="text-lg font-medium">
              Total: <span className="text-feira-green">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              aria-label="Compartilhar lista"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleMore}
              aria-label="Mais opções"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <SectionTitle>Itens da Lista</SectionTitle>
          <div className="border border-border rounded-lg overflow-hidden">
            {items.map((item) => (
              <ProductItem
                key={item.id}
                {...item}
                onToggle={handleToggleItem}
                onAmountChange={handleAmountChange}
              />
            ))}
            <div 
              className="p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleAddItem}
            >
              <span className="flex items-center justify-center text-muted-foreground font-medium">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </span>
            </div>
          </div>
        </div>
        
        <PriceHistoryChart productName="Banana Prata" className="mb-6" />
        
        <Button
          className="bg-feira-green hover:bg-feira-green-dark text-white w-full"
          size="lg"
          onClick={handleSaveList}
        >
          <Save className="mr-2 h-5 w-5" />
          Salvar Lista
        </Button>
      </PageContainer>
    </>
  );
}
