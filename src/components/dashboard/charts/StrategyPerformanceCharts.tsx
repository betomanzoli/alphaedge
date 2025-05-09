
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "./CustomTooltip";

// Mock data for charts
const strategyPerformance = [
  { name: "Buy Dip", profit: 12.5 },
  { name: "DCA", profit: 8.2 },
  { name: "Volatility", profit: 15.1 },
];

const assetAllocation = [
  { name: "opXEN", value: 1250 },
  { name: "ETH", value: 1000 },
];

const COLORS = ["#10B981", "#60A5FA", "#F59E0B"];

export const StrategyPerformanceCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle>Strategy Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strategyPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="profit" fill="#10B981" name="Profit %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-trading-darker border-gray-800 mt-6">
        <CardHeader>
          <CardTitle>Trading Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-trading-dark rounded-lg p-4">
              <div className="text-sm text-gray-400">Win Rate</div>
              <div className="text-xl font-bold">75%</div>
              <div className="text-xs text-gray-400">3 out of 4 trades</div>
            </div>
            
            <div className="bg-trading-dark rounded-lg p-4">
              <div className="text-sm text-gray-400">Average ROI</div>
              <div className="text-xl font-bold text-trading-profit">+6.2%</div>
              <div className="text-xs text-gray-400">Per trade</div>
            </div>
            
            <div className="bg-trading-dark rounded-lg p-4">
              <div className="text-sm text-gray-400">Max Drawdown</div>
              <div className="text-xl font-bold text-trading-loss">-3.7%</div>
              <div className="text-xs text-gray-400">May 4, 2025</div>
            </div>
            
            <div className="bg-trading-dark rounded-lg p-4">
              <div className="text-sm text-gray-400">Sharpe Ratio</div>
              <div className="text-xl font-bold">1.8</div>
              <div className="text-xs text-gray-400">7-day trailing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
