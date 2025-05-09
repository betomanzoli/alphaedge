
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for performance charts
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

// Add proper TypeScript interface for CustomTooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-trading-dark border border-gray-700 rounded p-3">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const PerformanceAnalysis = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="portfolio">
        <TabsList className="bg-trading-darker border-gray-700">
          <TabsTrigger value="portfolio">Portfolio Value</TabsTrigger>
          <TabsTrigger value="accumulation">Token Accumulation</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="pt-4">
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
        </TabsContent>
        
        <TabsContent value="accumulation" className="pt-4">
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
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceAnalysis;
