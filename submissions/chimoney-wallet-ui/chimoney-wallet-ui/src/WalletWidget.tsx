import React, { useState, useMemo, useEffect } from "react";
import WalletContainer from "./components/WalletContainer";
import WalletOverview from "./components/WalletOverview";
import TransactionHistory from "./components/TransactionHistory";
import FundingOptions from "./components/FundingOptions";
import WithdrawOptions from "./components/WithdrawOptions";
import SettingsPanel from "./components/SettingsPanel";
import DashboardCharts from "./components/DashboardCharts";
import { WalletWidgetProps, WalletTheme, WalletWidgetConfig, Transaction } from "./types";
import { themes, ThemeType } from "./components/themes";
import { chimoneyApi } from "./services/chimoneyApi";

export default function WalletWidget({
  walletId,
  wallet: walletProp,
  transactions: transactionsProp,
  apiKey, // Ensure apiKey is defined in WalletWidgetProps
  sandbox = true,
  onFund,
  onWithdraw,
  onLogout,
  onConfigChange,
}: WalletWidgetProps) {
  const [themeName, setThemeName] = useState<ThemeType>("glassmorphic");
  const [config, setConfig] = useState<WalletWidgetConfig>({
    theme: "glassmorphic",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    surfaceColor: "#f3f4f6",
    backgroundColor: "#eef2fa",
    fontFamily: "Inter, sans-serif",
    fontSizeBase: "1rem",
    borderRadius: "1.5rem",
    enableFunding: true,
    enableWithdraw: true,
    enableCharts: true,
    enableSettings: true,
    enableLogout: true,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [wallet, setWallet] = useState(walletProp);
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsProp || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch wallet data from Chimoney API
  useEffect(() => {
    const fetchWalletData = async () => {
      if (apiKey && walletId && !walletProp) {
        setLoading(true);
        setError(null);
        
        try {
          const response = await chimoneyApi.getWalletDetails(walletId, {
            apiKey,
            sandbox,
          });

          if (response.status === "success" && response.data) {
            const walletData = response.data;
            
            // Set wallet details
            setWallet({
              id: walletData.id || walletId,
              balance: walletData.balance || 0,
              currency: walletData.currency || "USD",
              currencySymbol: walletData.currencySymbol || "$",
              userName: walletData.ownerName || walletData.owner || "User",
            });

            // Format transaction history if available
            if (walletData.transactions && Array.isArray(walletData.transactions)) {
              const formattedTransactions: Transaction[] = walletData.transactions.map((txn: any) => ({
                id: txn.id || txn.transactionID || Math.random().toString(),
                type: txn.type || txn.transactionType || "Transfer",
                description: txn.description || txn.narration || "Transaction",
                category: txn.category || "General",
                amount: parseFloat(txn.amount || txn.valueInUSD || 0),
                status: txn.status || "Success",
                date: new Date(txn.createdAt || txn.date || Date.now()).toLocaleDateString(),
                time: new Date(txn.createdAt || txn.date || Date.now()).toLocaleTimeString(),
              }));

              setTransactions(formattedTransactions);
            }
          } else {
            throw new Error(response.error || "Failed to fetch wallet data");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch wallet data");
          console.error("Error fetching wallet data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWalletData();
  }, [apiKey, walletId, walletProp, sandbox]);

  useEffect(() => {
    if (config.theme && config.theme !== themeName) {
      setThemeName(config.theme);
    }
  }, [config.theme]);

  const currentTheme: WalletTheme = useMemo(() => {
    const baseTheme = themes[themeName];
    return {
      ...baseTheme,
      primaryColor: config.primaryColor || baseTheme.primaryColor,
      secondaryColor: config.secondaryColor || baseTheme.secondaryColor,
      surfaceColor: config.surfaceColor || baseTheme.surfaceColor,
      backgroundColor: config.backgroundColor || baseTheme.backgroundColor,
      fontFamily: config.fontFamily || baseTheme.fontFamily,
      fontSize: config.fontSizeBase || baseTheme.fontSize,
      borderRadius: config.borderRadius || baseTheme.borderRadius,
    };
  }, [themeName, config]);

  const themeVars = {
    "--primary-color": currentTheme.primaryColor,
    "--secondary-color": currentTheme.secondaryColor,
    "--surface-color": currentTheme.surfaceColor,
    "--background-color": currentTheme.backgroundColor,
    "--font-family": currentTheme.fontFamily,
    "--font-size-base": currentTheme.fontSize,
    "--border-radius": currentTheme.borderRadius,
    "--income-color": "#10b981",
    "--expense-color": "#ef4444",
  } as React.CSSProperties;

  const handleConfigChange = (newConfig: WalletWidgetConfig) => {
    setConfig(newConfig);
    if (onConfigChange) onConfigChange(newConfig);
  };

  const handleSettingsSave = (newConfig: WalletWidgetConfig) => {
    setConfig(newConfig);
    if (onConfigChange) onConfigChange(newConfig);
    setSettingsOpen(false);
  };

  const { balanceHistory, incomeData, expenseData } = useMemo(() => {
    if (!wallet) return { balanceHistory: [], incomeData: [], expenseData: [] };
    
    const days = 5;
    const bh: number[] = [];
    const id: number[] = [];
    const ed: number[] = [];
    let runningBalance = wallet.balance;
    const dates = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return d.toLocaleDateString();
    });
    for (let i = 0; i < days; i++) {
      const dayTxns = transactions.filter((t) => t.date === dates[i]);
      let income = 0, expense = 0;
      dayTxns.forEach((txn) => {
        const amount = txn.amount ?? 0;
        if (amount > 0) income += amount;
        else if (amount < 0) expense += -amount;
        runningBalance -= amount;
      });
      id.push(income);
      ed.push(expense);
      bh.push(runningBalance);
    }
    bh.push(wallet.balance);
    id.reverse();
    ed.reverse();
    bh.reverse();
    return { balanceHistory: bh, incomeData: id, expenseData: ed };
  }, [wallet, transactions]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="font-bold text-lg mb-2">Error Loading Wallet</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No wallet data available</p>
      </div>
    );
  }

  return (
    <div
      className={`wallet-widget-root min-h-screen bg-gradient-to-br ${currentTheme.background}`}
      style={themeVars}
    >
      {/* Theme Selection Buttons */}
      <div className="fixed top-4 left-4 z-50 flex flex-wrap gap-2">
        {(Object.keys(themes) as ThemeType[]).map((theme) => (
          <button
            key={theme}
            onClick={() => {
              setThemeName(theme);
              setConfig((prev) => ({ ...prev, theme }));
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              themeName === theme
                ? "bg-white text-gray-900 shadow-lg"
                : "bg-black/20 text-white/80 hover:bg-black/30"
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* Settings Toggle Button */}
      <button
        style={{
          position: "fixed",
          top: "1rem",
          right: "1.5rem",
          zIndex: 50,
          borderRadius: "0.75rem",
          background: "#2563eb",
          color: "#fff",
          boxShadow: "0 3px 18px rgba(60, 60, 90, .12)",
          fontWeight: 600,
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
          transition: "all 0.12s",
        }}
        onClick={() => setSettingsOpen(true)}
      >
        Settings
      </button>

      {/* Settings Panel */}
      {settingsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setSettingsOpen(false)}
          />
          <SettingsPanel
            config={config}
            onConfigChange={handleConfigChange}
            onClose={() => setSettingsOpen(false)}
            onSave={handleSettingsSave}
          />
        </>
      )}

      {/* Main Content */}
      <WalletContainer wallet={wallet} walletId={walletId} customTheme={currentTheme}>
        <>
          <WalletOverview
            balance={wallet.balance}
            currency={wallet.currency}
            currencySymbol={wallet.currencySymbol}
            recentTransactions={transactions}
            walletInfo={{ id: wallet.id }}
            userName={wallet.userName}
          />
          {config.enableCharts && (
            <DashboardCharts
              balanceHistory={balanceHistory}
              incomeData={incomeData}
              expenseData={expenseData}
              accent="var(--primary-color)"
            />
          )}
          {(config.enableFunding || config.enableWithdraw) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {config.enableFunding && <FundingOptions onFund={onFund} />}
              {config.enableWithdraw && (
                <WithdrawOptions onWithdraw={onWithdraw} balance={wallet.balance} />
              )}
            </div>
          )}
          <TransactionHistory transactions={transactions} />
          {config.enableLogout && (
            <div className="w-full flex justify-center my-6">
              <button
                className="px-8 py-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 w-full max-w-xs"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: currentTheme.borderRadius,
                }}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </>
      </WalletContainer>
    </div>
  );
}
