export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface AirtimeRedeemRequest {
  chiRef: string;
  phoneNumber: string;
  countryToSend: string;
  meta?: Record<string, unknown>;
  subAccount?: string | null;
}

export interface GiftCardRedeemRequest {
  chiRef: string;
  redeemOptions: Record<string, unknown>;
  subAccount?: string | null;
}

export interface MobileMoneyRedeemRequest {
  chiRef: string;
  redeemOptions: Record<string, unknown>;
  subAccount?: string | null;
}

export interface AnyRedeemRequest {
  chiRef: string;
  redeemData: Array<Record<string, unknown>>;
  meta?: Record<string, unknown>;
  subAccount?: string | null;
}

export interface ChimoneyRedeemRequest {
  chimoneys: Array<Record<string, unknown>>;
  subAccount?: string | null;
}
