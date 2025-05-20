
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShoppingLists from "./pages/ShoppingLists";
import ShoppingListDetail from "./pages/ShoppingListDetail";
import NewShoppingList from "./pages/NewShoppingList";
import ProductRegistration from "./pages/ProductRegistration";
import AIChat from "./pages/AIChat";
import AIPersonalized from "./pages/AIPersonalized";
import Seasonality from "./pages/Seasonality";
import Reminders from "./pages/Reminders";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listas" element={<ShoppingLists />} />
          <Route path="/lista/:id" element={<ShoppingListDetail />} />
          <Route path="/nova-lista" element={<NewShoppingList />} />
          <Route path="/cadastrar-produto" element={<ProductRegistration />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/ai-personalized" element={<AIPersonalized />} />
          <Route path="/seasonality" element={<Seasonality />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/history" element={<History />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/estatisticas" element={<Statistics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
