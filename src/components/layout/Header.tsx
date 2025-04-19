
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, Settings, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [notifications, setNotifications] = useState(0); // Iniciando sem notificações
  const navigate = useNavigate();

  return (
    <header className="bg-trading-darker border-b border-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-4">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-yellow-400 hover:text-yellow-300"
          onClick={() => navigate("/risk")}
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Riscos</span>
        </Button>

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
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications === 0 ? (
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Sem notificações no momento</span>
                </div>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Configurações da Conta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/api")}>
              Configuração de API
            </DropdownMenuItem>
            <DropdownMenuItem>Tema</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/docs")}>
              Ajuda & Documentação
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Preferências
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
