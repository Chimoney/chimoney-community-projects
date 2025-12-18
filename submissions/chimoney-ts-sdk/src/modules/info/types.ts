export interface Country {
  countryCode: string;
  countryName: string;
}

export interface Asset {
  code: string;
  name: string;
}

export interface Bank {
  bankCode: string;
  bankName: string;
}

export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface LocalAmountInUSDRequest {
  originCurrency: string;
  amountInOriginCurrency: number;
}

export interface LocalAmountInUSDResponse {
  amountInUSD: number;
  originCurrency: string;
  amountInOriginCurrency: number;
  validUntil?: string;
}

export interface USDInLocalAmountRequest {
  destinationCurrency: string;
  amountInUSD: number;
}

export interface USDInLocalAmountResponse {
  amountInUSD: number;
  destinationCurrency: string;
  amountInDestinationCurrency: number;
  validUntil?: string;
}


