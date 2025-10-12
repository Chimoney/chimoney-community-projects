export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface AirtimeItem {
  countryToSend: string;
  phoneNumber: string;
  valueInUSD: number;
}

export interface BankItem {
  countryToSend: string;
  account_bank: string;
  account_number: string;
  valueInUSD: number;
  reference?: string;
}

export interface MomoItem {
  countryToSend: string;
  phoneNumber: string;
  valueInUSD: number;
  reference?: string;
}

export interface GiftCardItem {
  email: string;
  valueInUSD: number;
  redeemData: {
    productId: string | number;
    countryCode: string;
    valueInLocalCurrency: number;
  };
}

export interface ChimoneyItem {
  valueInUSD: number;
  email?: string;
  twitter?: string;
}

export interface InitiateChimoneyRequest {
  chimoneys: ChimoneyItem[];
  turnOffNotification?: boolean;
  crypto_payments?: unknown[];
  subAccount?: string | null;
}


