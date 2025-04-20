
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const StrategyPerformanceCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Desempenho de Estratégias</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Visualize o desempenho de suas estratégias automatizadas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-400">
          <p>Nenhuma estratégia configurada</p>
          <p className="text-xs mt-2">Para começar:</p>
          <ol className="list-decimal list-inside mt-1 space-y-1 text-xs">
            <li>Acesse a seção "Estratégias"</li>
            <li>Crie sua primeira estratégia</li>
            <li>Configure os parâmetros</li>
            <li>Monitore o desempenho aqui</li>
          </ol>
          <p className="text-xs mt-3">
            Recomendamos começar com estratégias simples como Grid Trading ou DCA
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyPerformanceCard;
