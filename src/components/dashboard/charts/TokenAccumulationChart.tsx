
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "./CustomTooltip";

// Mock data for token accumulation
const tokenAccumulation = [
  { date: "05-01", amount: 8000 },
  { date: "05-02", amount: 8000 },
  { date: "05-03", amount: 10000 },
  { date: "05-04", amount: 10000 },
  { date: "05-05", amount: 11500 },
  { date: "05-06", amount: 11500 },
  { date: "05-07", amount: 11500 },
  { date: "05-08", amount: 14500 },
];

export const TokenAccumulationChart = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader>
        <CardTitle>Token Accumulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={tokenAccumulation}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="stepAfter" 
                dataKey="amount" 
                stroke="#60A5FA" 
                fillOpacity={1} 
                fill="url(#colorAmount)"
                name="opXEN Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-trading-dark rounded-lg p-4">
            <div className="text-sm text-gray-400">Total Accumulated</div>
            <div className="text-xl font-bold">14,500 opXEN</div>
          </div>
          
          <div className="bg-trading-dark rounded-lg p-4">
            <div className="text-sm text-gray-400">Avg. Buy Price</div>
            <div className="text-xl font-bold">0.00020 ETH</div>
          </div>
          
          <div className="bg-trading-dark rounded-lg p-4">
            <div className="text-sm text-gray-400">Current Price</div>
            <div className="text-xl font-bold">0.00022 ETH</div>
            <div className="text-xs text-trading-profit mt-1">+10.0%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
