
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageContainer from "@/components/PageContainer";
import ShoppingListCard from "@/components/ShoppingListCard";

export default function ShoppingLists() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [lists, setLists] = useState([
    {
      id: "1",
      name: "Feira Semanal",
      itemCount: 12,
      date: "20/05/2025",
      isActive: true,
    },
    {
      id: "2",
      name: "Supermercado Mensal",
      itemCount: 32,
      date: "15/05/2025",
      isActive: false,
    },
    {
      id: "3",
      name: "Frutas e Legumes",
      itemCount: 8,
      date: "10/05/2025",
      isActive: false,
    },
    {
      id: "4",
      name: "Produtos de Limpeza",
      itemCount: 6,
      date: "05/05/2025",
      isActive: false,
    },
  ]);

  const filteredLists = lists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNewList = () => {
    navigate("/nova-lista");
  };

  return (
    <>
      <Header title="Minhas Listas" showSearch={false} />
      
      <PageContainer>
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar listas..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="bg-feira-green hover:bg-feira-green-dark text-white"
            size="icon"
            onClick={handleCreateNewList}
            aria-label="Criar nova lista"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        {filteredLists.length > 0 ? (
          <div className="space-y-3">
            {filteredLists.map((list) => (
              <ShoppingListCard key={list.id} {...list} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            {searchQuery ? (
              <>
                <h3 className="font-medium text-lg">Nenhuma lista encontrada</h3>
                <p className="text-muted-foreground mt-1">
                  Tente buscar com outros termos
                </p>
              </>
            ) : (
              <>
                <h3 className="font-medium text-lg">Nenhuma lista ainda</h3>
                <p className="text-muted-foreground mt-1">
                  Crie sua primeira lista de compras
                </p>
                <Button 
                  className="bg-feira-green hover:bg-feira-green-dark text-white mt-4"
                  onClick={handleCreateNewList}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Criar Lista
                </Button>
              </>
            )}
          </div>
        )}
      </PageContainer>
      
      <BottomNav />
    </>
  );
}
