
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioValueChart } from "./charts/PortfolioValueChart";
import { TokenAccumulationChart } from "./charts/TokenAccumulationChart";
import { StrategyPerformanceCharts } from "./charts/StrategyPerformanceCharts";

const PerformanceAnalysis = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="portfolio">
        <TabsList className="bg-trading-darker border-gray-700">
          <TabsTrigger value="portfolio">Portfolio Value</TabsTrigger>
          <TabsTrigger value="accumulation">Token Accumulation</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="pt-4">
          <PortfolioValueChart />
        </TabsContent>
        
        <TabsContent value="accumulation" className="pt-4">
          <TokenAccumulationChart />
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
          <StrategyPerformanceCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceAnalysis;
