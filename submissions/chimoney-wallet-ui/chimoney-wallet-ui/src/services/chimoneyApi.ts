const CHIMONEY_BASE_URL = "https://api.chimoney.io/v0.2.4";
const CHIMONEY_SANDBOX_URL = "https://api-v2-sandbox.chimoney.io/v0.2.4";

export interface ChimoneyApiConfig {
  apiKey: string;
  sandbox?: boolean;
}

export const chimoneyApi = {
  /**
   * Get details of an existing multicurrency wallet
   * Retrieves wallet balance, transaction history, and account metadata
   * 
   * API Endpoint: GET /multicurrency-wallets/get?id={walletId}
   * Headers required:
   * - X-API-KEY: Your Chimoney API key
   * - accept: application/json
   */
  async getWalletDetails(walletId: string, config: ChimoneyApiConfig) {
    const baseUrl = config.sandbox ? CHIMONEY_SANDBOX_URL : CHIMONEY_BASE_URL;
    
    try {
      const url = `${baseUrl}/multicurrency-wallets/get?id=${walletId}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": config.apiKey,
          "accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet details: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      throw error;
    }
  },
};
