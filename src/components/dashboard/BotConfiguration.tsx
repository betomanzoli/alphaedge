
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

const configFormSchema = z.object({
  strategy: z.string(),
  investmentAmount: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Investment amount must be a number",
    }),
  buyThreshold: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Threshold must be a number",
    }),
  stopLoss: z.string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Stop Loss must be a number",
    }),
  mode: z.enum(["test", "production"]),
  enableNotifications: z.boolean(),
});

type ConfigFormValues = z.infer<typeof configFormSchema>;

const BotConfiguration = () => {
  const { toast } = useToast();
  const [isTestMode, setIsTestMode] = useState(true);
  
  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      strategy: "buyDip",
      investmentAmount: "0.1",
      buyThreshold: "5",
      stopLoss: "10",
      mode: "test",
      enableNotifications: true,
    },
  });
  
  const onSubmit = (data: ConfigFormValues) => {
    // In a real implementation, this would send the configuration to the server
    console.log("Bot configuration saved:", data);
    
    toast({
      title: "Configuration updated",
      description: "Trading bot configuration has been updated successfully.",
    });
  };
  
  const handleModeChange = (mode: "test" | "production") => {
    setIsTestMode(mode === "test");
    form.setValue("mode", mode);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-trading-darker border-gray-800 lg:col-span-2">
        <CardHeader>
          <CardTitle>Trading Bot Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="strategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strategy</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-trading-dark border-gray-700">
                          <SelectValue placeholder="Select a strategy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-trading-dark border-gray-700">
                        <SelectItem value="buyDip">Buy the Dip</SelectItem>
                        <SelectItem value="dca">Dollar Cost Averaging</SelectItem>
                        <SelectItem value="volatility">Volatility Trading</SelectItem>
                        <SelectItem value="custom">Custom Strategy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the strategy the bot will use to accumulate tokens.
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
                      <FormLabel>Investment per operation (ETH)</FormLabel>
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
                      <FormLabel>Buy threshold (%)</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-trading-dark border-gray-700" 
                          placeholder="5" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Price drop needed to trigger a buy
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
                        <FormLabel>Notifications</FormLabel>
                        <FormDescription>
                          Receive alerts about trading operations
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
                    <FormLabel>Operation Mode</FormLabel>
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
                            Test Mode
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="production" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Production Mode
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      In test mode, no real operations will be executed.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              {!isTestMode && (
                <Alert className="bg-trading-dark border-yellow-600/30">
                  <InfoIcon className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-600">
                    Warning: Production Mode
                  </AlertTitle>
                  <AlertDescription className="text-yellow-600/80">
                    In production mode, the bot will execute real trades using your ETH balance.
                    Make sure your configuration is correct.
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Save Configuration
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="bg-trading-darker border-gray-800">
        <CardHeader>
          <CardTitle>Strategy Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Buy the Dip</h4>
              <p className="text-sm text-gray-400">
                This strategy monitors sudden price drops and executes buy orders
                when it identifies a significant dip, aiming to take advantage of the subsequent recovery.
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="font-medium mb-2">Recommended Parameters</h4>
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
                  <span className="text-gray-400">Investment per Operation:</span>
                  <span>0.05-0.2 ETH</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="font-medium mb-2">Advanced Settings</h4>
              <div className="text-sm space-y-1 text-gray-400">
                <p>
                  For advanced configuration options, you can modify parameters directly in the server's
                  configuration file or using the API endpoints.
                </p>
                <p className="mt-2">
                  Additional options include slippage tolerance, gas price limits,
                  and custom order routing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotConfiguration;
