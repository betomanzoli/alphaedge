
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Play, Pause, Settings, PlusCircle, Trash2 } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const strategies = [
  {
    id: "1",
    name: "Grid Trading",
    description: "Buy low and sell high within a price range",
    status: "active",
    symbol: "BTC/USDT",
    profit: "+5.8%",
    lastRun: "Running for 3d 5h"
  },
  {
    id: "2",
    name: "DCA Advanced",
    description: "Dollar cost averaging with variable amounts",
    status: "paused",
    symbol: "ETH/USDT",
    profit: "+2.3%",
    lastRun: "Paused 12h ago"
  },
  {
    id: "3",
    name: "Trend Following",
    description: "Follow market trends using moving averages",
    status: "active",
    symbol: "BTC/USDT",
    profit: "-1.2%",
    lastRun: "Running for 1d 8h"
  },
  {
    id: "4",
    name: "Mean Reversion",
    description: "Capitalize on price returns to the mean",
    status: "inactive",
    symbol: "SOL/USDT",
    profit: "0.0%",
    lastRun: "Never run"
  }
];

const Strategies = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Trading Strategies</h2>
                <p className="text-gray-400 mt-1">Configure and manage your algorithmic trading strategies</p>
              </div>
              <Button className="bg-trading-primary hover:bg-trading-secondary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Strategy
              </Button>
            </div>
            
            <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="bg-trading-darker border-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{strategy.name}</CardTitle>
                      <Badge 
                        variant={
                          strategy.status === "active" ? "success" : 
                          strategy.status === "paused" ? "warning" : "outline"
                        }
                      >
                        {strategy.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trading Pair</span>
                        <span>{strategy.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit/Loss</span>
                        <span className={
                          parseFloat(strategy.profit) > 0 ? "text-trading-profit" : 
                          parseFloat(strategy.profit) < 0 ? "text-trading-loss" : "text-gray-400"
                        }>
                          {strategy.profit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-gray-300">{strategy.lastRun}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 border-t border-gray-800">
                    <Button variant="outline" size="sm" className="border-gray-700">
                      <Settings className="h-4 w-4 mr-1" /> Configure
                    </Button>
                    {strategy.status === "active" ? (
                      <Button variant="destructive" size="sm" className="bg-red-900 hover:bg-red-800">
                        <Pause className="h-4 w-4 mr-1" /> Stop
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="bg-trading-profit hover:bg-green-700">
                        <Play className="h-4 w-4 mr-1" /> Start
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Strategies;
