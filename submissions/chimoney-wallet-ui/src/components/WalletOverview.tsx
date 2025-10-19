import React from "react";
import { useWalletTheme } from "./WalletContainer";

export interface Transaction {
  id?: string | number;
  type?: string;
  amount?: number;
  date?: string;
  description?: string;
  category?: string;
  status?: string;
}

export interface WalletInfo {
  id?: string;
  [key: string]: any;
}

interface WalletOverviewProps {
  balance?: number;
  currency?: string;
  currencySymbol?: string;
  recentTransactions?: Transaction[];
  walletInfo?: WalletInfo;
  userName?: string | null;
}

export default function WalletOverview({
  balance = 0,
  currency = "USD",
  currencySymbol = "$",
  recentTransactions = [],
  walletInfo = {},
  userName = null,
}: WalletOverviewProps) {
  const theme = useWalletTheme();

  const totalIncome = recentTransactions
    .filter((t) => t?.amount && t.amount > 0)
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpenses = recentTransactions
    .filter((t) => t?.amount && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

  return (
    <section className="mb-6">
      {/* Welcome Header */}
      <div className="mb-4">
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back{userName ? `, ${userName}` : ""}!
        </h1>
        <p className={`text-sm ${theme.textSecondary}`}>
          Here's your wallet overview
        </p>
      </div>

      {/* Main Balance Card */}
      <div
        className={`${theme.card} rounded-2xl p-6 mb-4 transition-all duration-300 hover:shadow-lg`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={`text-sm ${theme.textSecondary} mb-1`}>
              Total Balance
            </p>
            <h2 className={`text-4xl font-bold ${theme.textPrimary}`}>
              {currencySymbol}
              {(balance || 0).toLocaleString()}
            </h2>
            <p className={`text-xs ${theme.textSecondary} mt-1`}>{currency}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${theme.textSecondary}`}>Wallet ID</p>
            <p className={`text-sm font-mono ${theme.textPrimary}`}>
              {walletInfo.id || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className={`${theme.card} rounded-xl p-3 text-center transition-all duration-300 hover:shadow-md`}
        >
          <p className={`text-xs ${theme.textSecondary}`}>Income</p>
          <p className={`text-lg font-semibold text-green-500`}>
            +{currencySymbol}
            {totalIncome.toLocaleString()}
          </p>
        </div>
        <div
          className={`${theme.card} rounded-xl p-3 text-center transition-all duration-300 hover:shadow-md`}
        >
          <p className={`text-xs ${theme.textSecondary}`}>Expenses</p>
          <p className={`text-lg font-semibold text-red-500`}>
            -{currencySymbol}
            {totalExpenses.toLocaleString()}
          </p>
        </div>
        <div
          className={`${theme.card} rounded-xl p-3 text-center transition-all duration-300 hover:shadow-md`}
        >
          <p className={`text-xs ${theme.textSecondary}`}>Transactions</p>
          <p className={`text-lg font-semibold ${theme.textPrimary}`}>
            {recentTransactions.length}
          </p>
        </div>
      </div>
    </section>
  );
}
