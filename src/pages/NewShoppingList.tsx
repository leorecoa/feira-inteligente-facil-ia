
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import ListNameInput from "@/components/shopping-list/ListNameInput";
import ListSummary from "@/components/shopping-list/ListSummary";
import ProductSearch from "@/components/shopping-list/ProductSearch";
import CustomItemForm from "@/components/shopping-list/CustomItemForm";
import EmptyListState from "@/components/shopping-list/EmptyListState";
import ShoppingItemsList from "@/components/shopping-list/ShoppingItemsList";
import SaveListButton from "@/components/shopping-list/SaveListButton";
import { ShoppingListProvider } from "@/contexts/ShoppingListContext";
import { Product } from "@/components/shopping-list/types";

// Produtos comuns para sugestão
const commonProducts: Product[] = [
  { id: "s1", name: "Banana", category: "Frutas", price: 5.99, unit: "kg" },
  { id: "s2", name: "Maçã", category: "Frutas", price: 8.99, unit: "kg" },
  { id: "s3", name: "Tomate", category: "Legumes", price: 6.99, unit: "kg" },
  { id: "s4", name: "Cebola", category: "Legumes", price: 3.99, unit: "kg" },
  { id: "s5", name: "Alface", category: "Verduras", price: 3.49, unit: "un" },
  { id: "s6", name: "Cenoura", category: "Legumes", price: 3.99, unit: "kg" },
  { id: "s7", name: "Laranja", category: "Frutas", price: 4.99, unit: "kg" },
  { id: "s8", name: "Batata", category: "Legumes", price: 5.49, unit: "kg" },
];

export default function NewShoppingList() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveList = (items: any[], listName: string) => {
    if (items.length === 0) {
      toast({
        title: "Lista vazia",
        description: "Adicione pelo menos um item à sua lista antes de salvar.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você implementaria a lógica de salvamento real
    toast({
      title: "Lista salva",
      description: `"${listName}" foi salva com sucesso!`,
    });

    setTimeout(() => {
      navigate("/listas");
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ShoppingListProvider initialProducts={commonProducts}>
      <div className="min-h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-orange/10">
        <Header
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
          title="Nova Lista"
          showSearch={false}
          showNotification={false}
        />
        
        <PageContainer>
          <ListNameInput />
          
          <ListSummary />

          <ProductSearch products={commonProducts} />

          <ShoppingItemsContext />
          
          <SaveListButtonWithContext onSave={handleSaveList} />
        </PageContainer>
      </div>
    </ShoppingListProvider>
  );
}

function ShoppingItemsContext() {
  const { isAddingItem, items } = useShoppingList();
  
  return (
    <>
      {isAddingItem && <CustomItemForm />}
      
      {items.length > 0 ? <ShoppingItemsList /> : <EmptyListState />}
    </>
  );
}

function SaveListButtonWithContext({ onSave }: { onSave: (items: any[], listName: string) => void }) {
  const { items, listName } = useShoppingList();
  
  return <SaveListButton onClick={() => onSave(items, listName)} />;
}
