'use client';

import { Fragment, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../cards';
import {
  Table,
  Badge,
  Input,
  DropdownMenu,
  Button,
  Switch,
} from '@cloudflare/kumo';
import { useTransactionStore, useCommonStore } from '@/store';
import { DotsThree, Eye, PencilSimple, Trash } from '@phosphor-icons/react';
import type { Transaction } from '@/types/transaction';

type TransactionsTableProps = {
  className?: string;
};

export function TransactionsTable({ className }: TransactionsTableProps) {
  const transactions = useTransactionStore((s) => s.transactions);
  const role = useCommonStore((s) => s.role);
  const search = useCommonStore((s) => s.search);
  const setSearch = useCommonStore((s) => s.setSearch);

  const sortBy = useCommonStore((s) => s.sortBy);
  const setSortBy = useCommonStore((s) => s.setSortBy);
  const sortOrder = useCommonStore((s) => s.sortOrder);
  const setSortOrder = useCommonStore((s) => s.setSortOrder);
  const groupByMonth = useCommonStore((s) => s.groupByMonth);
  const setGroupByMonth = useCommonStore((s) => s.setGroupByMonth);

  const columnCount = role === 'admin' ? 7 : 6;

  const processedData = useMemo(() => {
    const filtered = transactions.filter((t) =>
      t.description.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }
      const cmp = a.amount - b.amount;
      return sortOrder === 'desc' ? -cmp : cmp;
    });

    if (groupByMonth) {
      const groups: Record<string, Transaction[]> = {};
      sorted.forEach((t) => {
        const date = new Date(t.date);
        const monthYear = date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });
        if (!groups[monthYear]) groups[monthYear] = [];
        groups[monthYear].push(t);
      });
      return groups;
    }

    return { All: sorted };
  }, [transactions, search, sortBy, sortOrder, groupByMonth]);

  const renderTableRows = (items: Transaction[]) =>
    items.map((transaction) => (
      <Table.Row key={transaction.id}>
        <Table.Cell>{transaction.date}</Table.Cell>
        <Table.Cell className="font-medium">
          {transaction.description}
        </Table.Cell>
        <Table.Cell>
          <Badge variant="outline">{transaction.category}</Badge>
        </Table.Cell>
        <Table.Cell>
          {transaction.type === 'income' ? (
            <Badge variant="success">Income</Badge>
          ) : (
            <Badge variant="destructive">Expense</Badge>
          )}
        </Table.Cell>
        <Table.Cell
          className={
            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
          }
        >
          {transaction.type === 'income' ? '+' : '-'} $
          {transaction.amount.toLocaleString()}
        </Table.Cell>
        {role === 'admin' && (
          <Table.Cell className="text-center">
            <DropdownMenu>
              <DropdownMenu.Trigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    shape="square"
                    aria-label="More options"
                    className="w-full"
                  >
                    <DotsThree weight="bold" size={24} />
                  </Button>
                }
              />
              <DropdownMenu.Content>
                <DropdownMenu.Item icon={Eye}>View</DropdownMenu.Item>
                <DropdownMenu.Item icon={PencilSimple}>Edit</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item icon={Trash} variant="danger">
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Table.Cell>
        )}
      </Table.Row>
    ));

  return (
    <div
      className={`flex h-full w-full max-w-full flex-col ${className ?? ''}`}
    >
      <Card className="flex max-h-full min-h-0 flex-col overflow-hidden border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-2xl font-bold">
              {search ? `Results for "${search}"` : 'Transactions'}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-4">
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64"
              />

              <div className="flex items-center gap-1 rounded-lg border border-neutral-200 p-1 dark:border-neutral-800">
                <Button
                  variant={sortBy === 'date' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('date')}
                  className="px-2"
                >
                  Date
                </Button>
                <Button
                  variant={sortBy === 'amount' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('amount')}
                  className="px-2"
                >
                  Amount
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                  }
                  className="px-2"
                >
                  {sortOrder === 'desc' ? 'Desc' : 'Asc'}
                </Button>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-2 py-1 dark:border-neutral-800">
                <span className="text-sm font-medium">Group by Month</span>
                <Switch
                  checked={groupByMonth}
                  onCheckedChange={setGroupByMonth}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden px-0">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Date</Table.Head>
                  <Table.Head>Description</Table.Head>
                  <Table.Head>Category</Table.Head>
                  <Table.Head>Type</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  {role === 'admin' && (
                    <Table.Head className="text-center">Actions</Table.Head>
                  )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {Object.entries(processedData).map(([groupName, items]) => (
                  <Fragment key={groupName}>
                    {groupByMonth && (
                      <Table.Row className="bg-neutral-50 dark:bg-neutral-900/50">
                        <Table.Cell
                          colSpan={columnCount}
                          className="px-4 py-2 font-bold"
                        >
                          {groupName}
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {renderTableRows(items)}
                  </Fragment>
                ))}
              </Table.Body>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
