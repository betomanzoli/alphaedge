
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface ActiveStrategy {
  id: string;
  name: string;
  type: "arbitragem" | "frontrun" | "sandwich" | "liquidacao";
  status: "running" | "paused" | "error";
  profit: string;
  executionCount: number;
  lastExecution: string;
}

const ActiveStrategies = () => {
  // Exemplo de dados - na implementação real, estes viriam de um estado global ou API
  const [activeStrategies] = useState<ActiveStrategy[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running": return { variant: "success" as const, label: "Ativo" };
      case "paused": return { variant: "warning" as const, label: "Pausado" };
      case "error": return { variant: "destructive" as const, label: "Erro" };
      default: return { variant: "outline" as const, label: "Desconhecido" };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "arbitragem": return "Arbitragem";
      case "frontrun": return "Frontrunning";
      case "sandwich": return "Sandwiching";
      case "liquidacao": return "Liquidação";
      default: return type;
    }
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Estratégias Ativas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeStrategies.length > 0 ? (
          <div className="space-y-4">
            {activeStrategies.map((strategy) => {
              const statusInfo = getStatusBadge(strategy.status);
              
              return (
                <div 
                  key={strategy.id} 
                  className="bg-trading-dark rounded-lg p-3 border border-gray-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{strategy.name}</div>
                      <div className="text-sm text-gray-400">{getTypeLabel(strategy.type)}</div>
                    </div>
                    <Badge variant={statusInfo.variant}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-gray-400">Lucro</div>
                      <div>{strategy.profit}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Execuções</div>
                      <div>{strategy.executionCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Última</div>
                      <div>{strategy.lastExecution}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>Nenhuma estratégia ativa no momento</p>
            <p className="text-xs mt-1">
              Para ativar uma estratégia, configure-a na seção "Estratégias Disponíveis" abaixo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveStrategies;
