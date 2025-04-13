
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

const mockTrades = [
  { 
    id: "1", 
    symbol: "BTC/USDT", 
    type: "Market", 
    side: "Buy", 
    amount: "0.05 BTC", 
    price: "66,241.23", 
    date: "2025-04-13 09:23:45", 
    status: "completed" 
  },
  { 
    id: "2", 
    symbol: "ETH/USDT", 
    type: "Limit", 
    side: "Sell", 
    amount: "1.2 ETH", 
    price: "3,124.51", 
    date: "2025-04-13 09:15:12", 
    status: "completed" 
  },
  { 
    id: "3", 
    symbol: "BTC/USDT", 
    type: "Stop", 
    side: "Sell", 
    amount: "0.03 BTC", 
    price: "65,980.00", 
    date: "2025-04-13 08:55:33", 
    status: "pending" 
  },
  { 
    id: "4", 
    symbol: "SOL/USDT", 
    type: "Market", 
    side: "Buy", 
    amount: "15 SOL", 
    price: "157.42", 
    date: "2025-04-13 08:43:22", 
    status: "completed" 
  },
  { 
    id: "5", 
    symbol: "ETH/USDT", 
    type: "Limit", 
    side: "Buy", 
    amount: "0.8 ETH", 
    price: "3,100.00", 
    date: "2025-04-13 08:30:15", 
    status: "pending" 
  }
];

const RecentTradesTable = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Pair</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Side</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTrades.map((trade) => (
              <TableRow key={trade.id} className="border-gray-800">
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>
                  <Badge 
                    variant={trade.side === "Buy" ? "success" : "destructive"}
                    className="font-normal"
                  >
                    {trade.side}
                  </Badge>
                </TableCell>
                <TableCell>{trade.amount}</TableCell>
                <TableCell>${trade.price}</TableCell>
                <TableCell className="text-gray-400">{trade.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={trade.status === "completed" ? "secondary" : "outline"}
                    className="font-normal"
                  >
                    {trade.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTradesTable;
