import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction } from '@/types/transaction';
import { initialTransactions } from '@/lib/mock-transactions';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (
    id: string,
    patch: Partial<Omit<Transaction, 'id'>>
  ) => void;
  resetToSeed: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (t: Omit<Transaction, 'id'>) => {
        set((s) => ({
          transactions: [{ ...t, id: `id-${Date.now()}` }, ...s.transactions],
        }));
      },
      deleteTransaction: (id: string) => {
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        }));
      },
      updateTransaction: (id, patch) => {
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...patch } : t
          ),
        }));
      },
      resetToSeed: () => {
        set({ transactions: initialTransactions });
      },
    }),
    {
      name: 'transactions-storage',
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    }
  )
);
