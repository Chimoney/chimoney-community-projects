import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  Wallet,
  WalletTransferRequest,
  WalletTransferResponse,
} from "./types";

export interface WalletModule {
  list(subAccount?: string | null): Promise<ApiResponse<Wallet[]>>;
  details(id: string, subAccount?: string | null): Promise<ApiResponse<Wallet>>;
  transfer(req: WalletTransferRequest): Promise<ApiResponse<WalletTransferResponse>>;
}

export function createWalletModule(http: HttpClient): WalletModule {
  return {
    list: (subAccount = null) =>
      http.request<ApiResponse<Wallet[]>>({
        method: "POST",
        path: "/v0.2/wallets/list",
        payload: subAccount ? { subAccount } : {},
      }),

    details: (id, subAccount = null) =>
      http.request<ApiResponse<Wallet>>({
        method: "POST",
        path: "/v0.2/wallets/lookup",
        payload: subAccount ? { subAccount } : {},
      }),

    transfer: (req) =>
      http.request<ApiResponse<WalletTransferResponse>>({
        method: "POST",
        path: "/v0.2/wallets/transfer",
        payload: {
          receiver: req.receiver,
          wallet: req.wallet,
          amount: req.amount,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),
  };
}
