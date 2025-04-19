
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp } from "lucide-react";

const ProfitLossCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-400">Lucro/Perda Diário</CardTitle>
          <TrendingUp className="h-4 w-4 text-trading-profit" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-400">R$ 0,00</div>
        <div className="mt-1 flex items-center text-sm">
          <span className="text-gray-400">0,0%</span>
          <span className="text-gray-400 ml-2">hoje</span>
        </div>
        
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-trading-primary to-trading-profit rounded-full" style={{ width: "0%" }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Meta: 0%</span>
            <span>Atual: 0%</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Configure sua meta de lucro nas configurações
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossCard;
