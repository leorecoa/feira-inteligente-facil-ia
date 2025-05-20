
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
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

// Produtos comuns para sugestão
const commonProducts = [
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
  const [listName, setListName] = useState("Nova Lista");
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAddItem = (product: any) => {
    setItems([...items, { ...product, id: `item-${Date.now()}`, amount: 1, isChecked: false }]);
    setSearchTerm("");
  };

  const handleCreateCustomItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: `item-${Date.now()}`,
        name: newItemName.trim(),
        category: "Outros", 
        price: 0,
        amount: 1,
        unit: "un",
        isChecked: false
      };
      setItems([...items, newItem]);
      setNewItemName("");
      setIsAddingItem(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
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

  const handleSaveList = () => {
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

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 1), 0);

  return (
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
        <ListNameInput value={listName} onChange={setListName} />
        
        <ListSummary totalItems={totalItems} totalPrice={totalPrice} />

        <ProductSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddItem={handleAddItem}
          onCustomItemAdd={(name) => {
            setNewItemName(name);
            setIsAddingItem(true);
          }}
          onAddButtonClick={() => setIsAddingItem(true)}
          products={commonProducts}
          existingItems={items}
        />

        {isAddingItem && (
          <CustomItemForm 
            itemName={newItemName}
            onItemNameChange={setNewItemName}
            onCancel={() => {
              setNewItemName("");
              setIsAddingItem(false);
            }}
            onAdd={handleCreateCustomItem}
          />
        )}

        {items.length > 0 ? (
          <ShoppingItemsList 
            items={items}
            onToggleItem={handleToggleItem}
            onAmountChange={handleAmountChange}
            onRemoveItem={handleRemoveItem}
          />
        ) : (
          <EmptyListState />
        )}

        <SaveListButton onClick={handleSaveList} />
      </PageContainer>
    </div>
  );
}
