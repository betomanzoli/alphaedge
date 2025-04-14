
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Docs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Documentation</h2>
            <p className="text-gray-400">Learn how to use AlphaEdge trading platform</p>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search"
                placeholder="Search documentation..."
                className="bg-trading-darker border-gray-700 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="getting-started">
            <TabsList className="bg-trading-darker border-gray-800">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="strategies">Trading Strategies</TabsTrigger>
              <TabsTrigger value="api">API Configuration</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="mt-6">
              <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Learn about the key components of the AlphaEdge trading platform and how they work together.</p>
                    <Button variant="outline" className="w-full border-gray-700">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>First Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Follow this step-by-step guide to set up your account, connect your API keys and execute your first trade.</p>
                    <Button variant="outline" className="w-full border-gray-700">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>Dashboard Explained</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Understand all the metrics, charts and controls on the AlphaEdge dashboard.</p>
                    <Button variant="outline" className="w-full border-gray-700">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Learn how to properly configure risk parameters to protect your capital while trading.</p>
                    <Button variant="outline" className="w-full border-gray-700">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>Security Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Understand how to secure your account and API keys for safe automated trading.</p>
                    <Button variant="outline" className="w-full border-gray-700">Read Guide</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800 hover:border-trading-primary transition-colors">
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">Watch step-by-step video guides for setting up and using AlphaEdge platform features.</p>
                    <Button variant="outline" className="w-full border-gray-700">Watch Videos</Button>
                  </CardContent>
                </Card>
              </Grid>
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-6">
              <Grid className="grid-cols-1 gap-6">
                <Card className="bg-trading-darker text-white border-gray-800">
                  <CardHeader>
                    <CardTitle>Trading Strategies Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Trend Following Strategy</h3>
                      <p className="text-gray-300">
                        The trend following strategy aims to capture gains by riding directional price movements (trends). 
                        It typically enters a long position when the price moves above a certain threshold and a short position when it moves below another threshold.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-trading-primary p-0">Learn more</Button>
                      </div>
                      <hr className="border-gray-800" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Grid Trading Strategy</h3>
                      <p className="text-gray-300">
                        Grid trading places buy and sell orders at regular intervals (a grid) above and below a set price. 
                        This strategy profits from price oscillations in sideways markets, buying low and selling high automatically as the price moves through the grid levels.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-trading-primary p-0">Learn more</Button>
                      </div>
                      <hr className="border-gray-800" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Mean Reversion Strategy</h3>
                      <p className="text-gray-300">
                        Mean reversion strategies operate on the assumption that asset prices tend to revert to their historical average over time. 
                        The strategy buys assets that are below their historical average and sells assets that are above it.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-trading-primary p-0">Learn more</Button>
                      </div>
                      <hr className="border-gray-800" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Arbitrage Strategy</h3>
                      <p className="text-gray-300">
                        Arbitrage trading seeks to profit from price differences of the same asset on different markets. 
                        The strategy simultaneously buys on the exchange with the lower price and sells on the exchange with the higher price.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="link" className="text-trading-primary p-0">Learn more</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-trading-darker text-white border-gray-800">
                  <CardHeader>
                    <CardTitle>Strategy Configuration Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">
                      Each trading strategy in AlphaEdge can be customized with various parameters to match your trading style and risk tolerance. 
                      Below are the key configuration options available for all strategies.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Position Sizing</h4>
                        <p className="text-gray-400">Configure how much capital to allocate to each trade, either as a fixed amount or percentage of your portfolio.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Entry and Exit Conditions</h4>
                        <p className="text-gray-400">Define precise conditions for when to enter and exit trades, including technical indicators, price levels, and time-based rules.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Risk Management</h4>
                        <p className="text-gray-400">Set stop-loss and take-profit levels, trailing stops, and maximum drawdown limits to protect your capital.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Trading Schedule</h4>
                        <p className="text-gray-400">Define when the strategy should be active, including specific days of the week or hours of the day.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Asset Selection</h4>
                        <p className="text-gray-400">Choose which trading pairs the strategy should monitor and trade on.</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-trading-primary hover:bg-trading-secondary">View Detailed Configuration Guide</Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </TabsContent>
            
            <TabsContent value="api" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Connecting to Exchanges</h3>
                    <p className="text-gray-300 mb-4">
                      AlphaEdge connects to cryptocurrency exchanges through their official APIs. 
                      This allows the platform to access market data, manage your portfolio, and execute trades automatically.
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Supported Exchanges:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        <li>Binance</li>
                        <li>Binance Futures</li>
                        <li>Bybit</li>
                        <li>OKX</li>
                        <li>FTX</li>
                        <li>Kraken</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">API Key Requirements</h3>
                    <p className="text-gray-300 mb-4">
                      To connect AlphaEdge to an exchange, you'll need to create API keys from your exchange account. 
                      The minimum required permissions for the API keys are:
                    </p>
                    
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>Read account information and balances</li>
                      <li>Read market data</li>
                      <li>Place and manage orders</li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-gray-900 rounded-md border border-gray-700">
                      <p className="text-amber-400 font-medium">Security Note:</p>
                      <p className="text-gray-300 mt-1">
                        For security reasons, we recommend creating API keys with only the permissions necessary for AlphaEdge to function. 
                        Do not enable withdrawal permissions unless absolutely necessary.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Setup Guide</h3>
                    <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                      <li>
                        <p><span className="font-medium">Create API Keys:</span> Log in to your exchange account and navigate to the API management section.</p>
                      </li>
                      <li>
                        <p><span className="font-medium">Set Permissions:</span> Configure the API key with read access and trading permissions, but no withdrawal permissions.</p>
                      </li>
                      <li>
                        <p><span className="font-medium">Set IP Restrictions:</span> For enhanced security, restrict API access to specific IP addresses.</p>
                      </li>
                      <li>
                        <p><span className="font-medium">Copy API Keys:</span> Copy the API key and secret key provided by the exchange.</p>
                      </li>
                      <li>
                        <p><span className="font-medium">Enter in AlphaEdge:</span> Go to the API Configuration section in AlphaEdge and enter your API credentials.</p>
                      </li>
                      <li>
                        <p><span className="font-medium">Test Connection:</span> Use the "Test Connection" button to verify the API keys are working correctly.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-trading-primary hover:bg-trading-secondary mr-4">Step-by-Step API Setup Guide</Button>
                    <Button variant="outline" className="border-gray-700">Video Tutorial</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">What is AlphaEdge?</h3>
                    <p className="text-gray-300">
                      AlphaEdge is an advanced crypto trading platform that allows you to automate your trading strategies across multiple exchanges.
                      It provides tools for backtesting, real-time market analysis, and automated execution of trading strategies.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Is my API key information secure?</h3>
                    <p className="text-gray-300">
                      Yes, AlphaEdge uses end-to-end encryption to secure your API keys. Keys are encrypted before being stored in our database
                      and are only decrypted when needed to execute trades. We never store your API keys in plain text.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">How much starting capital do I need?</h3>
                    <p className="text-gray-300">
                      You can start using AlphaEdge with any amount of capital. However, we recommend starting with at least $1,000
                      to ensure you can properly diversify and minimize trading fees as a percentage of your portfolio.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Do I need coding skills to use AlphaEdge?</h3>
                    <p className="text-gray-300">
                      No, AlphaEdge is designed to be used without any coding knowledge. All strategies can be configured through
                      the user interface. However, advanced users can create custom strategies using our Python API.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Can I run multiple strategies simultaneously?</h3>
                    <p className="text-gray-300">
                      Yes, AlphaEdge allows you to run multiple strategies simultaneously across different trading pairs.
                      You can allocate different portions of your portfolio to each strategy.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">What happens if my internet connection goes down?</h3>
                    <p className="text-gray-300">
                      AlphaEdge runs on cloud servers, so your strategies will continue to operate even if your personal
                      internet connection goes down. You only need internet connection to access the platform and make changes.
                    </p>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">How do I get support if I have a problem?</h3>
                    <p className="text-gray-300">
                      AlphaEdge provides 24/7 customer support via live chat, email, and our community forum.
                      You can also schedule a one-on-one session with our trading experts for personalized assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Docs;
