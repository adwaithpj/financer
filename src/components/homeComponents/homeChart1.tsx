'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../cards';
import { useTransactionStore } from '@/store';
import { useMemo, useState } from 'react';
import { LineChart } from '../charts/lineChart';

const MONTHLY_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAILY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Map JS getDay() (Sun=0 … Sat=6) to Mon-first index 0…6 */
function weekdayIndexMonFirst(day: number) {
  return day === 0 ? 6 : day - 1;
}

type HomeChart1Props = {
  className?: string;
};

export function HomeChart1({ className }: HomeChart1Props) {
  const transactions = useTransactionStore((s) => s.transactions);
  const [range, setRange] = useState<'monthly' | 'daily'>('daily');

  const monthlySeries = useMemo(() => {
    const income = Array.from({ length: 12 }, () => 0);
    const expense = Array.from({ length: 12 }, () => 0);
    for (const t of transactions) {
      const m = new Date(t.date).getMonth();
      if (t.type === 'income') income[m] += t.amount;
      else expense[m] += t.amount;
    }
    return { income, expense };
  }, [transactions]);

  const dailySeries = useMemo(() => {
    const income = Array.from({ length: 7 }, () => 0);
    const expense = Array.from({ length: 7 }, () => 0);
    for (const t of transactions) {
      const idx = weekdayIndexMonFirst(new Date(t.date).getDay());
      if (t.type === 'income') income[idx] += t.amount;
      else expense[idx] += t.amount;
    }
    return { income, expense };
  }, [transactions]);

  const chartProps =
    range === 'monthly'
      ? {
          labels: MONTHLY_LABELS,
          datasets: [
            {
              label: 'Income',
              data: monthlySeries.income,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              fill: true,
            },
            {
              label: 'Expense',
              data: monthlySeries.expense,
              borderColor: 'rgb(244, 63, 94)',
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              fill: true,
            },
          ],
        }
      : {
          labels: DAILY_LABELS,
          datasets: [
            {
              label: 'Income',
              data: dailySeries.income,
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              fill: true,
            },
            {
              label: 'Expense',
              data: dailySeries.expense,
              borderColor: 'rgb(244, 63, 94)',
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              fill: true,
            },
          ],
        };

  return (
    <div className={`flex h-full min-h-0 w-full flex-col ${className ?? ''}`}>
      <Card className="flex h-full min-h-0 flex-1 flex-col">
        <CardHeader className="flex flex-shrink-0 flex-col gap-4 border-b border-zinc-200 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
          <CardTitle className="text-lg">Income vs expense</CardTitle>
          <div className="inline-flex w-full rounded-none border border-zinc-300 sm:w-auto dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setRange('monthly')}
              className={`flex-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors sm:flex-none ${
                range === 'monthly'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setRange('daily')}
              className={`flex-1 border-l border-zinc-300 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors sm:flex-none dark:border-zinc-700 ${
                range === 'daily'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900'
              }`}
            >
              Daily
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col pt-4">
          <LineChart
            key={range}
            labels={chartProps.labels}
            datasets={chartProps.datasets}
            className="relative min-h-[12rem] w-full flex-1"
          />
        </CardContent>
      </Card>
    </div>
  );
}
