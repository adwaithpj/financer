'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../cards';
import { Table, Badge } from '@cloudflare/kumo';
import { useTransactionStore } from '@/store';

type HomeTransactionsProps = {
  className?: string;
};

export function HomeTransactions({ className }: HomeTransactionsProps) {
  const transactions = useTransactionStore((s) => s.transactions);
  const transactionsData = transactions.slice(0, 7);
  return (
    <div
      className={`flex h-full w-full max-w-full flex-col ${className ?? ''}`}
    >
      <Card className="flex max-h-full min-h-0 flex-col overflow-hidden">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Merchant</Table.Head>
                <Table.Head>Amount</Table.Head>
                <Table.Head>Label</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {transactionsData.map((transaction) => (
                <Table.Row key={transaction.id}>
                  <Table.Cell>{transaction.description}</Table.Cell>
                  <Table.Cell>${transaction.amount}</Table.Cell>
                  <Table.Cell>
                    {transaction.type === 'income' ? (
                      <Badge variant="success">Income</Badge>
                    ) : (
                      <Badge variant="destructive">Expense</Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </CardContent>
      </Card>
      <div className="flex flex-col items-end justify-end p-4 pt-6 text-zinc-500">
        <span>Adwaith P J | 2026</span>
        <span>All rights reserved</span>
      </div>
    </div>
  );
}
