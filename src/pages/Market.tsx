
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Grid } from "@/components/ui/grid";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketData = [
  { date: '2023-04-01', btc: 28750, eth: 1840, sol: 21.5, bnb: 312 },
  { date: '2023-04-02', btc: 29120, eth: 1860, sol: 22.1, bnb: 318 },
  { date: '2023-04-03', btc: 28900, eth: 1830, sol: 21.8, bnb: 315 },
  { date: '2023-04-04', btc: 29300, eth: 1870, sol: 22.4, bnb: 320 },
  { date: '2023-04-05', btc: 29800, eth: 1900, sol: 22.9, bnb: 324 },
  { date: '2023-04-06', btc: 30100, eth: 1930, sol: 23.5, bnb: 328 },
  { date: '2023-04-07', btc: 30400, eth: 1960, sol: 24.1, bnb: 332 },
];

const volumeData = [
  { date: '2023-04-01', volume: 31.2 },
  { date: '2023-04-02', volume: 28.5 },
  { date: '2023-04-03', volume: 32.7 },
  { date: '2023-04-04', volume: 35.9 },
  { date: '2023-04-05', volume: 37.2 },
  { date: '2023-04-06', volume: 33.5 },
  { date: '2023-04-07', volume: 39.8 },
];

const Market = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d");
  const [selectedAsset, setSelectedAsset] = useState("btc");

  const assetNames = {
    btc: "Bitcoin (BTC)",
    eth: "Ethereum (ETH)",
    sol: "Solana (SOL)",
    bnb: "Binance Coin (BNB)"
  };

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Market Data</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Asset:</span>
                <Select 
                  value={selectedAsset}
                  onValueChange={setSelectedAsset}
                >
                  <SelectTrigger className="w-32 bg-trading-darker border-gray-700">
                    <SelectValue placeholder="Select Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="bnb">BNB</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-sm text-gray-400">Timeframe:</span>
                <Select 
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-24 bg-trading-darker border-gray-700">
                    <SelectValue placeholder="Select Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15m">15m</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="4h">4h</SelectItem>
                    <SelectItem value="1d">1d</SelectItem>
                    <SelectItem value="1w">1w</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="price" className="w-full">
              <TabsList className="bg-trading-darker border-gray-800">
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="orderbook">Orderbook</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
              </TabsList>
              
              <TabsContent value="price" className="pt-4">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{assetNames[selectedAsset]} Price Chart ({selectedTimeframe})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={marketData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            domain={['auto', 'auto']}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#121726',
                              borderColor: '#374151',
                              borderRadius: '0.375rem',
                            }}
                            labelStyle={{ color: '#F9FAFB' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey={selectedAsset} 
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="volume" className="pt-4">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{assetNames[selectedAsset]} Volume ({selectedTimeframe})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={volumeData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#121726',
                              borderColor: '#374151',
                              borderRadius: '0.375rem',
                            }}
                            labelStyle={{ color: '#F9FAFB' }}
                          />
                          <Bar 
                            dataKey="volume"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orderbook" className="pt-4">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{assetNames[selectedAsset]} Orderbook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Bids</h3>
                        <div className="space-y-1">
                          {[...Array(10)].map((_, i) => (
                            <div key={`bid-${i}`} className="flex justify-between">
                              <span className="text-green-500">{(30000 - i * 50).toLocaleString()}</span>
                              <span>{(Math.random() * 2).toFixed(4)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Asks</h3>
                        <div className="space-y-1">
                          {[...Array(10)].map((_, i) => (
                            <div key={`ask-${i}`} className="flex justify-between">
                              <span className="text-red-500">{(30050 + i * 50).toLocaleString()}</span>
                              <span>{(Math.random() * 2).toFixed(4)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="funding" className="pt-4">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{assetNames[selectedAsset]} Funding Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Grid className="grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-trading-dark border-gray-800">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">Current Rate</div>
                          <div className="text-xl font-bold text-green-500">+0.01%</div>
                          <div className="text-xs text-gray-400">Next in 4h 23m</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-trading-dark border-gray-800">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">8h Rate</div>
                          <div className="text-xl font-bold text-red-500">-0.003%</div>
                          <div className="text-xs text-gray-400">Charged at 16:00 UTC</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-trading-dark border-gray-800">
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-400">Daily Average</div>
                          <div className="text-xl font-bold">+0.004%</div>
                          <div className="text-xs text-gray-400">APR: +1.46%</div>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Historical Funding Rates</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { time: '04-01', rate: 0.01 },
                              { time: '04-02', rate: 0.008 },
                              { time: '04-03', rate: -0.003 },
                              { time: '04-04', rate: -0.005 },
                              { time: '04-05', rate: 0.002 },
                              { time: '04-06', rate: 0.007 },
                              { time: '04-07', rate: 0.01 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#121726',
                                borderColor: '#374151',
                              }}
                              formatter={(value) => [`${value}%`, 'Rate']}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="rate" 
                              stroke="#10B981"
                              dot={true}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Market;
