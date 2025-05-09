
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data para o histórico de transações
const transactions = [
  {
    id: "1",
    timestamp: "2025-05-09T08:32:15",
    type: "buy",
    token: "opXEN",
    amount: "2500",
    price: "0.000062",
    value: "0.155",
    status: "completed",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
  },
  {
    id: "2",
    timestamp: "2025-05-09T06:15:42",
    type: "buy",
    token: "opXEN",
    amount: "1800",
    price: "0.000058",
    value: "0.1044",
    status: "completed",
    txHash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v",
  },
  {
    id: "3",
    timestamp: "2025-05-08T22:45:10",
    type: "buy",
    token: "opXEN",
    amount: "3200",
    price: "0.000055",
    value: "0.176",
    status: "completed",
    txHash: "0xm1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h",
  },
  {
    id: "4",
    timestamp: "2025-05-08T14:22:37",
    type: "sell",
    token: "opXEN",
    amount: "1000",
    price: "0.000072",
    value: "0.072",
    status: "completed",
    txHash: "0xq1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6j7k8l9z0x1c",
  },
  {
    id: "5",
    timestamp: "2025-05-08T09:05:18",
    type: "buy",
    token: "opXEN",
    amount: "2200",
    price: "0.000059",
    value: "0.1298",
    status: "completed",
    txHash: "0xv1b2n3m4a5s6d7f8g9h0j1k2l3p4o5i6u7y8t6r5e4w",
  },
];

const TransactionHistory = () => {
  // Função para formatar timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Função para truncar hash
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };
  
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-gray-400">Data</TableHead>
              <TableHead className="text-gray-400">Tipo</TableHead>
              <TableHead className="text-gray-400">Token</TableHead>
              <TableHead className="text-gray-400 text-right">Quantidade</TableHead>
              <TableHead className="text-gray-400 text-right">Preço (ETH)</TableHead>
              <TableHead className="text-gray-400 text-right">Valor (ETH)</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-trading-dark/50">
                <TableCell className="font-mono text-xs">
                  {formatDate(tx.timestamp)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={tx.type === "buy" ? "default" : "destructive"}
                    className={
                      tx.type === "buy" 
                        ? "bg-trading-profit hover:bg-trading-profit/80 text-xs" 
                        : "bg-trading-loss hover:bg-trading-loss/80 text-xs"
                    }
                  >
                    {tx.type === "buy" ? "Compra" : "Venda"}
                  </Badge>
                </TableCell>
                <TableCell>{tx.token}</TableCell>
                <TableCell className="text-right">{Number(tx.amount).toLocaleString()}</TableCell>
                <TableCell className="text-right">{tx.price}</TableCell>
                <TableCell className="text-right">{tx.value}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className="bg-transparent border-green-500/30 text-green-500 text-xs"
                  >
                    {tx.status === "completed" ? "Concluído" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <a 
                    href={`https://optimistic.etherscan.io/tx/${tx.txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono hover:text-primary hover:underline"
                  >
                    {truncateHash(tx.txHash)}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
