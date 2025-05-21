
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import { ProductItemProps } from "@/components/ProductItem";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import { useToast } from "@/components/ui/use-toast";
import AISuggestions from "@/components/AISuggestions";

// Import our new components
import DetailListSummary from "@/components/shopping-list/DetailListSummary";
import ListHeaderActions from "@/components/shopping-list/ListHeaderActions";
import ItemsListSection from "@/components/shopping-list/ItemsListSection";
import DetailSaveButton from "@/components/shopping-list/DetailSaveButton";

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
        title={listName}
        leftElement={
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
        showSearch={false}
        showNotification={false}
      />
      
      <PageContainer>
        <div className="flex items-center justify-between mb-6">
          <DetailListSummary 
            checkedItems={checkedItems} 
            totalItems={totalItems} 
            totalPrice={totalPrice}
          />
          <ListHeaderActions onShare={handleShare} onMore={handleMore} />
        </div>
        
        <ItemsListSection 
          items={items}
          onToggleItem={handleToggleItem}
          onAmountChange={handleAmountChange}
          onAddItem={handleAddItem}
        />
        
        <AISuggestions />
        
        <PriceHistoryChart productName="Banana Prata" className="mb-6" />
        
        <DetailSaveButton onSave={handleSaveList} />
      </PageContainer>
    </>
  );
}
