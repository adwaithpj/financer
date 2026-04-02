import { initialTransactions } from '@/lib/mock-transactions';
import type { Transaction } from '@/types/transaction';

export async function fetchTransactions(delayMs = 900): Promise<Transaction[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  return structuredClone(initialTransactions) as Transaction[];
}
