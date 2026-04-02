import { TransactionsHolder } from '@/components/Transactions';

export default function Transactions() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <TransactionsHolder />
    </div>
  );
}
