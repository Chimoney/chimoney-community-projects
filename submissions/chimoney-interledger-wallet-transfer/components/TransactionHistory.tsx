'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Transaction } from '@/types';

export function TransactionHistory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get<{ success: boolean; data: Transaction[] }>(
        '/api/transactions'
      );
      return response.data.data;
    },
  });

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          View your recent wallet-to-wallet transfers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            Failed to load transactions
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <p className="font-medium font-mono text-sm break-all">
                      {transaction.recipientWalletAddress}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.timestamp)}
                  </p>
                  <p className={`text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
