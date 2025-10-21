export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface Wallet {
  id: string;
  type: string;
  balance: number;
  currency: string;
}

export interface WalletTransferRequest {
  receiver: string;
  wallet: string;
  amount: number;
  subAccount?: string | null;
}

export interface WalletTransferResponse {
  chiRef: string;
  amount: number;
  receiver: string;
  wallet: string;
}
