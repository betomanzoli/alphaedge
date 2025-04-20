
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BalanceCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-gray-400">Saldo da Conta</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seu saldo total disponível para operações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Wallet className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">R$ 0,00</div>
        <div className="mt-2 text-xs text-gray-400">
          Para começar:
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Configure suas chaves de API</li>
            <li>Adicione fundos à sua conta</li>
            <li>Comece a operar manualmente ou crie estratégias</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
