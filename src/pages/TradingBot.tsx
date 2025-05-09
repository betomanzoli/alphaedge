
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";
import TradingBotDashboard from "@/components/tradingbot/TradingBotDashboard";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

const TradingBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Trading Bot</h2>
              <p className="text-gray-400">Configure and monitor your trading bot for low liquidity tokens</p>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="bg-trading-darker border-gray-700">
                <BarChart size={16} className="mr-2" /> Advanced Dashboard
              </Button>
            </Link>
          </div>
          
          <TradingBotDashboard />
        </main>
      </div>
    </div>
  );
};

export default TradingBot;
