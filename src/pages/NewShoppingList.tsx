import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, X, Check, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import { useToast } from "@/components/ui/use-toast";
import ProductItem from "@/components/ProductItem";
import ProductRegistrationButton from "@/components/ProductRegistrationButton";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const filteredSuggestions = commonProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !items.some(item => item.name === product.name)
  );

  const handleAddItem = (product: any) => {
    setItems([...items, { ...product, id: `item-${Date.now()}`, amount: 1, isChecked: false }]);
    setSearchTerm("");
    setShowSuggestions(false);
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
    // Por enquanto, vamos apenas simular e navegar de volta
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
        <div className="mb-6">
          <Input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="text-lg font-medium p-3 border-2 focus-visible:ring-feira-green"
            placeholder="Nome da lista"
          />
        </div>

        <div className="mb-4">
          <div className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </div>
          <div className="text-lg font-medium">
            Total estimado: <span className="text-feira-green">R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produto..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
            </div>
            <ProductRegistrationButton />
            <Button
              className="bg-feira-green hover:bg-feira-green-dark text-white"
              size="icon"
              onClick={() => setIsAddingItem(true)}
              aria-label="Adicionar item personalizado"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          {showSuggestions && searchTerm && (
            <Card className="absolute z-10 w-full mt-1 p-2 max-h-60 overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((product) => (
                  <div 
                    key={product.id}
                    className="p-2 hover:bg-muted cursor-pointer rounded flex justify-between items-center"
                    onClick={() => handleAddItem(product)}
                  >
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category}</div>
                    </div>
                    <div className="text-feira-green font-medium">R$ {product.price.toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-muted-foreground text-center">
                  <p>Nenhum produto encontrado</p>
                  <Button 
                    variant="link" 
                    className="text-feira-green p-0 h-auto" 
                    onClick={() => {
                      setNewItemName(searchTerm);
                      setIsAddingItem(true);
                      setShowSuggestions(false);
                    }}
                  >
                    Adicionar "{searchTerm}" como novo item
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>

        {isAddingItem && (
          <Card className="p-4 mb-4">
            <h3 className="font-medium mb-2">Adicionar Item Personalizado</h3>
            <Input
              placeholder="Nome do produto"
              className="mb-3"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setNewItemName("");
                  setIsAddingItem(false);
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
              <Button 
                size="sm"
                className="bg-feira-green hover:bg-feira-green-dark text-white"
                onClick={handleCreateCustomItem}
              >
                <Check className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </Card>
        )}

        {items.length > 0 ? (
          <div className="border border-border rounded-lg overflow-hidden mb-6">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <ProductItem
                  {...item}
                  onToggle={handleToggleItem}
                  onAmountChange={handleAmountChange}
                />
                <button 
                  className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors p-1"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remover item"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center mb-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg">Lista vazia</h3>
            <p className="text-muted-foreground mt-1">
              Adicione itens à sua lista usando a barra de busca acima
            </p>
          </div>
        )}

        <Button
          className="bg-feira-green hover:bg-feira-green-dark text-white w-full"
          size="lg"
          onClick={handleSaveList}
        >
          <Save className="mr-2 h-5 w-5" />
          Salvar Lista
        </Button>
      </PageContainer>
    </div>
  );
}
