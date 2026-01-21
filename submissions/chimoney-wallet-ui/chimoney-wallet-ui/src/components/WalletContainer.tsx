import React, { createContext, useContext, useState, useEffect } from "react";
import { WalletWidgetConfig, WalletTheme } from "../types";

// Updated default theme with real CSS color values
const defaultTheme: WalletTheme = {
  background: "linear-gradient(135deg, #1e3a8a, #6b21a8)", // blue-purple gradient
  card: "rgba(0, 0, 0, 0.15)",
  textPrimary: "#ffffff",
  textSecondary: "#d1d5db", // light gray
  accent: "#3b82f6", // blue-500 hex
  shadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
  buttonBg: "#4f46e5", // blue-700 hex
  buttonText: "#ffffff",
  fontFamily: "Inter, sans-serif",
  fontSize: "1rem",
  borderRadius: "1.5rem",
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  surfaceColor: "#f3f4f6",
  backgroundColor: "#eef2fa",
};

const ThemeContext = createContext<WalletTheme>(defaultTheme);

export function useWalletTheme() {
  return useContext(ThemeContext);
}

interface WalletContainerProps {
  wallet: any;
  walletId?: string;
  authCheck?: (walletId?: string) => boolean | Promise<boolean>;
  customTheme?: Partial<WalletTheme>;
  onAuthRequired?: () => void;
  children?: React.ReactNode;
}

export default function WalletContainer({
  wallet,
  walletId,
  authCheck,
  customTheme = {},
  onAuthRequired,
  children,
}: WalletContainerProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [walletData, setWalletData] = useState(wallet || null);

  // Merge default theme with customTheme (colors, fonts, etc.)
  const selectedTheme = { ...defaultTheme, ...customTheme };

  // Create CSS variables for dynamic theming with real color values
  const themeVars: React.CSSProperties & { [key: string]: string } = {
    "--primary-color": selectedTheme.primaryColor || "#3b82f6",
    "--secondary-color": selectedTheme.secondaryColor || "#10b981",
    "--surface-color": selectedTheme.surfaceColor || "#f3f4f6",
    "--background-color": selectedTheme.backgroundColor || "#eef2fa",
    "--font-family": selectedTheme.fontFamily || "Inter, sans-serif",
    "--font-size-base": selectedTheme.fontSize || "1rem",
    "--border-radius": selectedTheme.borderRadius || "1.5rem",
  };

  useEffect(() => {
    async function authenticate() {
      try {
        const result = authCheck ? await authCheck(walletId) : true;
        setIsAuthorized(result);
        if (!result) {
          if (onAuthRequired) onAuthRequired();
          setAuthError("Unauthorized to access this wallet");
        }
        setLoading(false);
      } catch (err) {
        setAuthError("Authentication error");
        setLoading(false);
      }
    }
    authenticate();
  }, [walletId, authCheck, onAuthRequired]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400">Loading wallet...</span>
      </div>
    );

  if (authError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        {authError}
      </div>
    );

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <div
        className="min-h-screen w-full transition-all duration-500"
        style={{
          background: selectedTheme.background,
          ...themeVars, // pass CSS vars here
        }}
      >
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 pt-4 sm:pt-8">
          <div
            className="w-full max-w-sm sm:max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            style={{
              background: "var(--surface-color)",
              color: "var(--text-primary)",
              borderRadius: "var(--border-radius)",
              boxShadow: selectedTheme.shadow || "0 2px 24px rgba(0,0,0,0.08)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--font-size-base)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
