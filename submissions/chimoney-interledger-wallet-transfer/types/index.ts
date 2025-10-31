export interface TransferRequest {
  recipientWalletAddress: string;
  amount: number;
  currency?: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  data?: {
    transactionId: string;
    amount: number;
    recipientWalletAddress: string;
    status: string;
    timestamp: string;
  };
  error?: string;
}

export interface Transaction {
  id: string;
  recipientWalletAddress: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
