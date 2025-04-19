
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MarketChartProps {
  symbol: string;
}

// Dados de exemplo para o gráfico inicial
const generateChartData = () => {
  return [];
};

const MarketChart = ({ symbol }: MarketChartProps) => {
  const [timeframe, setTimeframe] = useState("1h");
  const [chartData] = useState(generateChartData());
  
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{symbol}</CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-medium mr-2">R$ 0,00</span>
              <span className="text-sm text-gray-400">Dados em tempo real aparecerão após conectar sua API</span>
            </div>
          </div>
          
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
            <TabsList className="bg-trading-dark">
              <TabsTrigger value="5m">5m</TabsTrigger>
              <TabsTrigger value="15m">15m</TabsTrigger>
              <TabsTrigger value="1h">1h</TabsTrigger>
              <TabsTrigger value="4h">4h</TabsTrigger>
              <TabsTrigger value="1d">1d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {chartData.length > 0 ? (
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  orientation="right"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121726',
                    borderColor: '#374151',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#F9FAFB' }}
                  itemStyle={{ color: '#8B5CF6' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 mt-4 flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
            <div className="text-center text-gray-400">
              <p>Sem dados disponíveis</p>
              <p className="text-xs mt-1">Configure sua chave API para visualizar os gráficos em tempo real</p>
              <p className="text-xs mt-4">Acesse "Chaves API" no menu lateral para configurar</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketChart;
