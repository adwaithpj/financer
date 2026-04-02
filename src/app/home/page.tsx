'use client';

import { HomePlaceholder } from '@/components/Home';
import { useTransactionStore, useCommonStore } from '@/store';
import { fetchTransactions } from '@/lib/mock-api';
import { useEffect } from 'react';

export default function Home() {
  const setIsLoading = useCommonStore((s) => s.setIsLoading);

  useEffect(() => {
    const persisted = useTransactionStore.getState().transactions;
    if (persisted.length > 0) {
      setIsLoading(false);
      return;
    }
    fetchTransactions().then((data) => {
      useTransactionStore.setState({ transactions: data });
      setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <HomePlaceholder />
    </div>
  );
}
