
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { usePoolData } from "@/hooks/usePoolData";
import { formatPrice, formatUSD } from "@/lib/utils";

interface PoolInfoProps {
  poolAddress: string;
}

export default function PoolInfo({ poolAddress }: PoolInfoProps) {
  const { t } = useTranslation();
  const { poolData, loading } = usePoolData(poolAddress);
  const [tvl, setTvl] = useState<number | null>(null);
  
  useEffect(() => {
    // Calculate TVL (simplified)
    if (poolData && !loading) {
      // In a real app, you'd use the actual reserves and token prices
      // This is just a placeholder calculation
      const liquidityBigInt = BigInt(poolData.liquidity || '0');
      const liquidityNum = Number(liquidityBigInt) / 1e18;
      
      let estimatedTVL = 0;
      if (poolData.token0?.symbol === 'WETH' || poolData.token0?.symbol === 'ETH') {
        // If token0 is ETH, use ETH price
        estimatedTVL = liquidityNum * 2000; // Assuming ETH price ~$2000
      } else if (poolData.token1?.symbol === 'WETH' || poolData.token1?.symbol === 'ETH') {
        // If token1 is ETH, use ETH price
        estimatedTVL = liquidityNum * 2000;
      } else {
        // Fallback for other tokens
        estimatedTVL = liquidityNum * 10; // Placeholder value
      }
      
      setTvl(estimatedTVL);
    }
  }, [poolData, loading]);

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("pool")} {t("info")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader className="h-5 w-5 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-400">{t("loading")}</span>
          </div>
        ) : poolData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-trading-dark p-2 rounded">
                <div className="text-xs text-gray-400">{t("price")}</div>
                <div className="font-medium">
                  {poolData.price ? formatPrice(poolData.price, 8) : 'N/A'} ETH
                </div>
              </div>
              
              <div className="bg-trading-dark p-2 rounded">
                <div className="text-xs text-gray-400">TVL</div>
                <div className="font-medium">{tvl ? formatUSD(tvl) : 'N/A'}</div>
              </div>
              
              <div className="bg-trading-dark p-2 rounded">
                <div className="text-xs text-gray-400">Fee</div>
                <div className="font-medium">{(poolData.fee / 10000).toFixed(2)}%</div>
              </div>
              
              <div className="bg-trading-dark p-2 rounded">
                <div className="text-xs text-gray-400">Tick</div>
                <div className="font-medium">{poolData.tick}</div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-medium mb-2">{t("tokenInfo")}</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Token 0:</span>
                  <span>{poolData.token0?.symbol || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Token 1:</span>
                  <span>{poolData.token1?.symbol || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 p-4">
            {t("error")} {t("loading")} {t("pool")} {t("info")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
