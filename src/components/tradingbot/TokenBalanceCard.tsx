
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface TokenBalanceCardProps {
  tokenSymbol: string;
  tokenAmount: number;
  tokenValue: number;
  className?: string;
}

const TokenBalanceCard = ({ 
  tokenSymbol, 
  tokenAmount, 
  tokenValue,
  className = ""
}: TokenBalanceCardProps) => {
  return (
    <Card className={`bg-trading-darker border-gray-800 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-400">Saldo de {tokenSymbol}</CardTitle>
          <Wallet className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">
            {tokenAmount.toLocaleString()} {tokenSymbol}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            ≈ ${tokenValue.toLocaleString()}
          </div>
          {tokenSymbol === "opXEN" && (
            <div className="mt-4 text-xs text-trading-profit">
              +152 opXEN acumulados nas últimas 24h
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalanceCard;
