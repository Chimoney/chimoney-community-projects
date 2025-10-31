import { NextResponse } from 'next/server';
import type { Transaction } from '@/types';

// Mock transaction history
// In a real application, this would fetch from a database
const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    recipientWalletAddress: '$ilp.example.wallet/alice',
    amount: 50.0,
    currency: 'USD',
    status: 'success',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'txn_002',
    recipientWalletAddress: '$ilp.example.wallet/bob',
    amount: 25.5,
    currency: 'USD',
    status: 'success',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: 'txn_003',
    recipientWalletAddress: '$ilp.example.wallet/charlie',
    amount: 100.0,
    currency: 'USD',
    status: 'failed',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
];

export async function GET() {
  try {
    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Fetch their transactions from a database
    // 3. Apply pagination and filtering

    return NextResponse.json(
      {
        success: true,
        data: mockTransactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch transactions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
