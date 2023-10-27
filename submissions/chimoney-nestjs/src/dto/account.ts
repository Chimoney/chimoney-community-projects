export interface TransactionsByIssueIDDto {
  issueID: string;
  subAccount?: string;
}

export interface TransactionByIDDto {
  transactionId: string;
  subAccount?: string;
}

export interface AccountTransferDto {
  receiver: string;
  valueInUSD: number;
  wallet?: string;
  subAccount?: string | null;
}
export interface DeleteUnpaidTransactionDto {
  chiRef: string;
  subAccount?: string | null;
}
