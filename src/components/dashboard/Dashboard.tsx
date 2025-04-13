
import { Grid } from "@/components/ui/grid";
import MarketChart from "@/components/dashboard/MarketChart";
import BalanceCard from "@/components/dashboard/BalanceCard";
import OpenPositionsCard from "@/components/dashboard/OpenPositionsCard";
import ProfitLossCard from "@/components/dashboard/ProfitLossCard";
import RecentTradesTable from "@/components/dashboard/RecentTradesTable";
import StrategyPerformanceCard from "@/components/dashboard/StrategyPerformanceCard";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Trading Pair:</span>
          <Select 
            value={selectedSymbol}
            onValueChange={setSelectedSymbol}
          >
            <SelectTrigger className="w-32 bg-trading-darker border-gray-700">
              <SelectValue placeholder="Select Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTCUSDT">BTC/USDT</SelectItem>
              <SelectItem value="ETHUSDT">ETH/USDT</SelectItem>
              <SelectItem value="BNBUSDT">BNB/USDT</SelectItem>
              <SelectItem value="SOLUSDT">SOL/USDT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Grid className="grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <MarketChart symbol={selectedSymbol} />
        </div>
        <div className="space-y-4">
          <BalanceCard />
          <ProfitLossCard />
          <OpenPositionsCard />
        </div>
      </Grid>

      <Grid className="grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <RecentTradesTable />
        </div>
        <div>
          <StrategyPerformanceCard />
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
