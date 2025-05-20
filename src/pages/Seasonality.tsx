import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SectionTitle from "@/components/SectionTitle";
import { saveShoppingList } from "@/services/shoppingListService";

interface SeasonalItem {
  id: number;
  name: string;
  category: "frutas" | "legumes" | "verduras";
  price: number;
  imageSrc: string;
}

export default function Seasonality() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('pt-BR', { month: 'long' }));
  const [seasonalItems, setSeasonalItems] = useState<SeasonalItem[]>([]);
  const [latestListId, setLatestListId] = useState<string | null>(null);

  useEffect(() => {
    // Simulando chamada para API
    const items: SeasonalItem[] = [
      { 
        id: 1, 
        name: "Abacate", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop" 
      },
      { 
        id: 2, 
        name: "Laranja", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&auto=format&fit=crop" 
      },
      { 
        id: 3, 
        name: "Mexerica", 
        category: "frutas", 
        price: 0, 
        imageSrc: "/lovable-uploads/addb90dc-f718-4d26-96d6-f2b5fab8b45d.png" 
      },
      { 
        id: 4, 
        name: "Abacaxi", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=800&auto=format&fit=crop" 
      },
      { 
        id: 5, 
        name: "Banana", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop" 
      },
      { 
        id: 6, 
        name: "Maçã", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop" 
      },
      { 
        id: 7, 
        name: "Uva", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop" 
      },
      { 
        id: 8, 
        name: "Manga", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop" 
      },
      { 
        id: 9, 
        name: "Melancia", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&auto=format&fit=crop" 
      },
      { 
        id: 10, 
        name: "Morango", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&auto=format&fit=crop" 
      },
      { 
        id: 11, 
        name: "Goiaba", 
        category: "frutas", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop" 
      },
      { 
        id: 12, 
        name: "Abobrinha", 
        category: "legumes", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1594282486552-05a5f0a547c2?w=800&auto=format&fit=crop" 
      },
      { 
        id: 13, 
        name: "Chuchu", 
        category: "legumes", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1608665812983-4c3fbc59d5fd?w=800&auto=format&fit=crop" 
      },
      { 
        id: 14, 
        name: "Cenoura", 
        category: "legumes", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop" 
      },
      { 
        id: 15, 
        name: "Beterraba", 
        category: "legumes", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=800&auto=format&fit=crop" 
      },
      { 
        id: 16, 
        name: "Espinafre", 
        category: "verduras", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1515686619296-3b2136e40f8a?w=800&auto=format&fit=crop" 
      },
      { 
        id: 17, 
        name: "Couve", 
        category: "verduras", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=800&auto=format&fit=crop" 
      },
      { 
        id: 18, 
        name: "Alface", 
        category: "verduras", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1621451537984-a7a0f13502d1?w=800&auto=format&fit=crop" 
      },
      { 
        id: 19, 
        name: "Rúcula", 
        category: "verduras", 
        price: 0, 
        imageSrc: "https://images.unsplash.com/photo-1580717868897-1f38fbc5febf?w=800&auto=format&fit=crop" 
      },
    ];
    setSeasonalItems(items);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = (item: SeasonalItem) => {
    // Create a new shopping list with just this item
    const categoryMap: Record<string, string> = {
      'frutas': 'Frutas',
      'legumes': 'Legumes',
      'verduras': 'Verduras'
    };
    
    const newList = saveShoppingList(`Lista ${item.name}`, [{
      id: `item-${Date.now()}`,
      name: item.name,
      category: categoryMap[item.category] || 'Outros',
      price: item.price,
      amount: 1,
      unit: item.category === 'frutas' ? 'kg' : 'un',
      isChecked: false
    }]);
    
    // Store the latest list ID for navigation when clicking on toast
    setLatestListId(newList.id);
    
    // Show toast with clickable functionality
    toast({
      title: "Lista criada com sucesso",
      description: `Nova lista "${newList.name}" foi criada com ${item.name}`,
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
    
    // Optional: Navigate to the shopping lists after a delay (if you still want this behavior)
    // setTimeout(() => {
    //   navigate("/listas");
    // }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-orange/20 via-white to-feira-orange/10">
      <Header
        leftElement={
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
        title="Sazonalidade"
        showSearch={false}
        showNotification={false}
      />

      <PageContainer>
        <div className="mb-6 bg-feira-orange/10 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-feira-orange/20 flex items-center justify-center mr-3">
              <Leaf className="h-5 w-5 text-feira-orange" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Produtos da Estação</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Mês de {currentMonth}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Produtos da estação geralmente têm melhor qualidade, sabor e preço. Confira o que está na época:
          </p>
        </div>

        <Tabs defaultValue="frutas" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="frutas" className="flex-1">Frutas</TabsTrigger>
            <TabsTrigger value="legumes" className="flex-1">Legumes</TabsTrigger>
            <TabsTrigger value="verduras" className="flex-1">Verduras</TabsTrigger>
          </TabsList>
          
          {["frutas", "legumes", "verduras"].map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {seasonalItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="h-32 bg-muted relative">
                        <img 
                          src={item.imageSrc} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute top-2 right-2 bg-feira-orange text-white text-xs font-medium px-1.5 py-0.5 rounded">
                          Da Estação
                        </span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-feira-orange-dark text-sm font-medium mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-2 text-feira-orange border border-feira-orange/30 hover:bg-feira-orange/10"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
