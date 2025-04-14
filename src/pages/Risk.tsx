import { 
  Info, 
  AlertTriangle, 
  ShieldCheck 
} from "lucide-react";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Risk = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [maxPositionSize, setMaxPositionSize] = useState(10);
  const [maxDrawdown, setMaxDrawdown] = useState(15);
  const [leverageLimit, setLeverageLimit] = useState(5);
  const [stopLossActive, setStopLossActive] = useState(true);
  const [stopLossPercent, setStopLossPercent] = useState(5);
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Risk Management</h2>
            <p className="text-gray-400">Configure risk parameters and protection settings</p>
          </div>
          
          <Tabs defaultValue="general" className="mb-6">
            <TabsList className="bg-trading-darker border-gray-800">
              <TabsTrigger value="general">General Risk</TabsTrigger>
              <TabsTrigger value="position">Position Sizing</TabsTrigger>
              <TabsTrigger value="protection">Protection Measures</TabsTrigger>
              <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-6 space-y-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Daily Risk Limits</CardTitle>
                  <CardDescription className="text-gray-400">
                    Set maximum allowed losses to protect your capital
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-drawdown">Maximum Daily Drawdown</Label>
                      <span className="font-medium">{maxDrawdown}%</span>
                    </div>
                    <Slider 
                      id="max-drawdown" 
                      value={[maxDrawdown]} 
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={value => setMaxDrawdown(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative (1%)</span>
                      <span>Aggressive (50%)</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="daily-loss-limit">Daily Loss Limit (USD)</Label>
                      <Input 
                        id="daily-loss-limit"
                        type="number"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="500"
                      />
                      <p className="text-xs text-gray-500">Trading will stop for the day if loss exceeds this amount</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weekly-loss-limit">Weekly Loss Limit (USD)</Label>
                      <Input 
                        id="weekly-loss-limit"
                        type="number"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="2000"
                      />
                      <p className="text-xs text-gray-500">Trading will stop for the week if loss exceeds this amount</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-stop-loss" defaultChecked />
                    <Label htmlFor="auto-stop-loss">
                      Automatically pause all trading when daily limits are reached
                    </Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Current risk exposure and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Grid className="grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Current Risk Level</div>
                      <div className="text-xl font-bold text-trading-profit">Low</div>
                      <div className="text-xs text-gray-500 mt-1">3 open positions</div>
                    </div>
                    
                    <div className="p-4 bg-gray-900 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Portfolio at Risk</div>
                      <div className="text-xl font-bold">7.2%</div>
                      <div className="text-xs text-gray-500 mt-1">$896 of $12,400</div>
                    </div>
                    
                    <div className="p-4 bg-gray-900 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Current Drawdown</div>
                      <div className="text-xl font-bold">2.3%</div>
                      <div className="text-xs text-gray-500 mt-1">From peak account value</div>
                    </div>
                  </Grid>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="position" className="mt-6 space-y-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Position Sizing Controls</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure maximum position sizes and leverage settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-position-size">Maximum Position Size (% of portfolio)</Label>
                      <span className="font-medium">{maxPositionSize}%</span>
                    </div>
                    <Slider 
                      id="max-position-size" 
                      value={[maxPositionSize]} 
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={value => setMaxPositionSize(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative (1%)</span>
                      <span>Aggressive (50%)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="leverage-limit">Maximum Leverage</Label>
                      <span className="font-medium">{leverageLimit}x</span>
                    </div>
                    <Slider 
                      id="leverage-limit" 
                      value={[leverageLimit]} 
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={value => setLeverageLimit(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative (1x)</span>
                      <span>Aggressive (20x)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="position-scaling" defaultChecked />
                    <Label htmlFor="position-scaling">
                      Enable automatic position scaling based on volatility
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="protection" className="mt-6 space-y-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Stop Loss Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure automatic stop loss protection for all positions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="enable-stop-loss" 
                      checked={stopLossActive} 
                      onCheckedChange={setStopLossActive} 
                    />
                    <Label htmlFor="enable-stop-loss">
                      Enable automatic stop loss for all positions
                    </Label>
                  </div>
                  
                  {stopLossActive && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stop-loss-percent">Default Stop Loss (%)</Label>
                        <span className="font-medium">{stopLossPercent}%</span>
                      </div>
                      <Slider 
                        id="stop-loss-percent" 
                        value={[stopLossPercent]} 
                        min={1}
                        max={20}
                        step={0.5}
                        onValueChange={value => setStopLossPercent(value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Tight (1%)</span>
                        <span>Wide (20%)</span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="trailing-stop" defaultChecked />
                          <Label htmlFor="trailing-stop">
                            Use trailing stop loss to lock in profits
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="volatility-based" />
                          <Label htmlFor="volatility-based">
                            Adjust stop loss distance based on volatility (ATR)
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Liquidation Protection</CardTitle>
                  <CardDescription className="text-gray-400">
                    Set up safeguards against liquidation events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="liquidation-protection" defaultChecked />
                    <Label htmlFor="liquidation-protection">
                      Enable automatic position reduction near liquidation price
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="liquidation-threshold">Liquidation Threshold (%)</Label>
                    <Input 
                      id="liquidation-threshold"
                      type="number"
                      className="bg-trading-dark border-gray-700"
                      defaultValue="80"
                    />
                    <p className="text-xs text-gray-500">Position will be reduced when this % of distance to liquidation is reached</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts" className="mt-6 space-y-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Risk Alerts Configuration</CardTitle>
                  <CardDescription className="text-gray-400">
                    Set up notifications for risk-related events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="alert-loss-limit" defaultChecked />
                      <Label htmlFor="alert-loss-limit">
                        Alert when approaching daily loss limit (80% threshold)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="alert-volatility" defaultChecked />
                      <Label htmlFor="alert-volatility">
                        Alert on abnormal market volatility spikes
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="alert-liquidation" defaultChecked />
                      <Label htmlFor="alert-liquidation">
                        Alert when positions approach liquidation threshold
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="alert-exposure" defaultChecked />
                      <Label htmlFor="alert-exposure">
                        Alert when total position exposure exceeds specified limits
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="alert-news" defaultChecked />
                      <Label htmlFor="alert-news">
                        Alert on high-impact news events that could affect positions
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Label>Alert Delivery Methods</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-platform" defaultChecked />
                        <Label htmlFor="alert-platform">
                          In-platform notifications
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-email" defaultChecked />
                        <Label htmlFor="alert-email">
                          Email alerts
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-telegram" />
                        <Label htmlFor="alert-telegram">
                          Telegram notifications
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button className="bg-trading-primary hover:bg-trading-secondary">
                  Save Risk Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Risk;
