export interface InitiatePaymentDto {
  redirect_url: string;
  valueInUSD: number;
  payerEmail?: string;
  subAccount?: string | null;
  meta?: {
    [x: string]: string | number;
  };
}

export interface VerifyPaymentDto {
  id: string;
  subAccount?: string | null;
}

export interface SimulatePaymentStatusDto {
  issueID: string;
  status: PaymentType;
  subAccount?: string | null;
}

export enum PaymentType {
  EXPIRED = 'expired',
  FAILED = 'failed',
  FRAUD = 'fraud',
}
