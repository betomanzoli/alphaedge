
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock transaction data
const transactions = [
  {
    id: "1",
    date: "2025-05-08 10:30",
    type: "buy",
    pair: "opXEN/ETH",
    amount: 5000,
    price: 0.00021,
    total: 0.05,
    status: "completed",
    txHash: "0x1234...5678"
  },
  {
    id: "2",
    date: "2025-05-08 14:45",
    type: "buy",
    pair: "opXEN/ETH",
    amount: 3000,
    price: 0.00019,
    total: 0.03,
    status: "completed",
    txHash: "0x2345...6789"
  },
  {
    id: "3",
    date: "2025-05-07 09:15",
    type: "buy",
    pair: "opXEN/ETH",
    amount: 2500,
    price: 0.00022,
    total: 0.025,
    status: "completed",
    txHash: "0x3456...7890"
  },
  {
    id: "4",
    date: "2025-05-06 15:20",
    type: "buy",
    pair: "opXEN/ETH",
    amount: 4000,
    price: 0.00020,
    total: 0.04,
    status: "completed",
    txHash: "0x4567...8901"
  },
];

const TransactionHistory = () => {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  return (
    <div className="space-y-6">
      <Card className="bg-trading-darker border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex gap-4">
            <Select
              value={filter}
              onValueChange={setFilter}
            >
              <SelectTrigger className="w-32 bg-trading-dark border-gray-700">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-trading-dark border-gray-700">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader className="bg-trading-dark">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total (ETH)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>TX Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.type === "buy" ? "default" : "destructive"}
                        className={tx.type === "buy" ? "bg-trading-profit" : ""}
                      >
                        {tx.type === "buy" ? "Buy" : "Sell"}
                      </Badge>
                    </TableCell>
                    <TableCell>{tx.pair}</TableCell>
                    <TableCell className="text-right">
                      {tx.amount.toLocaleString()} opXEN
                    </TableCell>
                    <TableCell className="text-right">
                      {tx.price.toFixed(8)}
                    </TableCell>
                    <TableCell className="text-right">
                      {tx.total.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`https://optimistic.etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {tx.txHash}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-400">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              14,500 opXEN
            </div>
            <p className="text-sm text-gray-400 mt-1">
              ≈ 0.145 ETH
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Total Buy Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-trading-profit">
              14,500 opXEN
            </div>
            <p className="text-sm text-gray-400 mt-1">
              4 transactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Total Sell Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-trading-loss">
              0 opXEN
            </div>
            <p className="text-sm text-gray-400 mt-1">
              0 transactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle className="text-base">Average Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              0.00020 ETH
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Per opXEN token
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
