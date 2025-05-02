
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Wallet, Database, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Grid } from "@/components/ui/grid";

interface BlockchainConnectorProps {
  onConnectionChange: (connected: boolean) => void;
}

const BlockchainConnector = ({ onConnectionChange }: BlockchainConnectorProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState("mainnet");
  const [provider, setProvider] = useState("infura");
  const [apiKey, setApiKey] = useState("");
  const [useFlashbots, setUseFlashbots] = useState(true);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!apiKey) {
      toast({
        title: "Erro de conexão",
        description: "Por favor, insira uma chave API válida",
        variant: "destructive"
      });
      return;
    }

    // Simular conexão
    toast({
      title: "Conectado com sucesso",
      description: `Conectado à rede ${network} via ${provider}`,
    });
    
    setIsConnected(true);
    onConnectionChange(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    onConnectionChange(false);
    
    toast({
      title: "Desconectado",
      description: "Conexão com blockchain encerrada",
    });
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" /> 
          Status de Conexão: {isConnected ? 
            <span className="text-trading-profit">Conectado</span> : 
            <span className="text-trading-loss">Desconectado</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="network">Rede</Label>
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger id="network" className="bg-trading-dark border-gray-700">
                  <SelectValue placeholder="Selecionar Rede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger id="provider" className="bg-trading-dark border-gray-700">
                  <SelectValue placeholder="Selecionar Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infura">Infura</SelectItem>
                  <SelectItem value="alchemy">Alchemy</SelectItem>
                  <SelectItem value="custom">RPC Customizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="apiKey">Chave API</Label>
              <Input 
                id="apiKey" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                className="bg-trading-dark border-gray-700" 
                type="password"
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleConnect} className="w-full bg-trading-primary hover:bg-trading-secondary">
                <Wallet className="h-4 w-4 mr-2" /> Conectar
              </Button>
            </div>
            
            <div className="md:col-span-2 lg:col-span-4 flex items-center space-x-2">
              <Switch id="flashbots" checked={useFlashbots} onCheckedChange={setUseFlashbots} />
              <Label htmlFor="flashbots" className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Utilizar Flashbots para transações privadas
              </Label>
            </div>
          </Grid>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-trading-dark rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Rede</div>
                <div className="font-medium capitalize">{network}</div>
              </div>
              <div className="bg-trading-dark rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Provider</div>
                <div className="font-medium capitalize">{provider}</div>
              </div>
              <div className="bg-trading-dark rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Flashbots</div>
                <div className="font-medium">{useFlashbots ? "Ativado" : "Desativado"}</div>
              </div>
            </div>
            
            <Button onClick={handleDisconnect} variant="destructive">
              Desconectar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockchainConnector;
