
import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Calendar, PieChart as PieChartIcon } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";
import BottomNav from "@/components/BottomNav";

// Sample data - in a real app, this would come from an API
const monthlyPriceData = [
  { name: "Jan", frutas: 65, legumes: 78, outros: 42 },
  { name: "Fev", frutas: 59, legumes: 65, outros: 48 },
  { name: "Mar", frutas: 80, legumes: 59, outros: 40 },
  { name: "Abr", frutas: 81, legumes: 76, outros: 44 },
  { name: "Mai", frutas: 56, legumes: 88, outros: 50 },
  { name: "Jun", frutas: 55, legumes: 71, outros: 45 },
];

const seasonalTrendsData = [
  { name: "Jan", maçã: 4000, banana: 2400, tomate: 2400 },
  { name: "Fev", maçã: 3000, banana: 1398, tomate: 2210 },
  { name: "Mar", maçã: 2000, banana: 9800, tomate: 2290 },
  { name: "Abr", maçã: 2780, banana: 3908, tomate: 2000 },
  { name: "Mai", maçã: 1890, banana: 4800, tomate: 2181 },
  { name: "Jun", maçã: 2390, banana: 3800, tomate: 2500 },
];

const categoryData = [
  { name: "Frutas", value: 35 },
  { name: "Legumes", value: 25 },
  { name: "Laticínios", value: 15 },
  { name: "Carnes", value: 10 },
  { name: "Grãos", value: 8 },
  { name: "Outros", value: 7 },
];

const COLORS = [
  "#4CAF50", // feira-green
  "#FF9800", // feira-orange
  "#8BC34A", // feira-green-light
  "#FFB74D", // feira-orange-light
  "#2E7D32", // feira-green-dark
  "#F57C00", // feira-orange-dark
];

export default function Statistics() {
  const [bubbles, setBubbles] = useState<{ id: number, size: number, x: number, y: number, speed: number, color: string }[]>([]);
  const [activeTab, setActiveTab] = useState("preços");
  
  // Create interactive bubbles for background
  useEffect(() => {
    // Colors from the existing palette
    const colors = [
      "bg-feira-green/20", 
      "bg-feira-orange/20",
      "bg-feira-green-light/20", 
      "bg-feira-orange-light/20"
    ];
    
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20-80px
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: (Math.random() * 0.5 + 0.1), // Different speeds
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setBubbles(initialBubbles);
    
    // Animate bubbles
    const animationFrame = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed > -10 ? bubble.y - bubble.speed : 110, // Reset position when off-screen
          x: bubble.y - bubble.speed <= 0 ? Math.random() * 100 : bubble.x // Randomize x when resetting
        }))
      );
    }, 50);
    
    return () => clearInterval(animationFrame);
  }, []);

  return (
    <>
      <Header title="Estatísticas" />
      <PageContainer>
        <div className="relative">
          {/* Interactive background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
            {bubbles.map(bubble => (
              <div 
                key={bubble.id}
                className={`absolute rounded-full ${bubble.color} animate-pulse-subtle`}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  transition: 'top 0.5s linear'
                }}
              />
            ))}
          </div>

          <div className="space-y-6 py-6 px-4">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-center">Acompanhe seus gastos e tendências</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card className="border-feira-green/20 shadow-md bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-feira-green">
                      <DollarSign className="h-5 w-5" />
                      Economia do Mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">R$ 127,42</p>
                    <p className="text-sm text-muted-foreground">15% de economia comparado ao mês anterior</p>
                  </CardContent>
                </Card>
                
                <Card className="border-feira-orange/20 shadow-md bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-feira-orange">
                      <TrendingUp className="h-5 w-5" />
                      Sazonalidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">Morangos</p>
                    <p className="text-sm text-muted-foreground">Melhor período para comprar este mês</p>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="preços" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border">
                  <TabsTrigger value="preços">Preços</TabsTrigger>
                  <TabsTrigger value="sazonalidade">Sazonalidade</TabsTrigger>
                  <TabsTrigger value="categorias">Categorias</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preços" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-feira-green/20">
                    <CardHeader>
                      <CardTitle>Variação de Preços</CardTitle>
                      <CardDescription>
                        Acompanhe a variação de preços por categoria nos últimos 6 meses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={monthlyPriceData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="frutas" fill="#4CAF50" />
                            <Bar dataKey="legumes" fill="#FF9800" />
                            <Bar dataKey="outros" fill="#9E9E9E" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="sazonalidade" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-feira-orange/20">
                    <CardHeader>
                      <CardTitle>Tendências Sazonais</CardTitle>
                      <CardDescription>
                        Produtos em alta e baixa por temporada
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={seasonalTrendsData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="maçã" stroke="#4CAF50" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="banana" stroke="#FF9800" />
                            <Line type="monotone" dataKey="tomate" stroke="#F44336" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="categorias" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm border-feira-green/20">
                    <CardHeader>
                      <CardTitle>Distribuição por Categoria</CardTitle>
                      <CardDescription>
                        Como seus gastos estão distribuídos por categoria
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="h-[300px] w-full max-w-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {categoryData.map((entry, index) => (
                          <div key={entry.name} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </PageContainer>
      <BottomNav />
    </>
  );
}
