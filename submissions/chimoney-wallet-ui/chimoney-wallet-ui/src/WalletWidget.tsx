import React, { useState, useMemo, useEffect } from "react";
import WalletContainer from "./components/WalletContainer";
import WalletOverview from "./components/WalletOverview";
import TransactionHistory from "./components/TransactionHistory";
import FundingOptions from "./components/FundingOptions";
import WithdrawOptions from "./components/WithdrawOptions";
import SettingsPanel from "./components/SettingsPanel";
import DashboardCharts from "./components/DashboardCharts";
import { WalletWidgetProps, WalletTheme, WalletWidgetConfig } from "./types";
import { themes, ThemeType } from "./components/themes";

export default function WalletWidget({
  walletId,
  wallet,
  transactions,
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
    setSettingsOpen(false); // Close panel on save
  };

  const { balanceHistory, incomeData, expenseData } = useMemo(() => {
    // ...date logic as before
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
    transition: "all 0.12s"
  }}
  onClick={() => setSettingsOpen(true)}
>
  Settings
</button>


      {/* Settings Panel */}
      {settingsOpen && (
  <>
    {/* Overlay: underneath the panel */}
    <div
      className="fixed inset-0 bg-black/40 z-30"
      onClick={() => setSettingsOpen(false)}
      // Only covers background; panel z-40 will be above this.
    />
    {/* Panel: higher z-index, visible on the right */}
    <div
      className="fixed top-0 right-0 h-full w-80 shadow-xl z-40"
      // Do NOT use theme-dependent colors here, use bg-white or a constant class for settings panel:
      style={{
        background: "#f8fafc", // Keep color constant (e.g. Tailwind's bg-slate-50, or bg-white)
        boxShadow: "0 8px 40px rgba(0,0,0,0.11)",
        borderRadius: "1.2rem 0 0 1.2rem",
        minWidth: "18rem",
        maxWidth: "98vw",
        maxHeight: "100vh",
        overflow: "hidden",
        fontSize: "1rem"
      }}
    >
      <SettingsPanel
        config={config}
        onConfigChange={handleConfigChange}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSettingsSave}
      />
    </div>
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
