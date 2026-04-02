'use client';
import { useCommonStore } from '@/store';
import { Button } from '@cloudflare/kumo';
import { Plus } from '@phosphor-icons/react';
export function TransactionHeader() {
  const role = useCommonStore((state) => state.role);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">
            {role === 'admin' ? 'All Transactions' : 'My Transactions'}
          </h1>
          <p className="text-sm text-zinc-500">
            Here is a list of your transactions.
          </p>
        </div>
        <div>
          <div
            className={`${role === 'admin' ? 'transition-all duration-300' : 'hidden'}`}
          >
            <Button
              variant="secondary"
              className="h-12 w-full justify-center rounded-none !bg-zinc-800 !text-white !ring-0 transition-colors hover:!bg-zinc-700 hover:!text-white focus-visible:!ring-2 focus-visible:!ring-zinc-500 focus-visible:!ring-offset-2 dark:!bg-white dark:!text-black dark:hover:!bg-zinc-200 dark:hover:!text-black dark:focus-visible:!ring-zinc-400"
            >
              <Plus />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
