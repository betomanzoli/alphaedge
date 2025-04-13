
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const BalanceCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-400">Account Balance</CardTitle>
          <Wallet className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$24,875.65</div>
        <div className="mt-1 flex items-center text-sm">
          <span className="text-trading-profit">+2.4%</span>
          <span className="text-gray-400 ml-2">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
