
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

// Mock data for the chart
const generateChartData = () => {
  const data = [];
  const basePrice = 66500;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60000);
    const deviation = Math.random() * 400 - 200;
    const price = basePrice + deviation;
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: price,
    });
  }
  
  return data;
};

const MarketChart = ({ symbol }: MarketChartProps) => {
  const [timeframe, setTimeframe] = useState("1h");
  const [chartData] = useState(generateChartData());
  
  const currentPrice = chartData[chartData.length - 1].price.toFixed(2);
  const previousPrice = chartData[chartData.length - 2].price;
  const change = currentPrice - previousPrice;
  const changePercentage = (change / previousPrice * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{symbol}</CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-medium mr-2">${currentPrice}</span>
              <span className={`text-sm ${isPositive ? 'text-trading-profit' : 'text-trading-loss'}`}>
                {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercentage}%)
              </span>
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
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
      </CardContent>
    </Card>
  );
};

export default MarketChart;
