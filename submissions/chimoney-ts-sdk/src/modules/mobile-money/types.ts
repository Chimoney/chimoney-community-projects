export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface MobileMoneyTransaction {
  id: string;
  amount: number;
  currency: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

export interface MobileMoneyPaymentRequest {
  amount: number;
  currency: string;
  phoneNumber: string;
  fullname: string;
  country: string;
  email: string;
  txRef: string;
  subAccount?: string | null;
}

export interface MobileMoneyPaymentResponse {
  id: string;
  txRef: string;
  status: string;
  amount: number;
  currency: string;
}
