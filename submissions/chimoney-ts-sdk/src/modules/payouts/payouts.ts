import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  AirtimeItem,
  BankItem,
  ChimoneyItem,
  GiftCardItem,
  InitiateChimoneyRequest,
  MomoItem,
} from "./types";

export interface PayoutsModule {
  airtime(airtimes: AirtimeItem[], subAccount?: string | null): Promise<ApiResponse<unknown>>;
  bank(banks: BankItem[], subAccount?: string | null): Promise<ApiResponse<unknown>>;
  chimoney(chimoneys: ChimoneyItem[], subAccount?: string | null): Promise<ApiResponse<unknown>>;
  mobileMoney(momos: MomoItem[], subAccount?: string | null): Promise<ApiResponse<unknown>>;
  giftCard(giftCards: GiftCardItem[], subAccount?: string | null): Promise<ApiResponse<unknown>>;
  status(chiRef: string, subAccount?: string | null): Promise<ApiResponse<unknown>>;
  initiateChimoney(req: InitiateChimoneyRequest): Promise<ApiResponse<unknown>>;
}

export function createPayoutsModule(http: HttpClient): PayoutsModule {
  return {
    airtime: (airtimes, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/airtime",
        payload: { airtime: airtimes, ...(subAccount ? { subAccount } : {}) },
      }),

    bank: (banks, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/bank",
        payload: { bank: banks, ...(subAccount ? { subAccount } : {}) },
      }),

    chimoney: (chimoneys, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/chimoney",
        payload: { chimoneys, ...(subAccount ? { subAccount } : {}) },
      }),

    mobileMoney: (momos, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/mobile-money",
        payload: { momo: momos, ...(subAccount ? { subAccount } : {}) },
      }),

    giftCard: (giftCards, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/gift-card",
        payload: { gift_card: giftCards, ...(subAccount ? { subAccount } : {}) },
      }),

    status: (chiRef, subAccount = null) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/status",
        payload: { chiRef, ...(subAccount ? { subAccount } : {}) },
      }),

    initiateChimoney: (req) =>
      http.request({
        method: "POST",
        path: "/v0.2/payouts/initiate-chimoney",
        payload: {
          chimoneys: req.chimoneys,
          turnOffNotification: req.turnOffNotification ?? false,
          crypto_payments: req.crypto_payments ?? [],
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),
  };
}


