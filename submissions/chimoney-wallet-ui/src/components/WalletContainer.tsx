import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, ThemeType } from "./themes";

const ThemeContext = createContext(themes.glassmorphic);

export function useWalletTheme() {
  return useContext(ThemeContext);
}

interface WalletContainerProps {
  wallet: any;
  walletId?: string;
  authCheck?: (walletId?: string) => boolean | Promise<boolean>;
  theme?: ThemeType;
  customTheme?: any;
  onAuthRequired?: () => void;
  children?: React.ReactNode;
}

export default function WalletContainer({
  wallet,
  walletId,
  authCheck,
  theme = "glassmorphic",
  customTheme = {},
  onAuthRequired,
  children,
}: WalletContainerProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [walletData, setWalletData] = useState(wallet || null);

  const selectedTheme = { ...themes[theme], ...customTheme };

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
        <div className={`min-h-screen w-full bg-gradient-to-br ${selectedTheme.background} transition-all duration-500`}>
          <div className="flex flex-col items-center justify-center p-2 sm:p-4 pt-4 sm:pt-8">
            {/* Improved mobile container */}
            <div className={`w-full max-w-sm sm:max-w-lg ${selectedTheme.card} ${selectedTheme.shadow} rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden`}>
              {children}
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
