
import { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  // Welcome notification on first load
  useEffect(() => {
    toast({
      title: "Welcome to AlphaEdge",
      description: "Your automated trading platform is ready",
    });
  }, [toast]);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Index;
