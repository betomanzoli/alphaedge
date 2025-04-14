
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="bg-trading-darker border-b border-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-4">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center">
          <Logo />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-trading-primary h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">API Connection Active</span>
                <span className="text-xs text-muted-foreground">Your Binance API connection is now active</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">Strategy Activated</span>
                <span className="text-xs text-muted-foreground">Grid Trading strategy is now running</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">Order Executed</span>
                <span className="text-xs text-muted-foreground">Buy order for BTC executed at $66,250</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem>API Configuration</DropdownMenuItem>
            <DropdownMenuItem>Theme</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help & Documentation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
