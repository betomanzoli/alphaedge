
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const strategyFormSchema = z.object({
  strategy: z.string(),
  investmentAmount: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Valor de investimento deve ser um número",
    }),
  buyThreshold: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Threshold deve ser um número",
    }),
  stopLoss: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Stop Loss deve ser um número",
    }),
  mode: z.enum(["test", "production"]),
  enableNotifications: z.boolean(),
});

type StrategyFormValues = z.infer<typeof strategyFormSchema>;

const StrategyConfiguration = () => {
  const { toast } = useToast();
  const [isTestMode, setIsTestMode] = useState(true);
  
  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategyFormSchema),
    defaultValues: {
      strategy: "buyDip",
      investmentAmount: "0.1",
      buyThreshold: "5",
      stopLoss: "10",
      mode: "test",
      enableNotifications: true,
    },
  });
  
  const onSubmit = (data: StrategyFormValues) => {
    toast({
      title: "Configurações atualizadas",
      description: "As configurações do trading bot foram atualizadas com sucesso.",
    });
    
    console.log("Estratégia configurada:", data);
  };
  
  const handleModeChange = (mode: "test" | "production") => {
    setIsTestMode(mode === "test");
    form.setValue("mode", mode);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-trading-darker border-gray-800 lg:col-span-2">
        <CardHeader>
          <CardTitle>Configuração de Estratégias</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="strategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estratégia</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-trading-dark border-gray-700">
                          <SelectValue placeholder="Selecione uma estratégia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-trading-dark border-gray-700">
                        <SelectItem value="buyDip">Buy the Dip</SelectItem>
                        <SelectItem value="dca">Dollar Cost Averaging</SelectItem>
                        <SelectItem value="volatility">Volatility Trading</SelectItem>
                        <SelectItem value="custom">Estratégia Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Escolha a estratégia que o bot irá seguir para acumular tokens.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor por operação (ETH)</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-trading-dark border-gray-700" 
                          placeholder="0.1" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="buyThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold de compra (%)</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-trading-dark border-gray-700" 
                          placeholder="5" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Queda necessária para disparar compra
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stopLoss"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stop Loss (%)</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-trading-dark border-gray-700" 
                          placeholder="10" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border border-gray-700 p-4 bg-trading-dark">
                      <div className="space-y-0.5">
                        <FormLabel>Notificações</FormLabel>
                        <FormDescription>
                          Receber alertas sobre operações
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modo de Operação</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => handleModeChange(value as "test" | "production")}
                        defaultValue={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="test" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Modo Teste
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="production" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Produção
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      No modo teste, nenhuma operação real será executada.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              {!isTestMode && (
                <Alert className="bg-trading-dark border-yellow-600/30">
                  <InfoIcon className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-600">
                    Atenção: Modo Produção
                  </AlertTitle>
                  <AlertDescription className="text-yellow-600/80">
                    No modo produção, o bot realizará operações reais usando seu saldo de ETH. 
                    Certifique-se de que as configurações estão corretas.
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Salvar Configurações
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="bg-trading-darker border-gray-800">
        <CardHeader>
          <CardTitle>Informações da Estratégia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Buy the Dip</h4>
              <p className="text-sm text-gray-400">
                Esta estratégia monitora quedas súbitas no preço do token e executa compras
                quando identifica uma queda significativa, com o objetivo de aproveitar a recuperação posterior.
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="font-medium mb-2">Parâmetros Recomendados</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Threshold:</span>
                  <span>5-10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stop Loss:</span>
                  <span>15-20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor por Operação:</span>
                  <span>0.05-0.2 ETH</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="font-medium mb-2">Tokens Suportados</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-trading-dark border border-gray-700 rounded-full text-xs">opXEN</div>
                <div className="px-3 py-1 bg-trading-dark border border-gray-700 rounded-full text-xs">wOPT</div>
                <div className="px-3 py-1 bg-trading-dark border border-gray-700 rounded-full text-xs">VELODROME</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyConfiguration;
