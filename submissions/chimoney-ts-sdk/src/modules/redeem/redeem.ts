import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  AirtimeRedeemRequest,
  GiftCardRedeemRequest,
  MobileMoneyRedeemRequest,
  AnyRedeemRequest,
  ChimoneyRedeemRequest,
} from "./types";

export interface RedeemModule {
  airtime(req: AirtimeRedeemRequest): Promise<ApiResponse<unknown>>;
  giftCard(req: GiftCardRedeemRequest): Promise<ApiResponse<unknown>>;
  mobileMoney(req: MobileMoneyRedeemRequest): Promise<ApiResponse<unknown>>;
  any(req: AnyRedeemRequest): Promise<ApiResponse<unknown>>;
  chimoney(req: ChimoneyRedeemRequest): Promise<ApiResponse<unknown>>;
}

export function createRedeemModule(http: HttpClient): RedeemModule {
  return {
    airtime: (req) =>
      http.request<ApiResponse<unknown>>({
        method: "POST",
        path: "/v0.2/redeem/airtime",
        payload: {
          chiRef: req.chiRef,
          phoneNumber: req.phoneNumber,
          countryToSend: req.countryToSend,
          meta: req.meta ?? {},
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    giftCard: (req) =>
      http.request<ApiResponse<unknown>>({
        method: "POST",
        path: "/v0.2/redeem/gift-card",
        payload: {
          chiRef: req.chiRef,
          redeemOptions: req.redeemOptions,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    mobileMoney: (req) =>
      http.request<ApiResponse<unknown>>({
        method: "POST",
        path: "/v0.2/redeem/mobile-money",
        payload: {
          chiRef: req.chiRef,
          redeemOptions: req.redeemOptions,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    any: (req) =>
      http.request<ApiResponse<unknown>>({
        method: "POST",
        path: "/v0.2/redeem/any",
        payload: {
          chiRef: req.chiRef,
          redeemData: req.redeemData,
          meta: req.meta ?? {},
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),

    chimoney: (req) =>
      http.request<ApiResponse<unknown>>({
        method: "POST",
        path: "/v0.2/redeem/chimoney",
        payload: {
          chimoneys: req.chimoneys,
          ...(req.subAccount ? { subAccount: req.subAccount } : {}),
        },
      }),
  };
}
