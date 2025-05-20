
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";

interface SeasonalProduct {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
}

export default function SeasonalProducts() {
  const [products, setProducts] = useState<SeasonalProduct[]>([]);
  
  useEffect(() => {
    // Simulating API call to get seasonal products
    const currentMonth = new Date().getMonth();
    
    // Sample seasonal data (would come from an API in real app)
    const seasonalData: {[key: number]: SeasonalProduct[]} = {
      // Each month has different seasonal products (just a few examples)
      0: [ // January
        { id: "1", name: "Abacaxi", imageSrc: "/placeholder.svg", price: 5.99 },
        { id: "2", name: "Caju", imageSrc: "/placeholder.svg", price: 3.49 },
        { id: "3", name: "Ameixa", imageSrc: "/placeholder.svg", price: 7.99 },
        { id: "4", name: "Manga", imageSrc: "/placeholder.svg", price: 2.99 },
      ],
      // Add more months...
      4: [ // May (current month for this example)
        { id: "5", name: "Abacate", imageSrc: "/placeholder.svg", price: 6.99 },
        { id: "6", name: "Banana Prata", imageSrc: "/placeholder.svg", price: 2.49 },
        { id: "7", name: "Laranja", imageSrc: "/placeholder.svg", price: 3.29 },
        { id: "8", name: "Mexerica", imageSrc: "/placeholder.svg", price: 4.99 },
      ],
    };
    
    setProducts(seasonalData[currentMonth] || seasonalData[4]); // Fallback to May if no data
  }, []);
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <SectionTitle className="mb-0">Frutas da Estação</SectionTitle>
        <button className="flex items-center text-sm text-feira-green font-medium">
          Ver todas <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-3 -mx-4 px-4 scrollbar-hide">
        {products.map((product) => (
          <Card key={product.id} className={cn(
            "flex-shrink-0 w-32 overflow-hidden transition-all",
            "hover:border-feira-green/50 cursor-pointer"
          )}>
            <div className="w-full h-24 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={product.imageSrc} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-2 right-2 bg-feira-green text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  Da Estação
                </span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <p className="text-feira-green-dark text-sm font-medium mt-1">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
