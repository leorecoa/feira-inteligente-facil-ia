
import { Calendar, History, Leaf, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";
import SectionTitle from "./SectionTitle";

export default function HomeFeatures() {
  const navigate = useNavigate();

  const handleAIPersonalized = () => {
    navigate("/ai-personalized");
  };

  const handleSeasonality = () => {
    navigate("/seasonality");
  };

  const handleReminders = () => {
    navigate("/reminders");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="mb-8 animate-fade-in" style={{animationDelay: "700ms"}}>
      <SectionTitle>Recursos Inteligentes</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard
          title="IA Personalizada"
          description="Sugestões com base nos seus hábitos de compra"
          icon={Lightbulb}
          color="green"
          onClick={handleAIPersonalized}
        />
        <FeatureCard
          title="Sazonalidade"
          description="Descubra frutas e verduras da estação"
          icon={Leaf}
          color="orange"
          onClick={handleSeasonality}
        />
        <FeatureCard
          title="Lembretes"
          description="Notificações inteligentes para não esquecer a feira"
          icon={Calendar}
          color="green"
          onClick={handleReminders}
        />
        <FeatureCard
          title="Histórico"
          description="Acompanhe preços e otimize suas compras"
          icon={History}
          color="orange"
          onClick={handleHistory}
        />
      </div>
    </div>
  );
}
