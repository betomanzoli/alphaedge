
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceMonitoring from "@/components/dashboard/PriceMonitoring";
import BotConfiguration from "@/components/dashboard/BotConfiguration";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import PerformanceAnalysis from "@/components/dashboard/PerformanceAnalysis";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">AlphaEdge Dashboard</h2>
              <p className="text-gray-400">Monitor and control your automated trading bot</p>
            </div>
          </div>
          
          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="monitoring">Price Monitoring</TabsTrigger>
              <TabsTrigger value="configuration">Bot Configuration</TabsTrigger>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitoring">
              <PriceMonitoring />
            </TabsContent>
            
            <TabsContent value="configuration">
              <BotConfiguration />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionHistory />
            </TabsContent>
            
            <TabsContent value="performance">
              <PerformanceAnalysis />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
