'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import type { TransferRequest, TransferResponse } from '@/types';

export function TransferForm() {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [transferResult, setTransferResult] = useState<TransferResponse | null>(null);

  const queryClient = useQueryClient();

  const transferMutation = useMutation({
    mutationFn: async (data: TransferRequest) => {
      const response = await axios.post<TransferResponse>('/api/transfer', data);
      return response.data;
    },
    onSuccess: (data) => {
      setTransferResult(data);
      setShowConfirmDialog(false);
      setShowResultDialog(true);

      if (data.success) {
        // Clear form on success
        setWalletAddress('');
        setAmount('');
        // Invalidate transactions query to refetch
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    },
    onError: (error) => {
      console.error('Transfer error:', error);
      setTransferResult({
        success: false,
        message: 'Transfer failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      setShowConfirmDialog(false);
      setShowResultDialog(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmTransfer = () => {
    transferMutation.mutate({
      recipientWalletAddress: walletAddress,
      amount: parseFloat(amount),
    });
  };

  const isFormValid = walletAddress.trim() !== '' && parseFloat(amount) > 0;

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>
            Transfer funds to an Interledger wallet address
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Recipient Wallet Address</Label>
              <Input
                id="walletAddress"
                type="text"
                placeholder="$ilp.example.wallet/username"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Enter a valid Interledger payment pointer (starts with $)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Minimum amount: $0.01
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || transferMutation.isPending}
            >
              {transferMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Send Money
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details before confirming
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Recipient</p>
              <p className="text-sm text-muted-foreground font-mono break-all">
                {walletAddress}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Amount</p>
              <p className="text-2xl font-bold">${parseFloat(amount).toFixed(2)}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={transferMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmTransfer}
              disabled={transferMutation.isPending}
            >
              {transferMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Transfer'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {transferResult?.success ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Transfer Successful
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Transfer Failed
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {transferResult?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {transferResult?.success && transferResult.data ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Transaction ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {transferResult.data.transactionId}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-lg font-semibold">
                    ${transferResult.data.amount.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-green-600 capitalize">
                    {transferResult.data.status}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">Error</p>
                <p className="text-sm text-red-600">
                  {transferResult?.error || 'An unexpected error occurred'}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowResultDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
