
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

// Mock data for the chart
const portfolioValue = [
  { date: "05-01", value: 1000 },
  { date: "05-02", value: 1050 },
  { date: "05-03", value: 1120 },
  { date: "05-04", value: 1080 },
  { date: "05-05", value: 1150 },
  { date: "05-06", value: 1200 },
  { date: "05-07", value: 1190 },
  { date: "05-08", value: 1250 },
];

export const PortfolioValueChart = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader>
        <CardTitle>Portfolio Value Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={portfolioValue}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorValue)"
                name="Portfolio Value ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-trading-dark rounded-lg p-4">
            <div className="text-sm text-gray-400">Initial Investment</div>
            <div className="text-2xl font-bold">$1,000.00</div>
            <div className="text-sm text-gray-400 mt-1">0.5 ETH</div>
          </div>
          
          <div className="bg-trading-dark rounded-lg p-4">
            <div className="text-sm text-gray-400">Current Value</div>
            <div className="text-2xl font-bold">$1,250.00</div>
            <div className="text-sm text-trading-profit mt-1">+25.0%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
