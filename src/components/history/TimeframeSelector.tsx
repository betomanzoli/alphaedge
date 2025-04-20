
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TimeframeSelectorProps = {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
};

export const TimeframeSelector = ({ timeframe, onTimeframeChange }: TimeframeSelectorProps) => {
  return (
    <div className="flex space-x-4 items-center">
      <Select value={timeframe} onValueChange={onTimeframeChange}>
        <SelectTrigger className="w-32 bg-trading-darker border-gray-700">
          <SelectValue placeholder="Selecionar Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Últimas 24h</SelectItem>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="all">Todo período</SelectItem>
        </SelectContent>
      </Select>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" className="border-gray-700">
              Exportar CSV
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exporte seus dados para análise externa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
