
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Play, Pause, Sliders } from "lucide-react";
import { useState } from "react";
import { Grid } from "@/components/ui/grid";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Strategy {
  id: string;
  name: string;
  description: string;
  active: boolean;
  type: "arbitrage" | "frontrun" | "sandwich" | "liquidation";
  profit24h: string;
  executions: number;
}

const StrategySelector = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: "1",
      name: "Arbitragem Uni-Sushi",
      description: "Arbitragem entre Uniswap e Sushiswap",
      active: false,
      type: "arbitrage",
      profit24h: "0.00 ETH",
      executions: 0
    },
    {
      id: "2",
      name: "Frontrun DEX",
      description: "Frontrunning de grandes swaps em DEX",
      active: false,
      type: "frontrun",
      profit24h: "0.00 ETH",
      executions: 0
    },
    {
      id: "3",
      name: "Sandwich ETH Pairs",
      description: "Sandwich attacks em pares com ETH",
      active: false,
      type: "sandwich",
      profit24h: "0.00 ETH",
      executions: 0
    },
    {
      id: "4",
      name: "Liquidação AAVE",
      description: "Liquidações de posições não saudáveis no AAVE",
      active: false,
      type: "liquidation",
      profit24h: "0.00 ETH",
      executions: 0
    }
  ]);
  
  const { toast } = useToast();

  const toggleStrategy = (id: string) => {
    setStrategies(strategies.map(strategy => {
      if (strategy.id === id) {
        const newActiveState = !strategy.active;
        
        toast({
          title: newActiveState ? "Estratégia Ativada" : "Estratégia Desativada",
          description: `${strategy.name} foi ${newActiveState ? "ativada" : "desativada"} com sucesso.`,
        });
        
        return { ...strategy, active: newActiveState };
      }
      return strategy;
    }));
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sliders className="h-5 w-5" />
          Estratégias Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Grid className="grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="bg-trading-dark border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{strategy.name}</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">{strategy.description}</p>
                  </div>
                  <Switch 
                    checked={strategy.active} 
                    onCheckedChange={() => toggleStrategy(strategy.id)} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-400">Lucro (24h):</span>
                  <span>{strategy.profit24h}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Execuções:</span>
                  <span>{strategy.executions}</span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-700">
                        <Settings className="h-4 w-4 mr-1" /> Configurar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-trading-darker border-gray-800 text-white">
                      <DialogHeader>
                        <DialogTitle>Configurar {strategy.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Configurações de estratégia serão implementadas aqui</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant={strategy.active ? "destructive" : "default"} 
                    size="sm" 
                    disabled={!strategy.active}
                    className={strategy.active ? "" : "bg-trading-profit hover:bg-green-700"}
                  >
                    {strategy.active ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" /> Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" /> Iniciar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StrategySelector;
