
import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductRegistrationButton from "@/components/ProductRegistrationButton";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { Product } from "./types";

interface ProductSearchProps {
  products: Product[];
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const { 
    searchTerm, 
    setSearchTerm, 
    handleAddItem, 
    setNewItemName, 
    setIsAddingItem, 
    items 
  } = useShoppingList();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !items.some(item => item.name === product.name)
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSuggestions(true);
  };

  return (
    <div className="relative mb-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1" onClick={handleSearchInputClick}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddItem(product);
                  setShowSuggestions(false);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
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
  );
}
