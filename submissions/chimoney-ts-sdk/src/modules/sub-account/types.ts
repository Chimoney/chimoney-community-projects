export interface ApiResponse<T> {
  status: "success" | "error" | string;
  data: T;
  error?: unknown;
}

export interface SubAccount {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateSubAccountRequest {
  name: string;
  email: string;
}

export interface CreateSubAccountResponse {
  id: string;
  name: string;
  email: string;
}
