
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StrategySelector from "@/components/mev/StrategySelector";
import MempoolMonitor from "@/components/mev/MempoolMonitor";
import { Grid } from "@/components/ui/grid";
import MevPerformance from "@/components/mev/MevPerformance";
import ActiveStrategies from "@/components/mev/ActiveStrategies";
import BlockchainConnector from "@/components/mev/BlockchainConnector";
import { Info } from "lucide-react";

const MevDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isConnected, setIsConnected] = useState(false);
  
  return (
    <div className="space-y-6">
      <BlockchainConnector onConnectionChange={setIsConnected} />
      
      {isConnected ? (
        <>
          <Grid className="grid-cols-1 md:grid-cols-3 gap-4">
            <ActiveStrategies />
            <div className="md:col-span-2">
              <MevPerformance />
            </div>
          </Grid>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="arbitrage">Arbitragem</TabsTrigger>
              <TabsTrigger value="frontrunning">Frontrunning</TabsTrigger>
              <TabsTrigger value="sandwiching">Sandwiching</TabsTrigger>
              <TabsTrigger value="liquidations">Liquidações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <StrategySelector />
              <MempoolMonitor />
            </TabsContent>
            
            <TabsContent value="arbitrage" className="mt-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle>Estratégia de Arbitragem</CardTitle>
                  <CardDescription>Monitore e execute oportunidades de arbitragem entre DEXs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="mb-4">Configuração de estratégia de arbitragem será implementada aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="frontrunning" className="mt-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle>Estratégia de Frontrunning</CardTitle>
                  <CardDescription>Detecte e execute transações frontrun na mempool</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="mb-4">Configuração de estratégia de frontrunning será implementada aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sandwiching" className="mt-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle>Estratégia de Sandwiching</CardTitle>
                  <CardDescription>Configure e execute sandwich attacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="mb-4">Configuração de estratégia de sandwiching será implementada aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="liquidations" className="mt-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle>Estratégia de Liquidações</CardTitle>
                  <CardDescription>Monitore e execute liquidações em protocolos DeFi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="mb-4">Configuração de estratégia de liquidações será implementada aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card className="bg-trading-darker border-gray-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Info className="h-5 w-5 text-blue-400 mt-1" />
              <div>
                <CardTitle>Conecte-se à Blockchain</CardTitle>
                <CardDescription className="mt-2">
                  Para começar a utilizar o MEV Bot, você precisa configurar sua conexão com a blockchain.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Siga os passos abaixo para configurar seu MEV Bot:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Conecte sua carteira Ethereum (MetaMask, WalletConnect)</li>
                <li>Configure suas chaves de API para providers (Infura, Alchemy)</li>
                <li>Defina as configurações de gas para suas estratégias</li>
                <li>Selecione as estratégias que deseja utilizar</li>
                <li>Configure os parâmetros para cada estratégia</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MevDashboard;
