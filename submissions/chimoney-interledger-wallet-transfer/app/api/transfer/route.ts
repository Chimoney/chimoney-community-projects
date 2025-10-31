import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import type { TransferRequest, TransferResponse } from '@/types';

const CHIMONEY_API_BASE_URL = 'https://api-v2-sandbox.chimoney.io/v0.2.4';
const CHIMONEY_API_KEY = process.env.CHIMONEY_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!CHIMONEY_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: 'API key not configured',
          error: 'CHIMONEY_API_KEY is not set in environment variables',
        } as TransferResponse,
        { status: 500 }
      );
    }

    // Parse request body
    const body: TransferRequest = await request.json();
    const { recipientWalletAddress, amount, currency = 'USD' } = body;

    // Validate input
    if (!recipientWalletAddress || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          error: 'recipientWalletAddress and amount are required',
        } as TransferResponse,
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid amount',
          error: 'Amount must be greater than 0',
        } as TransferResponse,
        { status: 400 }
      );
    }

    // Validate wallet address format (Interledger payment pointer or wallet URL)
    if (!recipientWalletAddress.startsWith('$') && !recipientWalletAddress.startsWith('https://')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid wallet address format',
          error: 'Wallet address must start with $ (payment pointer) or https:// (wallet URL)',
        } as TransferResponse,
        { status: 400 }
      );
    }

    // Make API call to Chimoney
    const response = await axios.post(
      `${CHIMONEY_API_BASE_URL}/payouts/interledger-wallet-address`,
      {
        debitCurrency: currency,
        interledgerWallets: [
          {
            interledgerWalletAddress: recipientWalletAddress,
            currency: currency,
            amountToDeliver: amount,
            narration: 'Payment via Chimoney Interledger Wallet Transfer',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': CHIMONEY_API_KEY,
        },
      }
    );

    // Handle successful response
    if (response.data && response.data.status === 'success') {
      return NextResponse.json(
        {
          success: true,
          message: 'Transfer completed successfully',
          data: {
            transactionId: response.data.data?.id || `txn_${Date.now()}`,
            amount,
            recipientWalletAddress,
            status: 'success',
            timestamp: new Date().toISOString(),
          },
        } as TransferResponse,
        { status: 200 }
      );
    }

    // Handle API error response
    return NextResponse.json(
      {
        success: false,
        message: 'Transfer failed',
        error: response.data?.message || 'Unknown error occurred',
      } as TransferResponse,
      { status: 400 }
    );
  } catch (error) {
    console.error('Transfer error:', error);

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;

      return NextResponse.json(
        {
          success: false,
          message: 'Transfer failed',
          error: errorMessage,
        } as TransferResponse,
        { status: statusCode }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as TransferResponse,
      { status: 500 }
    );
  }
}
