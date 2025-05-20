
import { useState, useEffect } from "react";
import { SeasonalItemType } from "./SeasonalItem";

export default function useSeasonalItems() {
  const [seasonalItems, setSeasonalItems] = useState<SeasonalItemType[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('pt-BR', { month: 'long' }));

  useEffect(() => {
    // Simulando chamada para API
    const items: SeasonalItemType[] = [
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

  return { seasonalItems, currentMonth };
}
