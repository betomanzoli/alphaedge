
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TradesTable = () => {
  return (
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
  );
};
