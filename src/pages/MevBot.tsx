
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MevDashboard from "@/components/mev/MevDashboard";
import { useToast } from "@/hooks/use-toast";

const MevBot = () => {
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
              <h2 className="text-2xl font-bold">MEV Bot</h2>
              <p className="text-gray-400">Monitor e execute estratégias de MEV na blockchain</p>
            </div>
          </div>
          
          <MevDashboard />
        </main>
      </div>
    </div>
  );
};

export default MevBot;
