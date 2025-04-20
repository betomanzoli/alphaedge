
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState("7d");
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Histórico de Operações</h2>
              <p className="text-gray-400">Visualize e analise suas operações passadas</p>
            </div>
            
            <div className="flex space-x-4 items-center">
              <Select value={timeframe} onValueChange={setTimeframe}>
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
          </div>
          
          <Grid className="grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-gray-400 text-sm font-normal">Total de Operações</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Número total de operações realizadas no período selecionado</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <div className="text-gray-500 text-sm">Nenhuma operação realizada</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-gray-400 text-sm font-normal">Taxa de Sucesso</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Porcentagem de operações lucrativas em relação ao total</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <div className="text-gray-500 text-sm">Aguardando operações</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-gray-400 text-sm font-normal">Lucro Médio</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lucro médio por operação no período selecionado</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 0,00</div>
                <div className="text-gray-500 text-sm">Por operação</div>
              </CardContent>
            </Card>
            
            <Card className="bg-trading-darker text-white border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-gray-400 text-sm font-normal">Resultado Total</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Soma de todos os lucros e perdas no período</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 0,00</div>
                <div className="text-gray-500 text-sm">No período selecionado</div>
              </CardContent>
            </Card>
          </Grid>
          
          <Card className="bg-trading-darker text-white border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Histórico de Operações</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lista detalhada de todas as operações realizadas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-900">
                    <TableRow className="hover:bg-gray-900 border-gray-800">
                      <TableHead className="text-gray-400">Data e Hora</TableHead>
                      <TableHead className="text-gray-400">Par</TableHead>
                      <TableHead className="text-gray-400">Tipo</TableHead>
                      <TableHead className="text-gray-400 text-right">Preço de Entrada</TableHead>
                      <TableHead className="text-gray-400 text-right">Preço de Saída</TableHead>
                      <TableHead className="text-gray-400 text-right">Quantidade</TableHead>
                      <TableHead className="text-gray-400">Alavancagem</TableHead>
                      <TableHead className="text-gray-400 text-right">Resultado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="text-gray-400">
                          <p>Nenhuma operação realizada ainda</p>
                          <p className="text-xs mt-2">Configure suas estratégias ou realize operações manuais para começar</p>
                          <p className="text-xs mt-1">Todas as suas operações serão registradas automaticamente aqui</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default History;
