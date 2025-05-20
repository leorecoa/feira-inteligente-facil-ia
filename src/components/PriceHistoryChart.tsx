
import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from "recharts";
import { Card } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";

interface PriceData {
  month: string;
  price: number;
  avg: number;
}

interface PriceHistoryChartProps {
  productName: string;
  className?: string;
}

export default function PriceHistoryChart({ 
  productName,
  className 
}: PriceHistoryChartProps) {
  const [data, setData] = useState<PriceData[]>([]);
  
  useEffect(() => {
    // Simulating API call for price history
    const mockData: PriceData[] = [
      { month: "Jan", price: 3.5, avg: 3.2 },
      { month: "Fev", price: 3.8, avg: 3.3 },
      { month: "Mar", price: 3.2, avg: 3.4 },
      { month: "Abr", price: 2.9, avg: 3.3 },
      { month: "Mai", price: 2.7, avg: 3.1 },
      { month: "Jun", price: 3.0, avg: 3.0 },
    ];
    
    setData(mockData);
  }, []);
  
  return (
    <Card className={className}>
      <div className="p-4">
        <SectionTitle>Histórico de Preços: {productName}</SectionTitle>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `R$${value}`}
                domain={[
                  (dataMin: number) => Math.floor(dataMin * 0.9),
                  (dataMax: number) => Math.ceil(dataMax * 1.1)
                ]}
              />
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                name="Seu Preço"
                stroke="#4CAF50"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="avg"
                name="Média da Região"
                stroke="#FF9800"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Economia total no período: <span className="text-feira-green font-medium">R$ 8,50</span> (comparado à média local)
        </p>
      </div>
    </Card>
  );
}
