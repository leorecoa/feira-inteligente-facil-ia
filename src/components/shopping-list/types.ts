
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
}

export interface ShoppingItem extends Product {
  amount: number;
  isChecked: boolean;
}

export interface ListSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export interface ListNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddItem: (product: Product) => void;
  onCustomItemAdd: (name: string) => void;
  onAddButtonClick: () => void;
  products: Product[];
  existingItems: ShoppingItem[];
}

export interface CustomItemFormProps {
  itemName: string;
  onItemNameChange: (value: string) => void;
  onCancel: () => void;
  onAdd: () => void;
}

export interface ShoppingItemsListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string, checked: boolean) => void;
  onAmountChange: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
}

export interface SaveListButtonProps {
  onClick: () => void;
}
