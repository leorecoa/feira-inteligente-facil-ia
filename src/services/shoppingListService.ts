
import { ShoppingItem, Product } from "@/components/shopping-list/types";

export interface SavedShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: string;
  totalPrice: number;
}

// In a real application, this would be stored in a database
// For this implementation, we'll use localStorage
const STORAGE_KEY = 'feira_intelligent_shopping_lists';

export const getShoppingLists = (): SavedShoppingList[] => {
  const storedLists = localStorage.getItem(STORAGE_KEY);
  if (!storedLists) return [];
  
  try {
    return JSON.parse(storedLists);
  } catch (error) {
    console.error('Error parsing shopping lists from storage:', error);
    return [];
  }
};

export const saveShoppingList = (name: string, items: ShoppingItem[]): SavedShoppingList => {
  const lists = getShoppingLists();
  
  const newList: SavedShoppingList = {
    id: `list-${Date.now()}`,
    name: name || 'Lista sem nome',
    items,
    createdAt: new Date().toISOString(),
    totalPrice: items.reduce((sum, item) => sum + (item.price || 0) * (item.amount || 1), 0)
  };
  
  lists.push(newList);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  
  return newList;
};

export const getShoppingListById = (id: string): SavedShoppingList | undefined => {
  const lists = getShoppingLists();
  return lists.find(list => list.id === id);
};

export const updateShoppingList = (id: string, updatedList: Partial<SavedShoppingList>): SavedShoppingList | null => {
  const lists = getShoppingLists();
  const index = lists.findIndex(list => list.id === id);
  
  if (index === -1) return null;
  
  const updatedItem = {
    ...lists[index],
    ...updatedList,
    // If items have been updated, recalculate total price
    ...(updatedList.items && {
      totalPrice: updatedList.items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.amount || 1), 
        0
      )
    })
  };
  
  lists[index] = updatedItem;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  
  return updatedItem;
};

export const deleteShoppingList = (id: string): boolean => {
  const lists = getShoppingLists();
  const filteredLists = lists.filter(list => list.id !== id);
  
  if (filteredLists.length === lists.length) {
    return false; // No list was removed
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLists));
  return true;
};
