import { HttpClient } from "../../internal/http";
import type {
  ApiResponse,
  SubAccount,
  CreateSubAccountRequest,
  CreateSubAccountResponse,
} from "./types";

export interface SubAccountModule {
  create(req: CreateSubAccountRequest): Promise<ApiResponse<CreateSubAccountResponse>>;
  getAll(): Promise<ApiResponse<SubAccount[]>>;
  getDetails(id: string): Promise<ApiResponse<SubAccount>>;
  deleteAccount(id: string): Promise<ApiResponse<unknown>>;
}

export function createSubAccountModule(http: HttpClient): SubAccountModule {
  return {
    create: (req) =>
      http.request<ApiResponse<CreateSubAccountResponse>>({
        method: "POST",
        path: "/v0.2/sub-account/create",
        payload: {
          name: req.name,
          email: req.email,
        },
      }),

    getAll: () =>
      http.request<ApiResponse<SubAccount[]>>({
        method: "GET",
        path: "/v0.2/sub-account/list",
      }),

    getDetails: (id) =>
      http.request<ApiResponse<SubAccount>>({
        method: "GET",
        path: "/v0.2/sub-account/get",
        params: { id },
      }),

    deleteAccount: (id) =>
      http.request<ApiResponse<unknown>>({
        method: "DELETE",
        path: "/v0.2/sub-account/delete",
        params: { id },
      }),
  };
}
