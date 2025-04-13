
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, AlertCircle, Plus, KeyRound } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const ApiKeys = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Binance Main", exchange: "Binance", isActive: true, permissions: ["Read", "Spot Trading"], created: "2025-03-15" },
    { id: 2, name: "Binance Futures", exchange: "Binance", isActive: false, permissions: ["Read", "Futures Trading"], created: "2025-03-20" },
  ]);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold">API Keys Management</h2>
              <p className="text-gray-400 mt-1">Securely manage your exchange API connections</p>
            </div>
            
            <Alert className="bg-amber-900/20 border-amber-800 text-amber-100">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Security Notice</AlertTitle>
              <AlertDescription>
                Never share your API keys with anyone. This application securely encrypts and stores your keys.
                We recommend creating API keys with trading permissions only when necessary.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <KeyRound className="h-5 w-5 mr-2" />
                    Add New API Key
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect a new exchange account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exchange">Exchange</Label>
                    <select 
                      id="exchange"
                      className="w-full bg-trading-dark border border-gray-800 rounded-md p-2 text-white"
                    >
                      <option value="binance">Binance</option>
                      <option value="bybit">Bybit</option>
                      <option value="kucoin">KuCoin</option>
                      <option value="okx">OKX</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input 
                      id="key-name"
                      placeholder="Main Account"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input 
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">API Secret</Label>
                    <Input 
                      id="api-secret"
                      type="password"
                      placeholder="Enter your API secret"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="testnet" />
                    <Label htmlFor="testnet">Use Testnet</Label>
                  </div>
                  
                  <Button className="w-full bg-trading-primary hover:bg-trading-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add API Key
                  </Button>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Your API Keys</h3>
                
                {apiKeys.map((key) => (
                  <Card key={key.id} className="bg-trading-darker border-gray-800">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{key.name}</div>
                          <div className="text-sm text-gray-400">{key.exchange}</div>
                          <div className="text-xs text-gray-500 mt-1">Added: {key.created}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {key.permissions.map((perm, i) => (
                              <span key={i} className="text-xs bg-gray-800 rounded px-2 py-1">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">Active</span>
                            <Switch checked={key.isActive} />
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 mt-2">
                            <Lock className="h-4 w-4 mr-1" /> Test Key
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiKeys;
