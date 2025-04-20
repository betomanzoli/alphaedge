
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Play, Settings, PlusCircle, Info } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Strategies = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Estratégias de Trading</h2>
                <p className="text-gray-400 mt-1">Configure e gerencie suas estratégias de trading automatizadas</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button className="bg-trading-primary hover:bg-trading-secondary">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Criar Estratégia
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Crie uma nova estratégia automatizada</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="rounded-lg border border-gray-800 bg-trading-darker p-6">
              <div className="flex items-start gap-4">
                <Info className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Como começar com estratégias automatizadas</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Configure suas chaves de API na seção "Chaves API"</li>
                    <li>Escolha uma estratégia predefinida ou crie uma personalizada</li>
                    <li>Configure os parâmetros da estratégia (par de trading, limites, etc)</li>
                    <li>Faça um teste com valores pequenos primeiro</li>
                    <li>Monitore o desempenho e ajuste conforme necessário</li>
                  </ol>
                  <div className="mt-4 text-sm text-gray-400">
                    <p className="font-medium mb-1">Tipos de estratégias disponíveis:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Grid Trading - Compra e venda em faixas de preço predefinidas</li>
                      <li>DCA (Dollar Cost Average) - Investimento em intervalos regulares</li>
                      <li>Tendência - Segue tendências usando médias móveis</li>
                      <li>Reversão à Média - Opera em momentos de retorno à média</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium">Criar Nova Estratégia</CardTitle>
                      <CardDescription className="text-gray-400">
                        Comece configurando uma nova estratégia automatizada
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>1. Escolha um tipo de estratégia</p>
                    <p>2. Configure os parâmetros</p>
                    <p>3. Defina limites de risco</p>
                    <p>4. Inicie a operação</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t border-gray-800">
                  <Button variant="outline" size="sm" className="border-gray-700">
                    <Settings className="h-4 w-4 mr-1" /> Configurar
                  </Button>
                  <Button variant="default" size="sm" className="bg-trading-profit hover:bg-green-700">
                    <Play className="h-4 w-4 mr-1" /> Começar
                  </Button>
                </CardFooter>
              </Card>
            </Grid>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Strategies;
