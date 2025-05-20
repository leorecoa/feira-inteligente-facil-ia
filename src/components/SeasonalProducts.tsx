import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { saveShoppingList } from "@/services/shoppingListService";

interface SeasonalProduct {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
}

export default function SeasonalProducts() {
  const [products, setProducts] = useState<SeasonalProduct[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [latestListId, setLatestListId] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulating API call to get seasonal products
    const currentMonth = new Date().getMonth();
    
    // Sample seasonal data with improved realistic images
    const seasonalData: {[key: number]: SeasonalProduct[]} = {
      // Each month has different seasonal products
      0: [ // January
        { id: "1", name: "Abacaxi", imageSrc: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=800&auto=format&fit=crop", price: 0 },
        { id: "2", name: "Caju", imageSrc: "https://images.unsplash.com/photo-1605493725255-1da5618bc8ce?w=800&auto=format&fit=crop", price: 0 },
        { id: "3", name: "Ameixa", imageSrc: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=800&auto=format&fit=crop", price: 0 },
        { id: "4", name: "Manga", imageSrc: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop", price: 0 },
        { id: "5", name: "Melancia", imageSrc: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&auto=format&fit=crop", price: 0 },
        { id: "6", name: "Pêssego", imageSrc: "https://images.unsplash.com/photo-1595743825637-cdaec953eba7?w=800&auto=format&fit=crop", price: 0 },
      ],
      // Add more months...
      4: [ // May
        { id: "7", name: "Abacate", imageSrc: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop", price: 0 },
        { id: "8", name: "Banana Prata", imageSrc: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop", price: 0 },
        { id: "9", name: "Laranja", imageSrc: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop", price: 0 },
        { id: "10", name: "Mexerica", imageSrc: "/lovable-uploads/addb90dc-f718-4d26-96d6-f2b5fab8b45d.png", price: 0 },
        { id: "11", name: "Maçã", imageSrc: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop", price: 0 },
        { id: "12", name: "Uva", imageSrc: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop", price: 0 },
      ],
    };
    
    setProducts(seasonalData[currentMonth] || seasonalData[4]); // Fallback to May if no data
  }, []);
  
  if (products.length === 0) {
    return null;
  }
  
  const handleSeeAllClick = () => {
    navigate("/seasonality");
  };

  const handleAddToCart = (product: SeasonalProduct) => {
    // Create a new shopping list with just this product
    const newList = saveShoppingList(`Lista ${product.name}`, [{
      id: `item-${Date.now()}`,
      name: product.name,
      category: "Frutas",
      price: product.price,
      amount: 1,
      unit: "kg",
      isChecked: false
    }]);

    // Store the latest list ID for navigation when clicking on toast
    setLatestListId(newList.id);
    
    // Show clickable toast
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com ${product.name}`,
      duration: 5000,
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/listas")}
          className="bg-white hover:bg-gray-100"
        >
          Ver listas
        </Button>
      ),
      // Make the entire toast clickable
      onMouseUp: () => {
        if (newList.id) {
          navigate("/listas");
        }
      },
      className: "cursor-pointer hover:brightness-95 transition-all"
    });
    
    // Optional: Navigate to the new list after a delay (if you still want this behavior)
    // setTimeout(() => {
    //   navigate("/listas");
    // }, 1500);
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <SectionTitle className="mb-0">Frutas da Estação</SectionTitle>
        <button 
          className="flex items-center text-sm text-black font-bold hover:text-feira-green-dark transition-colors"
          onClick={handleSeeAllClick}
        >
          Ver todas <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-3 -mx-4 px-4 scrollbar-hide">
        {products.map((product) => (
          <Card key={product.id} className={cn(
            "flex-shrink-0 w-32 overflow-hidden transition-all",
            "hover:border-feira-green/50 cursor-pointer hover:shadow-md"
          )}>
            <div className="w-full h-32 bg-muted relative">
              <img 
                src={product.imageSrc} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-2 right-2 bg-feira-green text-white text-xs font-medium px-1.5 py-0.5 rounded">
                Da Estação
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <p className="text-feira-green-dark text-sm font-medium mt-1">
                R$ {product.price.toFixed(2)}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 text-feira-green border border-feira-green/30 hover:bg-feira-green/10"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
