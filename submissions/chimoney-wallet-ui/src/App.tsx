import React, { useState, useEffect } from "react";
import WalletContainer from "./components/WalletContainer";
import WalletOverview from "./components/WalletOverview";
import TransactionHistory, { Transaction } from "./components/TransactionHistory";
import FundingOptions from "./components/FundingOptions";
import WithdrawOptions from "./components/WithdrawOptions";
import SettingsPanel, { Settings, ThemeType } from "./components/SettingsPanel";
import DashboardCharts from "./components/DashboardCharts";
import ErrorBoundary from "./components/ErrorBoundary";

import { getActiveSession, logoutSession, userExists } from "./auth/SecureAuth";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

const fetchWallet = async (walletId: string) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id: walletId,
        balance: 3000.5,
        currency: "USD",
        currencySymbol: "$",
        userName: walletId,
      });
    }, 800)
  );
};

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full flex justify-center my-6">
      <button
        className="
          px-8 py-3 bg-gray-200 rounded-xl font-semibold text-gray-800
          shadow transition hover:bg-red-500 hover:text-white
          w-full max-w-xs"
        onClick={() => setShow(true)}
      >
        Logout
      </button>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center w-72">
            <div className="mb-4 text-lg text-gray-800 font-semibold">Are you sure you want to logout?</div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white rounded px-4 py-2"
                onClick={() => {
                  setShow(false);
                  onLogout();
                }}
              >
                OK
              </button>
              <button className="bg-gray-300 rounded px-4 py-2" onClick={() => setShow(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type Route = "signup" | "login" | "wallet" | "loading";

type AppState = {
  route: Route;
  walletId: string | null;
  wallet: any | null;
  transactions: Transaction[];
  settings: Settings;
  loading: boolean;
  theme: ThemeType;
  balanceHistory: number[];
  incomeData: number[];
  expenseData: number[];
};

export default function App() {
  const savedTheme = localStorage.getItem("wallet-theme") || "glassmorphic";

  const [appState, setAppState] = useState<AppState>(() => ({
    route: "loading",
    walletId: null,
    wallet: null,
    transactions: [],
    settings: {
      theme: savedTheme as ThemeType,
      pushEnabled: true,
      emailEnabled: true,
      securityEnabled: true,
      twoFactorEnabled: false,
      biometricEnabled: true,
    },
    loading: false,
    theme: savedTheme as ThemeType,
    balanceHistory: [],
    incomeData: [],
    expenseData: [],
  }));

  const updateAppState = (
    newState: Partial<AppState> | ((prev: AppState) => Partial<AppState>)
  ) => {
    setAppState((prev) => {
      const merged = typeof newState === "function" ? { ...prev, ...newState(prev) } : { ...prev, ...newState };
      localStorage.setItem("wallet-route", merged.route);
      return merged;
    });
  };

  useEffect(() => {
    const session = getActiveSession();
    if (session) {
      updateAppState({ walletId: session.walletId, route: "wallet" });
    } else {
      updateAppState({ route: "login" });
    }
  }, []);

  useEffect(() => {
    if (appState.settings.theme !== appState.theme) {
      updateAppState({ theme: appState.settings.theme });
    }
  }, [appState.settings.theme]);

  useEffect(() => {
    localStorage.setItem("wallet-theme", appState.theme);
  }, [appState.theme]);

  useEffect(() => {
    if (appState.route === "wallet" && appState.walletId) {
      updateAppState({ loading: true });
      fetchWallet(appState.walletId).then((w: any) => {
        const savedBalance = localStorage.getItem(`balance_${appState.walletId}`);
        if (savedBalance !== null) w.balance = parseFloat(savedBalance);

        const savedTxns = localStorage.getItem(`transactions_${appState.walletId}`);
        let txns: Transaction[] = [];
        if (savedTxns) {
          try {
            txns = JSON.parse(savedTxns);
          } catch {
            txns = [];
          }
        }
        const { balanceHistory, incomeData, expenseData } = generateAnalytics(w.balance, txns);
        updateAppState({ wallet: w, transactions: txns, loading: false, balanceHistory, incomeData, expenseData });
      });
    }
  }, [appState.route, appState.walletId]);

  function generateAnalytics(currentBalance: number, txns: Transaction[]) {
    const balanceHistory: number[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];
    let runningBalance = currentBalance;
    const days = 5;
    let labelDateArr = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return d.toLocaleDateString();
    });
    for (let i = 0; i < days; i++) {
      const txnsForDay = txns.filter((t) => t.date === labelDateArr[i]);
      let income = 0,
        expense = 0;
      txnsForDay.forEach((txn) => {
        const amount = txn.amount ?? 0;
        if (amount > 0) income += amount;
        else if (amount < 0) expense += -amount;
        runningBalance -= amount;
      });
      incomeData.push(income);
      expenseData.push(expense);
      balanceHistory.push(runningBalance);
    }
    balanceHistory.push(currentBalance);
    incomeData.reverse();
    expenseData.reverse();
    balanceHistory.reverse();
    return { balanceHistory, incomeData, expenseData };
  }

  const handleSignup = async (walletId: string, password: string) => {
    if (await userExists(walletId)) {
      alert("A user with this Wallet ID already exists. Please log in.");
      updateAppState({ route: "login" });
      return;
    }
    updateAppState({ route: "login" });
  };

  const handleLogin = (walletId: string) => {
    updateAppState({ walletId, route: "wallet" });
  };

  const setTransactions = (txns: Transaction[]) => {
    if (!appState.walletId) return;
    localStorage.setItem(`transactions_${appState.walletId}`, JSON.stringify(txns));
    const { balanceHistory, incomeData, expenseData } = generateAnalytics(appState.wallet.balance, txns);
    updateAppState({ transactions: txns, balanceHistory, incomeData, expenseData });
  };

  const setBalance = (balance: number) => {
    if (!appState.walletId) return;
    localStorage.setItem(`balance_${appState.walletId}`, balance.toString());
    const { balanceHistory, incomeData, expenseData } = generateAnalytics(balance, appState.transactions);
    updateAppState({ wallet: { ...appState.wallet, balance }, balanceHistory, incomeData, expenseData });
  };

  const handleFund = async (fundData: { amount: number; method?: string }) => {
    if (!fundData.amount) return;
    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      type: "Deposit",
      description: `${fundData.method || "Funding"} added`,
      category: "Transfer",
      amount: fundData.amount,
      status: "Success",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setBalance(appState.wallet.balance + fundData.amount);
    setTransactions([newTransaction, ...appState.transactions]);
  };

  const handleWithdraw = async (withdrawData: { amount: number; method?: string }) => {
    if (!withdrawData.amount) return;
    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      type: "Withdrawal",
      description: `${withdrawData.method || "Withdrawal"} made`,
      category: "Cash",
      amount: -withdrawData.amount,
      status: "Success",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setBalance(Math.max(0, appState.wallet.balance - withdrawData.amount));
    setTransactions([newTransaction, ...appState.transactions]);
  };

  const handleSettingsChange = (newSettings: Settings) => {
    updateAppState({ settings: newSettings });
    if (newSettings.theme && newSettings.theme !== appState.theme) {
      updateAppState({ theme: newSettings.theme });
    }
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    updateAppState((prev) => ({
      theme: newTheme,
      settings: { ...prev.settings, theme: newTheme },
    }));
  };

  const handleLogout = () => {
    logoutSession();
    updateAppState({
      walletId: null,
      wallet: null,
      transactions: [],
      balanceHistory: [],
      incomeData: [],
      expenseData: [],
      route: "login",
    });
  };

  useEffect(() => {
    if (appState.route === "signup" && getActiveSession()) {
      updateAppState({ route: "wallet" });
    }
    if (
      (appState.route === "wallet" && !getActiveSession()) ||
      (appState.route === "wallet" && !appState.walletId)
    ) {
      updateAppState({ route: "login" });
    }
  }, [appState.route, appState.walletId]);

  if (appState.route === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Checking session...
      </div>
    );

  if (appState.route === "signup")
    return <Signup onSuccess={() => updateAppState({ route: "login" })} />;

  if (appState.route === "login")
    return (
      <div>
        <Login onSuccess={handleLogin} />
        <button className="block mx-auto mt-4 underline text-blue-600" onClick={() => updateAppState({ route: "signup" })}>
          Need an account? Sign Up
        </button>
      </div>
    );

  if (appState.loading || !appState.wallet)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading wallet...
      </div>
    );

  return (
    <WalletContainer wallet={appState.wallet} walletId={appState.wallet.id} theme={appState.theme}>
      <>
        <WalletOverview
          balance={appState.wallet.balance}
          currency={appState.wallet.currency}
          currencySymbol={appState.wallet.currencySymbol}
          recentTransactions={appState.transactions}
          walletInfo={{ id: appState.wallet.id }}
          userName={appState.wallet.userName}
        />
        <DashboardCharts
          balanceHistory={appState.balanceHistory}
          incomeData={appState.incomeData}
          expenseData={appState.expenseData}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FundingOptions onFund={handleFund} />
          <WithdrawOptions onWithdraw={handleWithdraw} balance={appState.wallet.balance} />
        </div>
        <TransactionHistory transactions={appState.transactions} />
        <SettingsPanel
          settings={appState.settings}
          onSettingsChange={handleSettingsChange}
          onThemeChange={handleThemeChange}
        />
        <LogoutButton onLogout={handleLogout} />
      </>
    </WalletContainer>
  );
}

export function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
