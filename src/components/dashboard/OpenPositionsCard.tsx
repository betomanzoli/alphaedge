
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OpenPositionsCard = () => {
  const positions = [
    { symbol: "BTC/USDT", side: "long", pnl: "+2.15%", amount: "0.12 BTC", status: "profit" },
    { symbol: "ETH/USDT", side: "short", pnl: "-0.87%", amount: "1.5 ETH", status: "loss" },
  ];

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-400">Open Positions</CardTitle>
          <Activity className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {positions.map((position, index) => (
            <div key={index} className="flex items-center justify-between py-1 border-b border-gray-800 last:border-0">
              <div>
                <div className="font-medium">{position.symbol}</div>
                <div className="text-xs text-gray-400">{position.amount}</div>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant={position.status === "profit" ? "success" : "destructive"} className="mb-1">
                  {position.side}
                </Badge>
                <span className={position.status === "profit" ? "text-trading-profit" : "text-trading-loss"}>
                  {position.pnl}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenPositionsCard;
