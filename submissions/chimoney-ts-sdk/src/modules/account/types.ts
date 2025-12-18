export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface Transaction {
  id: string;
  chiRef: string;
  amount: number;
  currency: string;
  status: string;
  type: string;
  createdAt: string;
}

export interface AccountTransferRequest {
  receiver: string;
  amount: number;
  wallet: string;
  subAccount?: string | null;
}

export interface AccountTransferResponse {
  chiRef: string;
  amount: number;
  receiver: string;
  wallet: string;
}
