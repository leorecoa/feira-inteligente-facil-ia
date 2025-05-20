
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Bell, Plus, AlarmClock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";
import SectionTitle from "@/components/SectionTitle";
import { useToast } from "@/components/ui/use-toast";

interface Reminder {
  id: number;
  title: string;
  dayOfWeek: string;
  time: string;
  active: boolean;
}

export default function Reminders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Feira Semanal", dayOfWeek: "Sábado", time: "08:00", active: true },
    { id: 2, title: "Verificar Promoções", dayOfWeek: "Quarta", time: "18:30", active: false },
    { id: 3, title: "Supermercado Mensal", dayOfWeek: "Primeiro Domingo", time: "10:00", active: true },
  ]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id 
          ? { ...reminder, active: !reminder.active } 
          : reminder
      )
    );

    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast({
        title: `Lembrete ${reminder.active ? 'desativado' : 'ativado'}`,
        description: `${reminder.title} ${reminder.active ? 'não' : ''} irá te notificar ${reminder.dayOfWeek} às ${reminder.time}.`,
      });
    }
  };

  const handleAddReminder = () => {
    toast({
      title: "Novo Lembrete",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-feira-green/20 via-white to-feira-green/10">
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
        title="Lembretes"
        showSearch={false}
        showNotification={false}
      />

      <PageContainer>
        <div className="mb-6 bg-feira-green/10 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-feira-green/20 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-feira-green" />
            </div>
            <h2 className="text-lg font-medium">Lembretes Inteligentes</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure alertas e lembretes para nunca esquecer de fazer suas compras nos melhores dias e horários.
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <SectionTitle className="m-0">Seus Lembretes</SectionTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-feira-green text-feira-green"
            onClick={handleAddReminder}
          >
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>

        <div className="space-y-3 mb-8">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{reminder.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="mr-3">{reminder.dayOfWeek}</span>
                    <AlarmClock className="h-3 w-3 mr-1" />
                    <span>{reminder.time}</span>
                  </div>
                </div>
                <Switch 
                  checked={reminder.active} 
                  onCheckedChange={() => toggleReminder(reminder.id)}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border border-dashed border-muted-foreground/30">
          <h3 className="font-medium mb-2 flex items-center">
            <Bell className="h-4 w-4 mr-2 text-feira-green" />
            Dica inteligente
          </h3>
          <p className="text-sm text-muted-foreground">
            Configurar lembretes para feiras semanais pode ajudar você a economizar até 20% nas compras, garantindo que você compre produtos frescos regularmente.
          </p>
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
