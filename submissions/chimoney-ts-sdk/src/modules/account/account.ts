import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  Transaction,
  AccountTransferRequest,
  AccountTransferResponse,
} from "./types";

export interface AccountModule {
  getAllTransactions(subAccount?: string | null): Promise<ApiResponse<Transaction[]>>;
  getTransactionsByIssueID(issueID: string, subAccount?: string | null): Promise<ApiResponse<Transaction[]>>;
  getTransactionByID(transactionId: string, subAccount?: string | null): Promise<ApiResponse<Transaction>>;
  accountTransfer(req: AccountTransferRequest): Promise<ApiResponse<AccountTransferResponse>>;
  deleteUnpaidTransaction(chiRef: string, subAccount?: string | null): Promise<ApiResponse<unknown>>;
}

export function createAccountModule(http: HttpClient): AccountModule {
  return {
    getAllTransactions: (subAccount = null) =>
      http.request<ApiResponse<Transaction[]>>({
        method: "POST",
        path: "/v0.2/accounts/transactions",
        payload: subAccount ? { subAccount } : {},
      }),

    getTransactionsByIssueID: (issueID, subAccount = null) =>
      http.request<ApiResponse<Transaction[]>>({
        method: "POST",
        path: "/v0.2/accounts/issue-id-transactions",
        params: { issueID },
        payload: subAccount ? { subAccount } : {},
      }),

    getTransactionByID: (transactionId, subAccount = null) =>
      http.request<ApiResponse<Transaction>>({
        method: "POST",
        path: "/v0.2/accounts/transaction",
        params: { id: transactionId },
        payload: subAccount ? { subAccount } : {},
      }),

    accountTransfer: (req) =>
      http.request<ApiResponse<AccountTransferResponse>>({
        method: "POST",
        path: "/v0.2/accounts/transfer",
        payload: {
          receiver: req.receiver,
          amount: req.amount,
          wallet: req.wallet,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    deleteUnpaidTransaction: (chiRef, subAccount = null) =>
      http.request<ApiResponse<unknown>>({
        method: "DELETE",
        path: "/v0.2/accounts/delete-unpaid-transaction",
        payload: {
          chiRef,
          ...(subAccount ? { subAccount } : {}),
        },
      }),
  };
}
