
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type MetricCardProps = {
  title: string;
  value: string;
  subtitle: string;
  tooltip: string;
};

const MetricCard = ({ title, value, subtitle, tooltip }: MetricCardProps) => (
  <Card className="bg-trading-darker text-white border-gray-800">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <CardTitle className="text-gray-400 text-sm font-normal">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm">{subtitle}</div>
    </CardContent>
  </Card>
);

export const HistoryMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <MetricCard
        title="Total de Operações"
        value="0"
        subtitle="Nenhuma operação realizada"
        tooltip="Número total de operações realizadas no período selecionado"
      />
      <MetricCard
        title="Taxa de Sucesso"
        value="0%"
        subtitle="Aguardando operações"
        tooltip="Porcentagem de operações lucrativas em relação ao total"
      />
      <MetricCard
        title="Lucro Médio"
        value="R$ 0,00"
        subtitle="Por operação"
        tooltip="Lucro médio por operação no período selecionado"
      />
      <MetricCard
        title="Resultado Total"
        value="R$ 0,00"
        subtitle="No período selecionado"
        tooltip="Soma de todos os lucros e perdas no período"
      />
    </div>
  );
};
