import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  MobileMoneyTransaction,
  MobileMoneyPaymentRequest,
  MobileMoneyPaymentResponse,
} from "./types";

export interface MobileMoneyModule {
  getAllTransactions(subAccount?: string | null): Promise<ApiResponse<MobileMoneyTransaction[]>>;
  makePayment(req: MobileMoneyPaymentRequest): Promise<ApiResponse<MobileMoneyPaymentResponse>>;
  verifyPayment(id: string, subAccount?: string | null): Promise<ApiResponse<MobileMoneyTransaction>>;
}

export function createMobileMoneyModule(http: HttpClient): MobileMoneyModule {
  return {
    getAllTransactions: (subAccount = null) =>
      http.request<ApiResponse<MobileMoneyTransaction[]>>({
        method: "POST",
        path: "/v0.2/collections/mobile-money/all",
        payload: subAccount ? { subAccount } : {},
      }),

    makePayment: (req) =>
      http.request<ApiResponse<MobileMoneyPaymentResponse>>({
        method: "POST",
        path: "/v0.2/collections/mobile-money/collect",
        payload: {
          amount: req.amount,
          currency: req.currency,
          phoneNumber: req.phoneNumber,
          fullname: req.fullname,
          country: req.country,
          email: req.email,
          txRef: req.txRef,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    verifyPayment: (id, subAccount = null) =>
      http.request<ApiResponse<MobileMoneyTransaction>>({
        method: "POST",
        path: "/v0.2/collections/mobile-money/verify",
        payload: {
          id,
          ...(subAccount ? { subAccount } : {}),
        },
      }),
  };
}
