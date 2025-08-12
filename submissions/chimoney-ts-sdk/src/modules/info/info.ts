import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  Asset,
  Bank,
  Country,
  LocalAmountInUSDRequest,
  LocalAmountInUSDResponse,
  USDInLocalAmountRequest,
  USDInLocalAmountResponse,
} from "./types";

export interface InfoModule {
  airtimeCountries(): Promise<ApiResponse<Country[]>>;
  assets(): Promise<ApiResponse<Asset[]>>;
  banks(countryCode?: string): Promise<ApiResponse<Bank[]>>;
  localAmountInUSD(
    req: LocalAmountInUSDRequest
  ): Promise<ApiResponse<LocalAmountInUSDResponse>>;
  usdInLocalAmount(
    req: USDInLocalAmountRequest
  ): Promise<ApiResponse<USDInLocalAmountResponse>>;
  mobileMoneyCodes(): Promise<ApiResponse<string[]>>;
}

export function createInfoModule(http: HttpClient): InfoModule {
  return {
    airtimeCountries: () =>
      http.request<ApiResponse<Country[]>>({
        method: "GET",
        path: "/v0.2/info/airtime-countries",
      }),

    assets: () =>
      http.request<ApiResponse<Asset[]>>({
        method: "GET",
        path: "/v0.2/info/assets",
      }),

    banks: (countryCode = "NG") =>
      http.request<ApiResponse<Bank[]>>({
        method: "GET",
        path: "/v0.2/info/country-banks",
        params: { countryCode },
      }),

    localAmountInUSD: (req) =>
      http.request<ApiResponse<LocalAmountInUSDResponse>>({
        method: "GET",
        path: "/v0.2/info/local-amount-in-usd",
        params: req,
      }),

    usdInLocalAmount: (req) =>
      http.request<ApiResponse<USDInLocalAmountResponse>>({
        method: "GET",
        path: "/v0.2/info/usd-amount-in-local",
        params: req,
      }),

    mobileMoneyCodes: () =>
      http.request<ApiResponse<string[]>>({
        method: "GET",
        path: "/v0.2/info/mobile-money-codes",
      }),
  };
}


