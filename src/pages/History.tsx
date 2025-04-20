
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { HistoryMetrics } from "@/components/history/HistoryMetrics";
import { TradesTable } from "@/components/history/TradesTable";
import { TimeframeSelector } from "@/components/history/TimeframeSelector";

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
              <h2 className="text-2xl font-bold">Histórico de Operações</h2>
              <p className="text-gray-400">Visualize e analise suas operações passadas</p>
            </div>
            
            <TimeframeSelector 
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>
          
          <HistoryMetrics />
          <TradesTable />
        </main>
      </div>
    </div>
  );
};

export default History;
