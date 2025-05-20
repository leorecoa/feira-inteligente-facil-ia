
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

  const handleCreateCustomItem = () => {
    if (newItemName.trim()) {
      // Try to determine category based on name keywords
      let category = "Outros";
      
      const name = newItemName.toLowerCase();
      
      if (name.includes("carne") || name.includes("bife") || name.includes("frango") || 
          name.includes("porco") || name.includes("linguiça") || name.includes("costela")) {
        category = "acougue";
      } else if (name.includes("fralda") || name.includes("chupeta") || name.includes("bebê") || 
                name.includes("mamadeira")) {
        category = "bebes";
      } else if (name.includes("refrigerante") || name.includes("suco") || name.includes("água") || 
                name.includes("cerveja") || name.includes("vinho")) {
        category = "bebidas";
      } else if (name.includes("congelado") || name.includes("sorvete") || name.includes("pizza") || 
                name.includes("gelo")) {
        category = "congelados";
      } else if (name.includes("liquidificador") || name.includes("batedeira") || 
                name.includes("televisor") || name.includes("geladeira")) {
        category = "eletronicos";
      } else if (name.includes("lata") || name.includes("enlatado") || name.includes("atum") || 
                name.includes("sardinha") || name.includes("milho") || name.includes("ervilha")) {
        category = "enlatados";
      } else if (name.includes("maçã") || name.includes("banana") || name.includes("abacaxi") || 
                name.includes("laranja")) {
        category = "frutas";
      } else if (name.includes("tomate") || name.includes("cenoura") || name.includes("batata") || 
                name.includes("cebola")) {
        category = "legumes";
      } else if (name.includes("alface") || name.includes("couve") || name.includes("rúcula") || 
                name.includes("espinafre")) {
        category = "verduras";
      }
      
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
