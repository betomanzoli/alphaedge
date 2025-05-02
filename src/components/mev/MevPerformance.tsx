
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartData {
  name: string;
  arbitragem: number;
  frontrun: number;
  sandwich: number;
  liquidacao: number;
}

const mockData: ChartData[] = [
  { name: "01/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "02/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "03/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "04/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "05/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "06/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
  { name: "07/05", arbitragem: 0, frontrun: 0, sandwich: 0, liquidacao: 0 },
];

const MevPerformance = () => {
  const [timeframe, setTimeframe] = useState("7d");
  
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance das Estratégias
          </CardTitle>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 bg-trading-dark border-gray-700 h-8 mt-2 sm:mt-0">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              arbitragem: {
                label: "Arbitragem",
                color: "#8B5CF6",
              },
              frontrun: {
                label: "Frontrun",
                color: "#EC4899",
              },
              sandwich: {
                label: "Sandwich",
                color: "#22C55E",
              },
              liquidacao: {
                label: "Liquidação",
                color: "#3B82F6",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="name"
                      labelKey="data"
                      hideLabel
                    />
                  }
                />
                <Bar
                  dataKey="arbitragem"
                  name="Arbitragem"
                  stackId="a"
                  fill="var(--color-arbitragem, #8B5CF6)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="frontrun"
                  name="Frontrun"
                  stackId="a"
                  fill="var(--color-frontrun, #EC4899)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="sandwich"
                  name="Sandwich"
                  stackId="a"
                  fill="var(--color-sandwich, #22C55E)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="liquidacao"
                  name="Liquidação"
                  stackId="a"
                  fill="var(--color-liquidacao, #3B82F6)"
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-trading-dark rounded-lg p-3">
            <div className="text-sm text-gray-400 mb-1">Arbitragem</div>
            <div className="font-medium text-[#8B5CF6]">0.00 ETH</div>
          </div>
          <div className="bg-trading-dark rounded-lg p-3">
            <div className="text-sm text-gray-400 mb-1">Frontrun</div>
            <div className="font-medium text-[#EC4899]">0.00 ETH</div>
          </div>
          <div className="bg-trading-dark rounded-lg p-3">
            <div className="text-sm text-gray-400 mb-1">Sandwich</div>
            <div className="font-medium text-[#22C55E]">0.00 ETH</div>
          </div>
          <div className="bg-trading-dark rounded-lg p-3">
            <div className="text-sm text-gray-400 mb-1">Liquidação</div>
            <div className="font-medium text-[#3B82F6]">0.00 ETH</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MevPerformance;
