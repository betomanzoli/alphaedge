
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHAIN_OPTIMISM_MAINNET, CHAIN_OPTIMISM_TESTNET } from "@/constants/dex";
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";

export default function NetworkSelector() {
  const { t } = useTranslation();
  const { chainId, switchToNetwork, active } = useWeb3();
  
  useEffect(() => {
    // If connected but not on Optimism, suggest switching
    if (active && chainId && chainId !== CHAIN_OPTIMISM_MAINNET && chainId !== CHAIN_OPTIMISM_TESTNET) {
      // Suggest switching to Optimism
    }
  }, [chainId, active]);
  
  const handleNetworkChange = async (value: string) => {
    const network = parseInt(value);
    await switchToNetwork(network);
  };
  
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Network size={18} /> {t("selectPool")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!active ? (
          <p className="text-sm text-gray-400">{t("connect")} a carteira para selecionar a rede</p>
        ) : (
          <Select
            value={chainId ? chainId.toString() : undefined}
            onValueChange={handleNetworkChange}
          >
            <SelectTrigger className="bg-trading-dark border-gray-700">
              <SelectValue placeholder={t("selectPool")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CHAIN_OPTIMISM_MAINNET.toString()}>Optimism Mainnet</SelectItem>
              <SelectItem value={CHAIN_OPTIMISM_TESTNET.toString()}>Optimism Testnet</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {active && chainId && chainId !== CHAIN_OPTIMISM_MAINNET && chainId !== CHAIN_OPTIMISM_TESTNET && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => switchToNetwork(CHAIN_OPTIMISM_MAINNET)}
              className="w-full"
            >
              Mudar para Optimism
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
