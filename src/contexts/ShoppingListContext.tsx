
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
    setItems([...items, { 
      ...product, 
      id: `item-${Date.now()}`, 
      amount: 1, 
      isChecked: false 
    }]);
    setSearchTerm("");
  };

  const handleCreateCustomItem = () => {
    if (newItemName.trim()) {
      const newItem: ShoppingItem = {
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

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 1), 0);

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
