
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DexSelectorProps {
  onTypeChange: (type: 'DEX' | 'CEX') => void;
}

export default function DexSelector({ onTypeChange }: DexSelectorProps) {
  const { t } = useTranslation();
  const [exchangeType, setExchangeType] = useState<'DEX' | 'CEX'>('DEX');

  const handleTypeChange = (value: string) => {
    const type = value as 'DEX' | 'CEX';
    setExchangeType(type);
    onTypeChange(type);
  };

  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">{t("dexIntegration")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={exchangeType} 
          onValueChange={handleTypeChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="DEX">DEX</TabsTrigger>
            <TabsTrigger value="CEX">CEX</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
