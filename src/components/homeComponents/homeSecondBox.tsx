'use client';

import { HomeChart1 } from './homeChart1';
import { HomeTransactions } from './homeTransactions';

/**
 * Same 3-col track as `HomeFirstBox`: chart spans cols 1–2 (Income + Expenses),
 * transactions col 3 (Balance). Below `lg`, stacks chart then transactions.
 */
export function HomeSecondBox() {
  return (
    // <div className="grid w-full grid-cols-1 gap-3 lg:h-[calc(100dvh_-_var(--home-second-offset))] lg:min-h-[22rem] lg:grid-cols-3 lg:items-stretch lg:gap-4">
    //   <HomeChart1 className="h-full w-full min-w-0 lg:col-span-2 lg:min-h-0" />
    //   <HomeTransactions className="h-full w-full min-w-0 lg:col-span-1 lg:self-start" />
    // </div>
    <div className="grid h-full w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
      <HomeChart1 className="col-span-2 h-full" />
      <HomeTransactions className="col-span-1 h-full" />
    </div>
  );
}
