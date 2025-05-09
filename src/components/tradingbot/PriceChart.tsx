
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps,
  AreaChart,
  Area
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados de exemplo para o gráfico
const generateMockData = (days: number) => {
  const data = [];
  const basePrice = 0.00025;
  let currentPrice = basePrice;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Simular volatilidade aleatória para o token de baixa liquidez
    const volatility = Math.random() * 0.15;
    const direction = Math.random() > 0.5 ? 1 : -1;
    currentPrice = Math.max(0.00001, currentPrice * (1 + direction * volatility));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: currentPrice,
      volume: Math.floor(Math.random() * 50000) + 5000
    });
  }
  
  return data;
};

const PriceChart = () => {
  const [timeframe, setTimeframe] = useState("7d");
  const [data, setData] = useState(() => generateMockData(7));
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    const days = value === "1d" ? 1 : value === "7d" ? 7 : value === "30d" ? 30 : 90;
    setData(generateMockData(days));
  };
  
  const formatPrice = (price: number) => {
    return price < 0.001 
      ? price.toFixed(8)
      : price.toFixed(4);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-medium">opXEN/ETH</h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-medium mr-2">{formatPrice(data[data.length - 1].price)} ETH</span>
            <span className="text-sm text-trading-profit">+5.2%</span>
          </div>
        </div>
        
        <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-auto">
          <TabsList className="bg-trading-dark">
            <TabsTrigger value="1d">1D</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-72">
        <ChartContainer config={{
          price: { color: "#10B981" },
          volume: { color: "#3B82F6" },
        }}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#333' }}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#333' }}
              tickFormatter={formatPrice}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent 
                      className="bg-trading-dark border-gray-700"
                      payload={payload}
                    />
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <div className="flex justify-between items-center">
          <div>Volume 24h: <span className="text-white">184,250 opXEN</span></div>
          <div>Liquidez: <span className="text-white">$45,320</span></div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
