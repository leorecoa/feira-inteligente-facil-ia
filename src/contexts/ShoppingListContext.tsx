
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, ShoppingItem } from "@/components/shopping-list/types";

interface ShoppingListContextType {
  listName: string;
  setListName: (name: string) => void;
  items: ShoppingItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  newItemName: string;
  setNewItemName: (name: string) => void;
  isAddingItem: boolean;
  setIsAddingItem: (isAdding: boolean) => void;
  handleAddItem: (product: Product) => void;
  handleCreateCustomItem: () => void;
  handleRemoveItem: (id: string) => void;
  handleToggleItem: (id: string, checked: boolean) => void;
  handleAmountChange: (id: string, amount: number) => void;
  totalItems: number;
  totalPrice: number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
};

interface ShoppingListProviderProps {
  children: ReactNode;
  initialProducts?: Product[];
}

export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ 
  children, 
  initialProducts = [] 
}) => {
  const [listName, setListName] = useState("Nova Lista");
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAddItem = (product: Product) => {
    // Add item with zero price
    setItems([...items, { 
      ...product, 
      id: `item-${Date.now()}`, 
      price: 0, // Set price to zero
      amount: 1, 
      isChecked: false 
    }]);
    setSearchTerm("");
  };

  const detectCategory = (name: string): string => {
    const nameLower = name.toLowerCase().trim();
    
    // Açougue
    if (/carne|bife|frango|porco|linguiça|costela|alcatra|cupim|músculo|picanha|peito|coxa|asa|lombo|miúdos/i.test(nameLower)) {
      return "acougue";
    }
    
    // Bebês
    if (/fralda|chupeta|bebê|mamadeira|lenço umedecido|manta|shampoo bebê|sabonete bebê/i.test(nameLower)) {
      return "bebes";
    }
    
    // Bebidas
    if (/refrigerante|suco|água|cerveja|vinho|whisky|conhaque|vodca|destilado/i.test(nameLower)) {
      return "bebidas";
    }
    
    // Congelados
    if (/congelado|sorvete|pizza|gelo|nugget|empanado/i.test(nameLower)) {
      return "congelados";
    }
    
    // Eletrônicos
    if (/liquidificador|batedeira|televisor|geladeira|freezer|ventilador|aspirador|secador|balança|churrasqueira/i.test(nameLower)) {
      return "eletronicos";
    }
    
    // Enlatados
    if (/lata|enlatado|atum|sardinha|milho|ervilha|leite condensado|creme de leite|azeite|óleo/i.test(nameLower)) {
      return "enlatados";
    }
    
    // Frutas
    if (/maçã|banana|abacaxi|laranja|uva|morango|pera|melancia|melão|kiwi|manga|limão/i.test(nameLower)) {
      return "frutas";
    }
    
    // Legumes
    if (/tomate|cenoura|batata|cebola|beterraba|abóbora|abobrinha|berinjela|pepino|pimentão/i.test(nameLower)) {
      return "legumes";
    }
    
    // Verduras
    if (/alface|couve|rúcula|espinafre|agrião|repolho|acelga|salsa|cebolinha|coentro/i.test(nameLower)) {
      return "verduras";
    }
    
    // Laticínios
    if (/leite|manteiga|requeijão|iogurte|queijo|cream cheese|sobremesa láctea|danoninho|petit suisse/i.test(nameLower)) {
      return "laticinios";
    }
    
    // Material de limpeza
    if (/detergente|amaciante|flanela|sabão|água sanitária|tira manchas|pano|saco de lixo|balde|vassoura|rodo|palha de aço/i.test(nameLower)) {
      return "limpeza";
    }
    
    // Mercearia
    if (/feijão|arroz|aveia|açúcar|sal|farinha|cereal|café|macarrão|grão/i.test(nameLower)) {
      return "mercearia";
    }
    
    // Padaria
    if (/pão|pães|salgado|doce|bolo|torta|croissant|sonho|rosca|broa/i.test(nameLower)) {
      return "padaria";
    }
    
    // Peixaria
    if (/peixe|salmão|atum|sardinha|camarão|lula|polvo|frutos do mar|marisco|bacalhau/i.test(nameLower)) {
      return "peixaria";
    }
    
    // Pet
    if (/ração|brinquedo|pet|coleira|tapete|areia|gato|cachorro|pássaro|casinha|comedouro/i.test(nameLower)) {
      return "pet";
    }
    
    return "Outros";
  };

  const handleCreateCustomItem = () => {
    if (newItemName.trim()) {
      // Detect category based on name keywords
      const category = detectCategory(newItemName);
      
      const newItem: ShoppingItem = {
        id: `item-${Date.now()}`,
        name: newItemName.trim(),
        category: category, 
        price: 0, // Set price to zero
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

  const totalItems = items.length;
  // Since all prices are now zero, this will always be zero
  const totalPrice = 0;

  const value = {
    listName,
    setListName,
    items,
    searchTerm,
    setSearchTerm,
    newItemName,
    setNewItemName,
    isAddingItem,
    setIsAddingItem,
    handleAddItem,
    handleCreateCustomItem,
    handleRemoveItem,
    handleToggleItem,
    handleAmountChange,
    totalItems,
    totalPrice
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
