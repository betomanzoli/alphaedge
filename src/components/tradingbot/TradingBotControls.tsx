
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, StopCircle, Settings, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TradingBotControlsProps {
  isRunning: boolean;
  onToggle: () => void;
}

const TradingBotControls = ({ 
  isRunning, 
  onToggle 
}: TradingBotControlsProps) => {
  const { toast } = useToast();
  
  const handleToggle = () => {
    onToggle();
    
    toast({
      title: isRunning ? "Bot Parado" : "Bot Iniciado",
      description: isRunning 
        ? "O trading bot foi parado com sucesso"
        : "O trading bot foi iniciado e está monitorando oportunidades",
      variant: isRunning ? "destructive" : "default",
    });
  };
  
  return (
    <div className="bg-trading-darker border border-gray-800 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div 
            className={`h-3 w-3 rounded-full ${
              isRunning ? 'bg-trading-profit animate-pulse-slow' : 'bg-trading-loss'
            }`}
          />
          <span className="font-medium">
            Status: {isRunning ? 'Ativo' : 'Inativo'}
          </span>
          
          {isRunning && (
            <span className="text-xs text-gray-400 ml-2">
              Último trade: 14 min atrás
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-trading-dark border-gray-700"
                >
                  <Settings size={16} className="mr-1" />
                  Configurações
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurações avançadas do bot</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-trading-dark border-gray-700"
                >
                  <BarChart size={16} className="mr-1" />
                  Relatório
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Relatório detalhado de performance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant={isRunning ? "destructive" : "default"}
            className={isRunning ? "" : "bg-trading-profit hover:bg-trading-profit/90"}
            onClick={handleToggle}
          >
            {isRunning ? (
              <>
                <StopCircle size={18} className="mr-1" />
                Parar Bot
              </>
            ) : (
              <>
                <PlayIcon size={18} className="mr-1" />
                Iniciar Bot
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingBotControls;
