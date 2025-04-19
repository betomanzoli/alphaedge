
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTrades = [];

const RecentTradesTable = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Negociações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {mockTrades.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Par</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Lado</TableHead>
                <TableHead className="text-gray-400">Quantidade</TableHead>
                <TableHead className="text-gray-400">Preço</TableHead>
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrades.map((trade) => (
                <TableRow key={trade.id} className="border-gray-800">
                  <TableCell className="font-medium">{trade.symbol}</TableCell>
                  <TableCell>{trade.type === "Market" ? "Mercado" : trade.type === "Limit" ? "Limite" : "Stop"}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={trade.side === "Buy" ? "success" : "destructive"}
                      className="font-normal"
                    >
                      {trade.side === "Buy" ? "Compra" : "Venda"}
                    </Badge>
                  </TableCell>
                  <TableCell>{trade.amount}</TableCell>
                  <TableCell>R$ {trade.price}</TableCell>
                  <TableCell className="text-gray-400">{trade.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={trade.status === "completed" ? "secondary" : "outline"}
                      className="font-normal"
                    >
                      {trade.status === "completed" ? "Concluída" : "Pendente"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>Nenhuma negociação realizada</p>
            <p className="text-xs mt-1">As negociações aparecerão aqui após serem executadas</p>
            <p className="text-xs mt-4">Para realizar uma negociação, vá até a seção "Mercado" e selecione um par de negociação</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTradesTable;
