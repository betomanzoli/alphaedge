
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight } from "lucide-react";

interface Transaction {
  id: string;
  hash: string;
  type: string;
  value: string;
  gasPrice: string;
  opportunity: string;
  status: "high" | "medium" | "low" | "none";
}

const MempoolMonitor = () => {
  // Exemplo de dados - na implementação real, estes viriam do monitoramento da mempool
  const [transactions] = useState<Transaction[]>([
    { 
      id: "1", 
      hash: "0x3a8...e7f2", 
      type: "Swap", 
      value: "45.2 ETH", 
      gasPrice: "32 gwei", 
      opportunity: "Sandwich", 
      status: "high" 
    },
    { 
      id: "2", 
      hash: "0x7b2...a1c3", 
      type: "Bridge", 
      value: "12.8 ETH", 
      gasPrice: "30 gwei", 
      opportunity: "Nenhuma", 
      status: "none" 
    },
    { 
      id: "3", 
      hash: "0x9f4...d5e6", 
      type: "Swap", 
      value: "8.5 ETH", 
      gasPrice: "31 gwei", 
      opportunity: "Frontrun", 
      status: "medium" 
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "text-trading-profit";
      case "medium": return "text-amber-400";
      case "low": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high": return "success";
      case "medium": return "warning";
      case "low": return "default";
      default: return "outline";
    }
  };

  return (
    <Card className="bg-trading-darker border-gray-800 mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Monitor da Mempool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Hash</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Valor</TableHead>
                <TableHead className="text-gray-400">Gas Price</TableHead>
                <TableHead className="text-gray-400">Oportunidade</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-gray-800">
                  <TableCell className="font-mono">{tx.hash}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.value}</TableCell>
                  <TableCell>{tx.gasPrice}</TableCell>
                  <TableCell>
                    {tx.opportunity !== "Nenhuma" ? (
                      <div className={`flex items-center ${getStatusColor(tx.status)}`}>
                        {tx.opportunity} <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    ) : (
                      tx.opportunity
                    )}
                  </TableCell>
                  <TableCell>
                    {tx.status !== "none" && (
                      <Badge variant={getStatusBadge(tx.status)}>
                        {tx.status === "high" ? "Alta" : tx.status === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-gray-400">
                    Nenhuma transação na mempool
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MempoolMonitor;
