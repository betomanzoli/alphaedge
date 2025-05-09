
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEX_POOLS } from "@/constants/dex";
import { useAllPoolsData } from "@/hooks/usePoolData";
import { Loader } from "lucide-react";

interface PoolSelectorProps {
  onPoolSelect: (poolAddress: string) => void;
}

export default function PoolSelector({ onPoolSelect }: PoolSelectorProps) {
  const { t } = useTranslation();
  const [selectedPool, setSelectedPool] = useState<string>(DEX_POOLS[0]?.address || '');
  const { poolsData, loading } = useAllPoolsData();

  const handlePoolChange = (value: string) => {
    setSelectedPool(value);
    onPoolSelect(value);
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("selectPool")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader className="h-5 w-5 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-400">{t("loading")}</span>
          </div>
        ) : (
          <>
            <Select value={selectedPool} onValueChange={handlePoolChange}>
              <SelectTrigger className="bg-trading-dark border-gray-700">
                <SelectValue placeholder={t("selectPool")} />
              </SelectTrigger>
              <SelectContent>
                {DEX_POOLS.map((pool) => (
                  <SelectItem key={pool.address} value={pool.address}>
                    {pool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedPool && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-trading-dark p-2 rounded">
                    <div className="text-xs text-gray-400">{t("pool")}</div>
                    <div className="font-medium truncate">
                      {DEX_POOLS.find(p => p.address === selectedPool)?.name}
                    </div>
                  </div>
                  <div className="bg-trading-dark p-2 rounded">
                    <div className="text-xs text-gray-400">Fee</div>
                    <div className="font-medium">
                      {(DEX_POOLS.find(p => p.address === selectedPool)?.fee || 0) / 10000}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
