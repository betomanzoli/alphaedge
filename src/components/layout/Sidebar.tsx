
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  LineChart, 
  Settings, 
  Wallet, 
  History,
  AlertTriangle,
  PanelTop,
  Lock,
  BookOpen,
  Gauge
} from "lucide-react";
import { NavLink } from "@/components/ui/nav-link";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside className={cn(
      "bg-trading-darker text-white border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-center mb-6">
          {isOpen ? (
            <span className="text-xl font-bold">AlgoTrader</span>
          ) : (
            <span className="text-xl font-bold">AT</span>
          )}
        </div>

        <nav className="space-y-1">
          <NavLink href="/" icon={<Home className="h-5 w-5" />} showText={isOpen}>
            Dashboard
          </NavLink>
          <NavLink href="/strategies" icon={<PanelTop className="h-5 w-5" />} showText={isOpen}>
            Strategies
          </NavLink>
          <NavLink href="/market" icon={<LineChart className="h-5 w-5" />} showText={isOpen}>
            Market Data
          </NavLink>
          <NavLink href="/wallet" icon={<Wallet className="h-5 w-5" />} showText={isOpen}>
            Wallet
          </NavLink>
          <NavLink href="/history" icon={<History className="h-5 w-5" />} showText={isOpen}>
            Trade History
          </NavLink>
          <NavLink href="/risk" icon={<AlertTriangle className="h-5 w-5" />} showText={isOpen}>
            Risk Management
          </NavLink>
          <NavLink href="/performance" icon={<Gauge className="h-5 w-5" />} showText={isOpen}>
            Performance
          </NavLink>
        </nav>

        <Separator className="my-4 bg-gray-800" />

        <nav className="space-y-1">
          <NavLink href="/settings" icon={<Settings className="h-5 w-5" />} showText={isOpen}>
            Settings
          </NavLink>
          <NavLink href="/api" icon={<Lock className="h-5 w-5" />} showText={isOpen}>
            API Keys
          </NavLink>
          <NavLink href="/docs" icon={<BookOpen className="h-5 w-5" />} showText={isOpen}>
            Documentation
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
