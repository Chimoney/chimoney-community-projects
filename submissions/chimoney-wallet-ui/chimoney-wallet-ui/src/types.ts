export type ThemeType = "glassmorphic" | "neumorphic" | "modern";

export interface WalletTheme {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  shadow: string;
  buttonBg: string;
  buttonText: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  primaryColor?: string;
  secondaryColor?: string;
  surfaceColor?: string;
  backgroundColor?: string;
}

export interface WalletWidgetConfig {
  primaryColor?: string;
  secondaryColor?: string;
  surfaceColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSizeBase?: string;
  borderRadius?: string;
  enableFunding?: boolean;
  enableWithdraw?: boolean;
  enableCharts?: boolean;
  enableSettings?: boolean;
  enableLogout?: boolean;
  theme?: ThemeType;
}

export interface Transaction {
  id?: string | number;
  type?: string;
  description?: string;
  category?: string;
  amount?: number;
  date?: string;
  time?: string;
  status?: string;
}

export interface WalletWidgetProps {
  walletId: string;
  wallet?: {  // ✅ OPTIONAL - either pass wallet data OR apiKey
    id: string;
    balance: number;
    currency: string;
    currencySymbol: string;
    userName?: string;
  };
  transactions?: Transaction[]; // ✅ OPTIONAL - either pass transactions OR apiKey
  apiKey?: string; // ✅ OPTIONAL - Chimoney API key for auto-fetching wallet data
  sandbox?: boolean; // ✅ OPTIONAL - Use Chimoney sandbox environment (default: true)
  onFund?: (data: { amount: number; method?: string }) => Promise<void>;
  onWithdraw?: (data: { amount: number; method?: string }) => Promise<void>;
  onLogout?: () => void;
  onConfigChange?: (config: WalletWidgetConfig) => void;
}

