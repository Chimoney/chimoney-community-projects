import axios, { AxiosRequestConfig } from "axios";
import { AuthKeyError, ChiMoneyError } from "./errors";

export type HttpMethod = "GET" | "POST" | "DELETE";

export interface RequestOptions {
  method: HttpMethod;
  path: string;
  payload?: any;
  params?: any;
}

export interface HttpClientConfig {
  apiKey: string;
  sandbox?: boolean;
  baseUrlOverride?: string;
}

const LIVE_URL = "https://api.chimoney.io";
const SANDBOX_URL = "https://api-v2-sandbox.chimoney.io";

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: HttpClientConfig) {
    if (!config.apiKey) throw new AuthKeyError("Missing auth key");
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrlOverride
      ? config.baseUrlOverride
      : config.sandbox
      ? SANDBOX_URL
      : LIVE_URL;
  }

  async request<T>(options: RequestOptions): Promise<T> {
    const url = this.baseUrl + options.path;

    const axiosConfig: AxiosRequestConfig = {
      method: options.method,
      url,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
      },
      data: options.payload ?? {},
      params: options.params ?? {},
      validateStatus: () => true,
    };

    const res = await axios(axiosConfig);

    if (res.status >= 200 && res.status < 300) {
      return res.data as T;
    }

    // Handle Chimoney formatted error
    const statusField = (res.data?.status ?? "").toString().toLowerCase();
    if (statusField === "error" && res.data?.error) {
      throw new ChiMoneyError(String(res.data.error));
    }

    throw new Error(
      `HTTP ${res.status}: ${typeof res.data === "string" ? res.data : JSON.stringify(res.data)}`
    );
  }
}


