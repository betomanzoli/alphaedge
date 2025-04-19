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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ApiKeys = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState([]);

  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold">Gerenciamento de Chaves API</h2>
              <p className="text-gray-400 mt-1">Gerencie suas conexões com exchanges de forma segura</p>
            </div>
            
            <Alert className="bg-amber-900/20 border-amber-800 text-amber-100">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Aviso de Segurança Importante</AlertTitle>
              <AlertDescription>
                Nunca compartilhe suas chaves API com ninguém. Este aplicativo criptografa e armazena suas chaves de forma segura.
                Recomendamos criar chaves API com permissões de trading apenas quando necessário.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-trading-darker border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <KeyRound className="h-5 w-5 mr-2" />
                    Adicionar Nova Chave API
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Conecte uma nova conta de exchange
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="exchange">Exchange</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Selecione a exchange onde você criou sua chave API</p>
                      </TooltipContent>
                    </Tooltip>
                    <select 
                      id="exchange"
                      className="w-full bg-trading-dark border border-gray-800 rounded-md p-2 text-white"
                    >
                      <option value="">Selecione uma exchange</option>
                      <option value="binance">Binance</option>
                      <option value="bybit">Bybit</option>
                      <option value="kucoin">KuCoin</option>
                      <option value="okx">OKX</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="key-name">Nome da Chave</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dê um nome descritivo para identificar esta chave API</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input 
                      id="key-name"
                      placeholder="Ex: Conta Principal"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="api-key">Chave API</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cole aqui a chave API gerada na sua exchange</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input 
                      id="api-key"
                      type="password"
                      placeholder="Digite sua chave API"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="api-secret">Chave Secreta</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cole aqui a chave secreta gerada na sua exchange</p>
                      </TooltipContent>
                    </Tooltip>
                    <Input 
                      id="api-secret"
                      type="password"
                      placeholder="Digite sua chave secreta"
                      className="bg-trading-dark border-gray-800"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <Switch id="testnet" />
                          <Label htmlFor="testnet">Usar Testnet</Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ative para usar o ambiente de testes da exchange</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <Button className="w-full bg-trading-primary hover:bg-trading-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Chave API
                  </Button>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Suas Chaves API</h3>
                
                {apiKeys.length === 0 ? (
                  <Card className="bg-trading-darker border-gray-800 p-6 text-center">
                    <p className="text-gray-400">
                      Você ainda não adicionou nenhuma chave API.
                      <br />
                      Adicione uma nova chave para começar a operar.
                    </p>
                  </Card>
                ) : (
                  apiKeys.map((key) => (
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
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiKeys;
