
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingBotControls from "./TradingBotControls";
import TokenBalanceCard from "./TokenBalanceCard";
import PriceChart from "./PriceChart";
import StrategyConfiguration from "./StrategyConfiguration";
import TransactionHistory from "./TransactionHistory";

const TradingBotDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  
  // Mock function to toggle bot status
  const toggleBotStatus = () => {
    setIsRunning(prev => !prev);
  };

  useEffect(() => {
    // Carregar estado inicial do bot aqui
    // Em uma implementação real, isso viria da API
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TokenBalanceCard 
          tokenSymbol="opXEN" 
          tokenAmount={10000} 
          tokenValue={1250} 
          className="md:col-span-2" 
        />
        <TokenBalanceCard 
          tokenSymbol="ETH" 
          tokenAmount={0.5} 
          tokenValue={1000} 
          className="md:col-span-1" 
        />
      </div>

      <div className="bg-trading-darker border border-gray-800 rounded-lg p-4">
        <PriceChart />
      </div>

      <TradingBotControls 
        isRunning={isRunning} 
        onToggle={toggleBotStatus} 
      />

      <Tabs defaultValue="strategy" className="mt-6">
        <TabsList className="bg-trading-darker border-gray-800">
          <TabsTrigger value="strategy">Estratégias</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategy" className="mt-4">
          <StrategyConfiguration />
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <TransactionHistory />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <div className="bg-trading-darker border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Performance do Bot</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-trading-dark border border-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Total Acumulado (opXEN)</div>
                <div className="text-2xl font-bold mt-2">+2,345</div>
                <div className="text-trading-profit text-sm mt-1">+12.5%</div>
              </div>
              
              <div className="bg-trading-dark border border-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Trades Realizados</div>
                <div className="text-2xl font-bold mt-2">28</div>
                <div className="text-gray-400 text-sm mt-1">Últimas 24h: 5</div>
              </div>
              
              <div className="bg-trading-dark border border-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Taxa de Sucesso</div>
                <div className="text-2xl font-bold mt-2">78%</div>
                <div className="text-gray-400 text-sm mt-1">Ganhos/Total</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingBotDashboard;
