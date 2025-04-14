
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { date: '2023-04-01', equity: 10000, benchmark: 10000 },
  { date: '2023-04-02', equity: 10120, benchmark: 10050 },
  { date: '2023-04-03', equity: 10340, benchmark: 10080 },
  { date: '2023-04-04', equity: 10280, benchmark: 10130 },
  { date: '2023-04-05', equity: 10450, benchmark: 10190 },
  { date: '2023-04-06', equity: 10680, benchmark: 10160 },
  { date: '2023-04-07', equity: 10820, benchmark: 10210 },
  { date: '2023-04-08', equity: 10790, benchmark: 10250 },
  { date: '2023-04-09', equity: 11020, benchmark: 10290 },
  { date: '2023-04-10', equity: 11240, benchmark: 10340 },
  { date: '2023-04-11', equity: 11180, benchmark: 10310 },
  { date: '2023-04-12', equity: 11450, benchmark: 10350 },
  { date: '2023-04-13', equity: 11600, benchmark: 10410 },
  { date: '2023-04-14', equity: 11820, benchmark: 10430 },
];

const strategyPerformance = [
  { name: 'Trend Following', returns: 8.4, trades: 42, winRate: 64 },
  { name: 'Grid Trading', returns: 6.2, trades: 156, winRate: 72 },
  { name: 'Mean Reversion', returns: 4.5, trades: 28, winRate: 61 },
  { name: 'Breakout', returns: 2.8, trades: 16, winRate: 56 },
  { name: 'Arbitrage', returns: 2.1, trades: 93, winRate: 89 },
];

const pairPerformance = [
  { name: 'BTC/USDT', value: 42 },
  { name: 'ETH/USDT', value: 28 },
  { name: 'BNB/USDT', value: 14 },
  { name: 'SOL/USDT', value: 10 },
  { name: 'Other', value: 6 },
];

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Performance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState("30d");
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Performance</h2>
              <p className="text-gray-400">Analyze trading performance and strategy metrics</p>
            </div>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32 bg-trading-darker border-gray-700">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Grid className="grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Total Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-profit">+18.2%</div>
                <div className="text-sm text-gray-400">vs Benchmark: +4.3%</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Sharpe Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4</div>
                <div className="text-sm text-gray-400">Above 1 is good</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Max Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-loss">-3.8%</div>
                <div className="text-sm text-gray-400">Apr 8 - Apr 11</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5%</div>
                <div className="text-sm text-gray-400">335 trades total</div>
              </CardContent>
            </Card>
          </Grid>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="bg-trading-darker border-gray-800">
              <TabsTrigger value="overview">Performance Overview</TabsTrigger>
              <TabsTrigger value="strategies">Strategy Performance</TabsTrigger>
              <TabsTrigger value="pairs">Trading Pairs</TabsTrigger>
              <TabsTrigger value="metrics">Advanced Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Equity Curve</CardTitle>
                  <CardDescription className="text-gray-400">
                    Portfolio value compared to market benchmark
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0C111B', borderColor: '#333' }}
                          labelStyle={{ color: '#999' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="equity" 
                          name="Portfolio" 
                          stroke="#8B5CF6" 
                          fill="url(#colorEquity)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="benchmark" 
                          name="Benchmark" 
                          stroke="#666" 
                          fill="url(#colorBenchmark)" 
                        />
                        <defs>
                          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#666" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#666" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Strategy Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Performance comparison across different trading strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={strategyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0C111B', borderColor: '#333' }}
                          labelStyle={{ color: '#999' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey="returns" name="Returns %" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pairs" className="mt-6">
              <Grid className="grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-trading-darker text-white border-gray-800">
                  <CardHeader>
                    <CardTitle>Trading Pair Distribution</CardTitle>
                    <CardDescription className="text-gray-400">
                      Contribution to returns by trading pair
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pairPerformance}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pairPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0C111B', borderColor: '#333' }}
                            labelStyle={{ color: '#999' }}
                            formatter={(value, name) => [`${value}%`, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800">
                  <CardHeader>
                    <CardTitle>Pair Performance</CardTitle>
                    <CardDescription className="text-gray-400">
                      Return metrics by trading pair
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-900">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pair</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Return</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Trades</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Win Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">BTC/USDT</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-trading-profit">+9.2%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">125</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">72%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">ETH/USDT</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-trading-profit">+7.8%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">87</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">68%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">BNB/USDT</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-trading-profit">+5.3%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">51</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">64%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">SOL/USDT</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-trading-profit">+12.6%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">39</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">74%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">DOT/USDT</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-trading-loss">-2.1%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">17</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">53%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Advanced Trading Metrics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Statistical and risk-adjusted performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-800">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Alpha</td>
                          <td className="px-6 py-4 whitespace-nowrap">13.9%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Excess return relative to benchmark</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Beta</td>
                          <td className="px-6 py-4 whitespace-nowrap">0.82</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Volatility relative to market</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Sharpe Ratio</td>
                          <td className="px-6 py-4 whitespace-nowrap">2.4</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Risk-adjusted return</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Sortino Ratio</td>
                          <td className="px-6 py-4 whitespace-nowrap">3.1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Return relative to downside risk</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Max Drawdown</td>
                          <td className="px-6 py-4 whitespace-nowrap">-3.8%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Largest peak-to-trough decline</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Profit Factor</td>
                          <td className="px-6 py-4 whitespace-nowrap">2.7</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Gross profit / gross loss</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Calmar Ratio</td>
                          <td className="px-6 py-4 whitespace-nowrap">4.8</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Return / max drawdown</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">Information Ratio</td>
                          <td className="px-6 py-4 whitespace-nowrap">1.8</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">Active return / tracking error</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Performance;
