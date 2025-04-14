
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPlatform, setNotifyPlatform] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [chartType, setChartType] = useState("candlestick");
  
  return (
    <div className="flex h-screen bg-trading-dark text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-400">Configure your AlphaEdge platform preferences</p>
          </div>
          
          <Tabs defaultValue="account">
            <TabsList className="bg-trading-darker border-gray-800">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="preferences">Trading Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="trader_pro"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="trader@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="John"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name"
                        className="bg-trading-dark border-gray-700"
                        defaultValue="Trader"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="UTC">
                      <SelectTrigger id="timezone" className="bg-trading-dark border-gray-700">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-4">
                    <Button variant="outline" className="border-gray-700">Cancel</Button>
                    <Button className="bg-trading-primary hover:bg-trading-secondary">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-trading-darker text-white border-gray-800 mt-6">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your subscription and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Plan: <span className="text-trading-primary">Pro Trader</span></p>
                        <p className="text-sm text-gray-400">Next billing date: May 15, 2023</p>
                      </div>
                      <Button variant="outline" className="border-gray-700">Manage Subscription</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Payment Method</h4>
                    <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-400">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Change</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-email">Email Notifications</Label>
                          <p className="text-sm text-gray-400">Receive notifications to your email address</p>
                        </div>
                        <Switch 
                          id="notify-email" 
                          checked={notifyEmail}
                          onCheckedChange={setNotifyEmail}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-platform">In-Platform Notifications</Label>
                          <p className="text-sm text-gray-400">Receive notifications within the AlphaEdge platform</p>
                        </div>
                        <Switch 
                          id="notify-platform"
                          checked={notifyPlatform}
                          onCheckedChange={setNotifyPlatform}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-telegram">Telegram Notifications</Label>
                          <p className="text-sm text-gray-400">Receive notifications via Telegram</p>
                        </div>
                        <Switch id="notify-telegram" />
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-trades">Trade Executions</Label>
                          <p className="text-sm text-gray-400">When orders are filled or trades are executed</p>
                        </div>
                        <Switch id="notify-trades" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-signals">Strategy Signals</Label>
                          <p className="text-sm text-gray-400">When trading strategies generate entry or exit signals</p>
                        </div>
                        <Switch id="notify-signals" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-errors">Error Alerts</Label>
                          <p className="text-sm text-gray-400">System errors or API connection issues</p>
                        </div>
                        <Switch id="notify-errors" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-news">Market News</Label>
                          <p className="text-sm text-gray-400">Important market news and events</p>
                        </div>
                        <Switch id="notify-news" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-trading-primary hover:bg-trading-secondary">Save Notification Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize the look and feel of the AlphaEdge platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-gray-400">Use dark theme for reduced eye strain in low light</p>
                    </div>
                    <Switch 
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chart-type">Default Chart Type</Label>
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger id="chart-type" className="bg-trading-dark border-gray-700">
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candlestick">Candlestick</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="heikin-ashi">Heikin Ashi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color-theme">Color Theme</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="color-theme" className="bg-trading-dark border-gray-700">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="blue">Blue Focus</SelectItem>
                        <SelectItem value="green">Green Focus</SelectItem>
                        <SelectItem value="purple">Purple Focus</SelectItem>
                        <SelectItem value="contrast">High Contrast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Dashboard Layout</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-trading-primary">
                        <p className="font-medium mb-2">Default Layout</p>
                        <div className="aspect-video bg-gray-900 rounded"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-4 cursor-pointer">
                        <p className="font-medium mb-2">Trading Focus</p>
                        <div className="aspect-video bg-gray-900 rounded"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-4 cursor-pointer">
                        <p className="font-medium mb-2">Analysis Focus</p>
                        <div className="aspect-video bg-gray-900 rounded"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-4 cursor-pointer">
                        <p className="font-medium mb-2">Custom Layout</p>
                        <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
                          <Button variant="outline" size="sm" className="border-gray-700">Configure</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-trading-primary hover:bg-trading-secondary">Save Appearance Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Trading Preferences</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure default settings for trading operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-leverage">Default Leverage</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="default-leverage" className="bg-trading-dark border-gray-700">
                        <SelectValue placeholder="Select default leverage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x (No Leverage)</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                        <SelectItem value="3">3x</SelectItem>
                        <SelectItem value="5">5x</SelectItem>
                        <SelectItem value="10">10x</SelectItem>
                        <SelectItem value="20">20x</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Default leverage applied to new positions when not specified</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-order-type">Default Order Type</Label>
                    <Select defaultValue="limit">
                      <SelectTrigger id="default-order-type" className="bg-trading-dark border-gray-700">
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                        <SelectItem value="stop_market">Stop Market</SelectItem>
                        <SelectItem value="stop_limit">Stop Limit</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Default order type for manual trades</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="confirm-trades">Trade Confirmation</Label>
                      <p className="text-sm text-gray-400">Require confirmation before executing trades</p>
                    </div>
                    <Switch id="confirm-trades" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-reduce">Auto Position Reduction</Label>
                      <p className="text-sm text-gray-400">Automatically reduce position size when approaching liquidation</p>
                    </div>
                    <Switch id="auto-reduce" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-stop-loss">Default Stop Loss (%)</Label>
                    <Input 
                      id="default-stop-loss"
                      type="number"
                      className="bg-trading-dark border-gray-700"
                      defaultValue="5"
                    />
                    <p className="text-xs text-gray-500">Default stop loss percentage applied to new positions</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-take-profit">Default Take Profit (%)</Label>
                    <Input 
                      id="default-take-profit"
                      type="number"
                      className="bg-trading-dark border-gray-700"
                      defaultValue="10"
                    />
                    <p className="text-xs text-gray-500">Default take profit percentage applied to new positions</p>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-trading-primary hover:bg-trading-secondary">Save Trading Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <Card className="bg-trading-darker text-white border-gray-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Password</h3>
                    <Button variant="outline" className="border-gray-700">Change Password</Button>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Two-Factor Authentication (2FA)</Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-trading-profit font-medium mr-3">Enabled</span>
                        <Button variant="outline" size="sm" className="border-gray-700">Manage</Button>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <p className="text-sm text-gray-400">Automatically log out after period of inactivity</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger id="session-timeout" className="w-32 bg-trading-dark border-gray-700">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="0">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-gray-400">Chrome on Windows • New York, USA • 192.168.1.1</p>
                        </div>
                        <div className="text-xs px-2 py-1 bg-trading-profit/20 text-trading-profit rounded">Active</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-xs text-gray-400">iOS • New York, USA • 192.168.1.100</p>
                        </div>
                        <Button variant="destructive" size="sm">Revoke</Button>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-gray-800" />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                    <div className="flex space-x-4">
                      <Button variant="destructive">Reset All API Keys</Button>
                      <Button variant="destructive">Download Account Data</Button>
                    </div>
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

export default Settings;
