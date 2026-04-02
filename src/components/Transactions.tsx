'use client';

import { TransactionsTable, TransactionHeader } from './transactionsComponents';

export function TransactionsHolder() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-hidden">
      <div className="shrink-0">
        <TransactionHeader />
      </div>
      <TransactionsTable className="min-h-0 flex-1" />
    </div>
  );
}
