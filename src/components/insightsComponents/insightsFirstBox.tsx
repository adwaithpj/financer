'use client';

import type { Icon as IconType } from '@phosphor-icons/react';
import { Card, CardContent } from '../cards';
import { useTransactionStore } from '@/store';
import { computeInsights } from '@/lib/insights';

type StatAccent = 'emerald' | 'rose' | 'purple';

const accentStyles: Record<
  StatAccent,
  { strip: string; iconWrap: string; value: string }
> = {
  emerald: {
    strip: 'bg-emerald-500',
    iconWrap:
      'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    value: 'text-emerald-700 dark:text-emerald-300',
  },
  rose: {
    strip: 'bg-rose-500',
    iconWrap:
      'bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    value: 'text-rose-700 dark:text-rose-300',
  },
  purple: {
    strip: 'bg-[#7008e7]',
    iconWrap:
      'bg-[#7008e7]/15 text-[#7008e7] dark:bg-[#7008e7]/20 dark:text-[#7008e7]',
    value: 'text-[#7008e7] dark:text-[#7008e7]',
  },
};

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  accent: StatAccent;
  icon: IconType;
  backgroundColor: string;
};

function StatCard({
  title,
  value,
  subtitle,
  accent,
  icon: Icon,
  backgroundColor,
}: StatCardProps) {
  const a = accentStyles[accent];
  return (
    <Card
      className={`relative flex h-full min-h-[152px] flex-col overflow-hidden border-zinc-200 dark:border-zinc-800`}
    >
      <div className={`absolute inset-y-0 left-0 w-1 ${a.strip}`} aria-hidden />
      <CardContent
        className={`flex h-full min-h-0 flex-1 flex-col justify-between gap-3 !px-4 !pb-5 !pt-5 pl-5 sm:!pl-6 ${backgroundColor}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {title}
            </p>
            <p
              className={`truncate text-2xl font-bold tabular-nums sm:text-4xl ${a.value}`}
            >
              {value}
            </p>
          </div>
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none ${a.iconWrap}`}
          >
            <Icon size={22} weight="duotone" />
          </div>
        </div>
        <p className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}

export function InsightsFirstBox() {
  const transactions = useTransactionStore((s) => s.transactions);
  const stats: StatCardProps[] = computeInsights(transactions);

  return (
    <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  );
}
