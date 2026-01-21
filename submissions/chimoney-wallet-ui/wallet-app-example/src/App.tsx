import React, { useState, useEffect } from "react";
import { WalletWidget, Transaction, WalletWidgetConfig } from "chimoney-wallet-ui";
import LoginForm from "./components/LoginForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<WalletData>({
    balance: 5000,
    transactions: [],
  });
  const [currentTheme, setCurrentTheme] = useState("default");
  const [themeConfig, setThemeConfig] = useState<WalletWidgetConfig>({
    primaryColor: "#6366f1",
    secondaryColor: "#10b981",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "8px",
    showAnalytics: true,
    locale: "en-US",
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
      loadWalletData(savedUserId);
    }
  }, []);

  // Save wallet data whenever it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        `wallet_${userId}`,
        JSON.stringify(walletData)
      );
    }
  }, [walletData, userId]);

  const loadWalletData = (id: string) => {
    const saved = localStorage.getItem(`wallet_${id}`);
    if (saved) {
      try {
        setWalletData(JSON.parse(saved));
      } catch {
        // Initialize with default data if parse fails
        setWalletData({
          balance: 5000,
          transactions: generateMockTransactions(),
        });
      }
    } else {
      // New user - create initial data
      setWalletData({
        balance: 5000,
        transactions: generateMockTransactions(),
      });
    }
  };

  const generateMockTransactions = (): Transaction[] => {
    const today = new Date();
    return [
      {
        id: "1",
        type: "Deposit",
        description: "Initial deposit",
        amount: 5000,
        date: today.toLocaleDateString(),
        time: today.toLocaleTimeString(),
      },
    ];
  };

  const handleLogin = (id: string) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    loadWalletData(id);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    setWalletData({ balance: 5000, transactions: [] });
  };

  const handleFund = (amount: number, method?: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "Deposit",
      description: `${method || "Funds"} added`,
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: "Success",
    };

    setWalletData((prev) => ({
      balance: prev.balance + amount,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  const handleWithdraw = (amount: number, method?: string) => {
    if (amount > walletData.balance) {
      alert("Insufficient funds!");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "Withdrawal",
      description: `${method || "Withdrawal"} processed`,
      amount: -amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: "Success",
    };

    setWalletData((prev) => ({
      balance: prev.balance - amount,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  const handleViewTransaction = (transaction: Transaction) => {
    console.log("View transaction:", transaction);
    alert(
      `Transaction Details:\n\nID: ${transaction.id}\nType: ${transaction.type}\nAmount: ${transaction.amount}\nDate: ${transaction.date}\nDescription: ${transaction.description}`
    );
  };

  const handleThemeChange = (themeName: string, config: WalletWidgetConfig) => {
    setCurrentTheme(themeName);
    setThemeConfig(config);
  };

  if (!userId) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userId}
            </h1>
            <p className="text-sm text-gray-600">
              Wallet ID: {userId.toUpperCase()}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />

        {/* Wallet Widget */}
        <WalletWidget
          walletId={userId}
          balance={walletData.balance}
          currencySymbol="$"
          transactions={walletData.transactions}
          config={themeConfig}
          onFund={handleFund}
          onWithdraw={handleWithdraw}
          onViewTransaction={handleViewTransaction}
        />

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm">
          <p>Powered by Chimoney Wallet UI</p>
          <p className="mt-2">
            Transactions: {walletData.transactions.length} | Balance: $
            {walletData.balance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
