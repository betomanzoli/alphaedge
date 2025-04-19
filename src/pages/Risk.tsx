
import { 
  Info, 
  AlertTriangle, 
  ShieldCheck 
} from "lucide-react";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Risk = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leverage, setLeverage] = useState(1);
  const [maxDrawdown, setMaxDrawdown] = useState(10);
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const { toast } = useToast();

  const validateApiKey = () => {
    // Placeholder for API key validation logic
    if (apiKey.length > 5) {
      setIsApiKeyValid(true);
      toast({
        title: "API Key Validated",
        description: "Your API key has been successfully validated",
        variant: "default",
      });
    } else {
      setIsApiKeyValid(false);
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Risk Management</h1>

          <Card className="mb-4 bg-trading-darker border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Account Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <p className="text-sm text-gray-400">
                    Adjust these settings to protect your account from excessive losses.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="leverage">Maximum Leverage</Label>
                  <Input 
                    type="number" 
                    id="leverage" 
                    value={leverage} 
                    onChange={(e) => setLeverage(Number(e.target.value))} 
                    className="bg-trading-darker border-gray-700"
                  />
                  <p className="text-sm text-gray-400">Set the maximum leverage allowed for your strategies.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDrawdown">Maximum Drawdown (%)</Label>
                  <Input 
                    type="number" 
                    id="maxDrawdown" 
                    value={maxDrawdown} 
                    onChange={(e) => setMaxDrawdown(Number(e.target.value))} 
                    className="bg-trading-darker border-gray-700"
                  />
                  <p className="text-sm text-gray-400">Limit the maximum percentage drawdown your account can experience.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-trading-darker border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                API Key Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <p className="text-sm text-gray-400">
                    Enter your API key to validate its permissions and security.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input 
                    type="password" 
                    id="apiKey" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    className="bg-trading-darker border-gray-700"
                  />
                </div>

                <Button 
                  onClick={validateApiKey} 
                  disabled={isApiKeyValid} 
                  className="bg-trading-primary hover:bg-trading-secondary"
                >
                  {isApiKeyValid ? "API Key Validated" : "Validate API Key"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Risk;
