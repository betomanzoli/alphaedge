
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tradeHistory = [
  {
    id: '1',
    pair: 'BTC/USDT',
    type: 'Long',
    entryPrice: 65800.50,
    exitPrice: 66200.75,
    amount: 0.15,
    leverage: '10x',
    pnl: 60.04,
    status: 'Closed',
    date: '2023-04-14 09:12:34',
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    type: 'Short',
    entryPrice: 3150.25,
    exitPrice: 3120.50,
    amount: 1.2,
    leverage: '5x',
    pnl: 35.70,
    status: 'Closed',
    date: '2023-04-14 10:23:45',
  },
  {
    id: '3',
    pair: 'BNB/USDT',
    type: 'Long',
    entryPrice: 590.75,
    exitPrice: 580.20,
    amount: 2.5,
    leverage: '3x',
    pnl: -26.38,
    status: 'Closed',
    date: '2023-04-13 14:45:12',
  },
  {
    id: '4',
    pair: 'SOL/USDT',
    type: 'Long',
    entryPrice: 142.30,
    exitPrice: 145.80,
    amount: 10,
    leverage: '2x',
    pnl: 70.00,
    status: 'Closed',
    date: '2023-04-13 16:32:56',
  },
  {
    id: '5',
    pair: 'BTC/USDT',
    type: 'Short',
    entryPrice: 66500.00,
    exitPrice: 66750.50,
    amount: 0.1,
    leverage: '10x',
    pnl: -25.05,
    status: 'Closed',
    date: '2023-04-12 11:24:37',
  },
  {
    id: '6',
    pair: 'ETH/USDT',
    type: 'Long',
    entryPrice: 3050.75,
    exitPrice: 3150.25,
    amount: 1.5,
    leverage: '5x',
    pnl: 149.25,
    status: 'Closed',
    date: '2023-04-12 08:14:22',
  },
];

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState("7d");
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Trade History</h2>
              <p className="text-gray-400">View and analyze your past trading operations</p>
            </div>
            
            <div className="flex space-x-4 items-center">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 bg-trading-darker border-gray-700">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-gray-700">
                Export CSV
              </Button>
            </div>
          </div>
          
          <Grid className="grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Total Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <div className="text-gray-500 text-sm">Last 7 days</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-profit">68.2%</div>
                <div className="text-gray-500 text-sm">87 winning trades</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Average Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-profit">$42.31</div>
                <div className="text-gray-500 text-sm">Per trade</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Total P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-trading-profit">+$5,416.03</div>
                <div className="text-gray-500 text-sm">Last 7 days</div>
              </CardContent>
            </Card>
          </Grid>
          
          <Card className="bg-trading-darker text-white border-gray-800">
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow className="hover:bg-gray-900 border-gray-800">
                      <TableHead className="text-gray-400">Date & Time</TableHead>
                      <TableHead className="text-gray-400">Pair</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400 text-right">Entry Price</TableHead>
                      <TableHead className="text-gray-400 text-right">Exit Price</TableHead>
                      <TableHead className="text-gray-400 text-right">Amount</TableHead>
                      <TableHead className="text-gray-400">Leverage</TableHead>
                      <TableHead className="text-gray-400 text-right">P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.map((trade) => (
                      <TableRow key={trade.id} className="hover:bg-gray-900 border-gray-800">
                        <TableCell className="text-sm">{trade.date}</TableCell>
                        <TableCell className="font-medium">{trade.pair}</TableCell>
                        <TableCell>
                          <Badge className={trade.type === 'Long' ? 'bg-trading-profit' : 'bg-trading-loss'}>
                            {trade.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${trade.entryPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${trade.exitPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{trade.amount}</TableCell>
                        <TableCell>{trade.leverage}</TableCell>
                        <TableCell className={`text-right font-medium ${trade.pnl >= 0 ? 'text-trading-profit' : 'text-trading-loss'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default History;
