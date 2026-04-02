'use client';

import { Card, CardContent, CardHeader, CardTitle } from './cards';

import { InsightsFirstBox, InsightsHeader } from './insightsComponents';
import { BalanceChart, CategoryChart } from './charts';
import { expenseByCategory } from '@/lib/insights';
import { useTransactionStore } from '@/store';

export function InsightsHolder() {
  const transactions = useTransactionStore((s) => s.transactions);

  const categoryData = expenseByCategory(transactions);

  return (
    <div className="flex w-full flex-col gap-4">
      <InsightsHeader />
      <InsightsFirstBox />
      <div className="flex flex-row gap-4 max-lg:flex-wrap">
        <Card className="w-1/2 max-lg:w-full">
          <CardHeader>
            <CardTitle>Balance Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <BalanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
