
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { shortenAddress } from "@/lib/utils";

export default function WalletConnector() {
  const { t } = useTranslation();
  const { active, account, connect, disconnect, isConnecting } = useWeb3();

  const getExplorerUrl = (account: string) => {
    return `https://optimistic.etherscan.io/address/${account}`;
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet size={18} /> {active ? t("wallet") : t("connect")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!active ? (
          <Button 
            onClick={connect} 
            className="w-full bg-trading-primary hover:bg-trading-secondary"
            disabled={isConnecting}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? t("loading") : t("connect")}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-trading-dark p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">{t("wallet")}</div>
              <div className="font-medium flex items-center justify-between">
                <span>{shortenAddress(account || '')}</span>
                <a 
                  href={getExplorerUrl(account || '')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              onClick={disconnect}
              className="w-full"
            >
              {t("disconnect")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
