'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Surface, Text } from '@cloudflare/kumo';

const COLORS = [
  '#086FFF',
  '#CF7EE9',
  '#73CEE6',
  '#5B5FEF',
  '#82B6FF',
  '#F5609F',
  '#7366E4',
  '#8D1EB1',
];

interface Row {
  name: string;
  value: number;
}

interface CategoryChartProps {
  data: Row[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <Surface
        color="secondary"
        className="ring-kumo-line rounded-xl p-6 ring-1"
      >
        <Text variant="heading3">Spending by category</Text>
        <div className="mt-2">
          <Text variant="secondary" size="sm">
            No expense data yet — expenses will appear here by category.
          </Text>
        </div>
      </Surface>
    );
  }

  return (
    <Surface
      color="secondary"
      className="ring-kumo-line rounded-none p-4 ring-1 md:p-6"
    >
      <Text variant="heading3">Spending by category</Text>
      <div className="mt-4 h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value?.toLocaleString() ?? ''} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="text-kumo-muted mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {d.name}
          </li>
        ))}
      </ul>
    </Surface>
  );
}
