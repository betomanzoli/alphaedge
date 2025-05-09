
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import TokenBalanceCard from "@/components/tradingbot/TokenBalanceCard";
import TradingBotControls from "@/components/tradingbot/TradingBotControls";

// Mock data for price chart
const generateMockData = () => {
  const data = [];
  const now = new Date();
  const basePrice = 0.00025;
  
  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly data
    const randomFactor = 0.9 + Math.random() * 0.2; // +/- 10%
    
    data.push({
      time: time.toLocaleTimeString(),
      price: basePrice * randomFactor,
      sma: basePrice * (0.95 + Math.random() * 0.1) // Simple moving average
    });
  }
  
  return data;
};

const PriceMonitoring = () => {
  const [priceData, setPriceData] = useState(generateMockData());
  const [isRunning, setIsRunning] = useState(false);
  const [botMetrics, setBotMetrics] = useState({
    executedTrades: 8,
    successRate: 75,
    avgProfitPerTrade: 3.2,
    lastTradeTime: "14:32:05"
  });

  const formatPrice = (price) => {
    return price < 0.001 ? price.toFixed(8) : price.toFixed(4);
  };

  const handleToggleBot = () => {
    setIsRunning(!isRunning);
    
    // In a real implementation, this would connect to the backend API
    // to start/stop the bot
  };

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...priceData.slice(1)];
      const lastPrice = priceData[priceData.length - 1].price;
      const randomChange = 0.98 + Math.random() * 0.04; // +/- 2%
      
      newData.push({
        time: new Date().toLocaleTimeString(),
        price: lastPrice * randomChange,
        sma: lastPrice * (0.98 + Math.random() * 0.04)
      });
      
      setPriceData(newData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [priceData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TokenBalanceCard 
          tokenSymbol="opXEN" 
          tokenAmount={10000} 
          tokenValue={1250} 
          className="md:col-span-2" 
        />
        <TokenBalanceCard 
          tokenSymbol="ETH" 
          tokenAmount={0.5} 
          tokenValue={1000} 
          className="md:col-span-1" 
        />
      </div>
      
      <TradingBotControls 
        isRunning={isRunning} 
        onToggle={handleToggleBot} 
      />
      
      <Card className="bg-trading-darker border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">opXEN/ETH Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="time"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={formatPrice}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  formatter={(value) => [formatPrice(value), "Price"]}
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  labelStyle={{ color: '#D1D5DB' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10B981"
                  activeDot={{ r: 8 }}
                  name="Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="sma" 
                  stroke="#60A5FA" 
                  strokeDasharray="5 5"
                  name="SMA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-trading-dark p-4 rounded-lg">
              <div className="text-sm text-gray-400">Executed Trades</div>
              <div className="text-xl font-bold">{botMetrics.executedTrades}</div>
            </div>
            
            <div className="bg-trading-dark p-4 rounded-lg">
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-xl font-bold">{botMetrics.successRate}%</div>
            </div>
            
            <div className="bg-trading-dark p-4 rounded-lg">
              <div className="text-sm text-gray-400">Avg. Profit</div>
              <div className="text-xl font-bold text-trading-profit">+{botMetrics.avgProfitPerTrade}%</div>
            </div>
            
            <div className="bg-trading-dark p-4 rounded-lg">
              <div className="text-sm text-gray-400">Last Trade</div>
              <div className="text-xl font-bold">{botMetrics.lastTradeTime}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Grid className="grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle>Market Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-trading-dark p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Current Price</div>
                  <div className="text-lg font-medium">
                    {formatPrice(priceData[priceData.length - 1].price)} ETH
                  </div>
                </div>
                
                <div className="bg-trading-dark p-3 rounded-lg">
                  <div className="text-xs text-gray-400">24h Change</div>
                  <div className="text-lg font-medium text-trading-profit">
                    +5.2%
                  </div>
                </div>
                
                <div className="bg-trading-dark p-3 rounded-lg">
                  <div className="text-xs text-gray-400">24h Volume</div>
                  <div className="text-lg font-medium">
                    184,250 opXEN
                  </div>
                </div>
                
                <div className="bg-trading-dark p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Liquidity</div>
                  <div className="text-lg font-medium">
                    $45,320
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium mb-2">Pool Information</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pool Address:</span>
                    <span className="text-xs">0x1234...5678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee Tier:</span>
                    <span>1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TVL:</span>
                    <span>$45,320</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <CardTitle>Active Market Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-trading-dark border-l-4 border-trading-profit p-3 rounded-lg">
                <div className="font-medium">Price Increase Alert</div>
                <div className="text-sm text-gray-400">
                  opXEN price increased by 5.2% in the last 24 hours
                </div>
                <div className="text-xs text-gray-500 mt-1">12:45:32</div>
              </div>
              
              <div className="bg-trading-dark border-l-4 border-blue-500 p-3 rounded-lg">
                <div className="font-medium">Volume Alert</div>
                <div className="text-sm text-gray-400">
                  Trading volume increased by 32% compared to 7-day average
                </div>
                <div className="text-xs text-gray-500 mt-1">10:15:07</div>
              </div>
              
              <div className="bg-trading-dark border-l-4 border-yellow-500 p-3 rounded-lg">
                <div className="font-medium">Volatility Alert</div>
                <div className="text-sm text-gray-400">
                  Unusual volatility detected in the last hour
                </div>
                <div className="text-xs text-gray-500 mt-1">09:22:18</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default PriceMonitoring;
