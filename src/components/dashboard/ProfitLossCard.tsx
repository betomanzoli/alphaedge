
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp } from "lucide-react";

const ProfitLossCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-400">Daily P&L</CardTitle>
          <TrendingUp className="h-4 w-4 text-trading-profit" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-trading-profit">+$457.32</div>
        <div className="mt-1 flex items-center text-sm">
          <span className="text-trading-profit">+1.8%</span>
          <span className="text-gray-400 ml-2">today</span>
        </div>
        
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-trading-primary to-trading-profit rounded-full" style={{ width: "65%" }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Target: 75%</span>
            <span>Current: 65%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossCard;
