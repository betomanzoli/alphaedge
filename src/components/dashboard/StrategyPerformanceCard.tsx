
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const strategyData = [
  { name: 'Grid', performance: 8.3 },
  { name: 'DCA', performance: 5.7 },
  { name: 'Trend', performance: -2.1 },
  { name: 'Mean Rev', performance: 6.4 },
];

const StrategyPerformanceCard = () => {
  return (
    <Card className="bg-trading-darker border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Strategy Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={strategyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#121726',
                  borderColor: '#374151',
                  borderRadius: '0.375rem',
                }}
                labelStyle={{ color: '#F9FAFB' }}
                formatter={(value) => [`${value}%`, 'Performance']}
              />
              <Bar 
                dataKey="performance"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              >
                {strategyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.performance >= 0 ? "#10B981" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyPerformanceCard;
