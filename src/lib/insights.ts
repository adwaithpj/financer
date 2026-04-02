import type { Icon as IconType } from '@phosphor-icons/react';
import type { Transaction } from '@/types/transaction';
import { TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { formatMoney } from './formatMoney';
import { HandCoinsIcon } from '@phosphor-icons/react/dist/ssr/HandCoins';
import { PiggyBankIcon } from '@phosphor-icons/react/dist/ssr/PiggyBank';
import { compareAsc, format, parseISO } from 'date-fns';

type StatAccent = 'emerald' | 'rose' | 'purple';

export type InsightsStatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  accent: StatAccent;
  icon: IconType;
  backgroundColor: string;
};

export function sumIncome(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);
}

export function sumExpenses(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);
}

export function monthlyIncomeExpense(transactions: Transaction[]) {
  const months = new Map<string, { income: number; expense: number }>();
  for (const t of transactions) {
    const key = t.date.slice(0, 7);
    const cur = months.get(key) ?? { income: 0, expense: 0 };
    if (t.type === 'income') cur.income += t.amount;
    else cur.expense += t.amount;
    months.set(key, cur);
  }
  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({ month, ...v }));
}

/** Row shape for `BalanceChart` / Recharts `AreaChart` (`dataKey="income" | "expenses"`). */
export type BalanceChartPoint = {
  name: string;
  income: number;
  expenses: number;
};

/**
 * Monthly income vs expenses for charting, same shape as static data in `BalanceChart.tsx`.
 * `name` is a short month label (e.g. `Jan`); sorted chronologically by `YYYY-MM`.
 */
export function getBalanceChartData(
  transactions: Transaction[]
): BalanceChartPoint[] {
  const rows = monthlyIncomeExpense(transactions);
  return rows.map(({ month, income, expense }) => ({
    name: format(parseISO(`${month}-01`), 'MMM'),
    income,
    expenses: expense,
  }));
}

export function balanceTrend(transactions: Transaction[]) {
  const sorted = [...transactions].sort((a, b) =>
    compareAsc(parseISO(a.date), parseISO(b.date))
  );
  let balance = 0;
  const points: { date: string; balance: number }[] = [];
  for (const t of sorted) {
    balance += t.type === 'income' ? t.amount : -t.amount;
    points.push({ date: t.date, balance });
  }
  return points;
}

export function expenseByCategory(transactions: Transaction[]) {
  const map = new Map<string, number>();
  for (const t of transactions) {
    if (t.type === 'expense')
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
  }
  return [...map.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function computeInsights(transactions: Transaction[]) {
  const byCategory = expenseByCategory(transactions);
  const topExpense = byCategory[0] ?? null;

  const months = monthlyIncomeExpense(transactions);
  const last = months[months.length - 1];
  const prev = months.length >= 2 ? months[months.length - 2] : null;

  const totalIncome = sumIncome(transactions);
  const totalExpenses = sumExpenses(transactions);
  /** Share of income saved: (income − expenses) / income. Negative if spending exceeds income. */
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const incomeBySource = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== 'income') continue;
    incomeBySource.set(
      t.category,
      (incomeBySource.get(t.category) ?? 0) + t.amount
    );
  }
  const topIncome =
    [...incomeBySource.entries()].sort(([, a], [, b]) => b - a)[0] ?? null;

  const cards: InsightsStatCardProps[] = [];

  if (topExpense)
    cards.push({
      title: 'Highest Spending',
      value: formatMoney(topExpense.value),
      subtitle: `${topExpense.name} — largest expense category`,
      accent: 'rose',
      icon: TrendUpIcon,
      backgroundColor: 'bg-rose-500/10',
    });

  if (prev && last) {
    const delta = last.expense - prev.expense;
    const pct = prev.expense > 0 ? Math.abs(delta / prev.expense) * 100 : 0;
    const isUp = delta > 0.005;
    const isDown = delta < -0.005;
    cards.push({
      title: 'Monthly Expenses',
      value: formatMoney(last.expense),
      subtitle: isUp
        ? `↑ ${pct.toFixed(0)}% vs ${prev.month}`
        : isDown
          ? `↓ ${pct.toFixed(0)}% vs ${prev.month}`
          : `Flat vs ${prev.month}`,
      accent: isUp ? 'rose' : isDown ? 'emerald' : 'purple',
      icon: HandCoinsIcon,
      backgroundColor: isUp
        ? 'bg-rose-500/10'
        : isDown
          ? 'bg-emerald-500/10'
          : 'bg-purple-500/10',
    });
  } else if (last) {
    cards.push({
      title: 'Monthly Expenses',
      value: formatMoney(last.expense),
      subtitle: last.month,
      accent: 'emerald',
      icon: HandCoinsIcon,
      backgroundColor: 'bg-emerald-500/10',
    });
  }

  cards.push({
    title: 'Savings Rate',
    value: `${savingsRate.toFixed(1)}%`,
    subtitle:
      totalIncome <= 0
        ? 'No income recorded'
        : savingsRate < 0
          ? 'Spending exceeds income'
          : savingsRate >= 20
            ? 'On track 🎉'
            : savingsRate >= 10
              ? 'Could save more'
              : 'Below recommended 10%',
    accent:
      totalIncome <= 0
        ? 'purple'
        : savingsRate < 0
          ? 'rose'
          : savingsRate >= 20
            ? 'emerald'
            : savingsRate >= 10
              ? 'rose'
              : 'purple',
    icon: PiggyBankIcon,
    backgroundColor:
      totalIncome <= 0
        ? 'bg-purple-500/10'
        : savingsRate < 0
          ? 'bg-rose-500/10'
          : savingsRate >= 20
            ? 'bg-emerald-500/10'
            : savingsRate >= 10
              ? 'bg-rose-500/10'
              : 'bg-purple-500/10',
  });

  if (topIncome) {
    cards.push({
      title: 'Top Income Source',
      value: topIncome[0],
      subtitle: `${formatMoney(topIncome[1])} earned`,
      accent: 'purple',
      icon: PiggyBankIcon,
      backgroundColor: 'bg-purple-500/10',
    });
  }

  return cards;
}
