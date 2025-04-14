
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const walletData = [
  { date: '2023-04-01', balance: 10500 },
  { date: '2023-04-02', balance: 10800 },
  { date: '2023-04-03', balance: 11200 },
  { date: '2023-04-04', balance: 10900 },
  { date: '2023-04-05', balance: 11600 },
  { date: '2023-04-06', balance: 12100 },
  { date: '2023-04-07', balance: 12400 },
];

const assetDistribution = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 25 },
  { name: 'BNB', value: 15 },
  { name: 'SOL', value: 10 },
  { name: 'USDT', value: 5 },
];

const Wallet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Wallet</h2>
            <p className="text-gray-400">Manage your crypto assets and portfolio</p>
          </div>
          
          <Grid className="grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,400.00</div>
                <div className="text-trading-profit text-sm flex items-center mt-1">
                  +18.2% <span className="text-gray-500 ml-1">this month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Margin Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,200.00</div>
                <div className="text-trading-profit text-sm flex items-center mt-1">
                  +7.5% <span className="text-gray-500 ml-1">this month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$7,200.00</div>
                <div className="text-trading-profit text-sm flex items-center mt-1">
                  Available for new positions
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          <Tabs defaultValue="balance" className="mb-6">
            <TabsList className="bg-trading-darker border-gray-800">
              <TabsTrigger value="balance">Balance History</TabsTrigger>
              <TabsTrigger value="distribution">Asset Distribution</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="balance" className="mt-4">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Balance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={walletData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0C111B', borderColor: '#333' }}
                          labelStyle={{ color: '#999' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#8B5CF6" 
                          fill="url(#colorBalance)" 
                        />
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="distribution" className="mt-4">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Asset Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={assetDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0C111B', borderColor: '#333' }}
                          labelStyle={{ color: '#999' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-4">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 border-b border-gray-800">
                        <div>
                          <div className="font-medium">Deposit BTC</div>
                          <div className="text-sm text-gray-400">April {item + 1}, 2023 • 09:24 AM</div>
                        </div>
                        <div className="text-trading-profit">+0.034 BTC</div>
                      </div>
                    ))}
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

export default Wallet;
