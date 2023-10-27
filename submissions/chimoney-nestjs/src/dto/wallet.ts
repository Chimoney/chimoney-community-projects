export interface WalletByIDDto {
  walletID: string;
  subAccount?: string;
}

export interface WalletTransferIDDto {
  receiver: string;
  valueInUSD: string;
  subAccount?: string;
  wallet?: TransactionType;
}

export enum TransactionType {
  CHI = 'chi',
  AIRTIME = 'airtime',
  MOMO = 'momo',
}
