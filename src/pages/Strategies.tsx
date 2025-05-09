
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DexSelector from "@/components/dex/DexSelector";
import WalletConnector from "@/components/dex/WalletConnector";
import NetworkSelector from "@/components/dex/NetworkSelector";
import PoolSelector from "@/components/dex/PoolSelector";
import PoolInfo from "@/components/dex/PoolInfo";
import Web3Provider from "@/providers/Web3Provider";
import { DEX_POOLS } from "@/constants/dex";

const Strategies = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exchangeType, setExchangeType] = useState<'DEX' | 'CEX'>('DEX');
  const [selectedPool, setSelectedPool] = useState<string>(DEX_POOLS[0]?.address || '');

  const handleExchangeTypeChange = (type: 'DEX' | 'CEX') => {
    setExchangeType(type);
  };

  const handlePoolSelect = (poolAddress: string) => {
    setSelectedPool(poolAddress);
  };

  return (
    <Web3Provider>
      <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 overflow-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">{t("strategies")}</h2>
                <p className="text-gray-400">
                  {exchangeType === 'DEX' 
                    ? 'Configure estratégias para tokens de baixa liquidez em DEXs' 
                    : 'Configure estratégias para troca em corretoras centralizadas'}
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="dex" className="mb-6">
              <TabsList className="bg-trading-darker border-gray-700">
                <TabsTrigger value="dex">DEX</TabsTrigger>
                <TabsTrigger value="strategies">Estratégias</TabsTrigger>
                <TabsTrigger value="analytics">Análise</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dex">
                <Grid className="grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1 space-y-6">
                    <DexSelector onTypeChange={handleExchangeTypeChange} />
                    <WalletConnector />
                    <NetworkSelector />
                    <PoolSelector onPoolSelect={handlePoolSelect} />
                  </div>
                  
                  <div className="md:col-span-3 space-y-6">
                    <PoolInfo poolAddress={selectedPool} />
                    
                    <Card className="bg-trading-darker border-gray-800">
                      <CardHeader>
                        <CardTitle>Análise do Token</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center text-gray-400">
                          Dados de análise detalhada aparecerão aqui após a implementação completa da integração com a API
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-trading-darker border-gray-800">
                        <CardHeader>
                          <CardTitle>Performance do par opXEN/ETH</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center text-gray-400">
                            Dados históricos serão carregados após a implementação do rastreamento de preços
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-trading-darker border-gray-800">
                        <CardHeader>
                          <CardTitle>Volume de Negociação</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center text-gray-400">
                            Dados de volume serão carregados após a implementação do rastreamento on-chain
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </Grid>
              </TabsContent>
              
              <TabsContent value="strategies">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader>
                    <CardTitle>Estratégias de Trading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-gray-400">
                      Configure e gerencie suas estratégias de trading para o token opXEN
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card className="bg-trading-darker border-gray-800">
                  <CardHeader>
                    <CardTitle>Análise de Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-gray-400">
                      Visualize a performance histórica de suas estratégias
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Web3Provider>
  );
};

export default Strategies;
