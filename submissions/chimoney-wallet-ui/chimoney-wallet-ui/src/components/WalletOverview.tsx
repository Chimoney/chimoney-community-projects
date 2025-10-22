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
  textPrimary?: string;   
  textSecondary?: string; 
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
        <h1
          style={{ color: "var(--text-primary, #222)" }}
          className="text-2xl font-bold"
        >
          Welcome back{userName ? `, ${userName}` : ""}!
        </h1>
        <p
          style={{ color: "var(--text-secondary, #666)" }}
          className="text-sm"
        >
          Here's your wallet overview
        </p>
      </div>

      {/* Main Balance Card */}
      <div
        style={{
          background: "var(--surface-color)",
          borderRadius: "var(--border-radius)",
          padding: "1.5rem",
          transition: "all 0.3s ease",
          boxShadow: theme.shadow || "none",
          color: "var(--text-primary)",
          fontFamily: "var(--font-family)",
          fontSize: "var(--font-size-base)",
        }}
        className="mb-4"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-1">
              Total Balance
            </p>
            <h2
              style={{ color: "var(--primary-color)" }}
              className="text-4xl font-bold"
            >
              {currencySymbol}
              {balance.toLocaleString()}
            </h2>
            <p style={{ color: "var(--text-secondary)" }} className="text-xs mt-1">
              {currency}
            </p>
          </div>
          <div className="text-right">
            <p style={{ color: "var(--text-secondary)" }} className="text-xs">
              Wallet ID
            </p>
            <p style={{ color: "var(--primary-color)" }} className="text-sm font-mono">
              {walletInfo.id || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div
          style={{
            background: "var(--surface-color)",
            borderRadius: "var(--border-radius)",
            padding: "0.75rem",
            transition: "all 0.3s ease",
            boxShadow: theme.shadow || "none",
            color: "var(--text-primary)",
          }}
          className="text-center"
        >
          <p style={{ color: "var(--text-secondary)" }} className="text-xs">
            Income
          </p>
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--income-color, #10b981)" }}
          >
            +{currencySymbol}
            {totalIncome.toLocaleString()}
          </p>
        </div>
        <div
          style={{
            background: "var(--surface-color)",
            borderRadius: "var(--border-radius)",
            padding: "0.75rem",
            transition: "all 0.3s ease",
            boxShadow: theme.shadow || "none",
            color: "var(--text-primary)",
          }}
          className="text-center"
        >
          <p style={{ color: "var(--text-secondary)" }} className="text-xs">
            Expenses
          </p>
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--expense-color, #ef4444)" }}
          >
            -{currencySymbol}
            {totalExpenses.toLocaleString()}
          </p>
        </div>
        <div
          style={{
            background: "var(--surface-color)",
            borderRadius: "var(--border-radius)",
            padding: "0.75rem",
            transition: "all 0.3s ease",
            boxShadow: theme.shadow || "none",
            color: "var(--text-primary)",
          }}
          className="text-center"
        >
          <p style={{ color: "var(--text-secondary)" }} className="text-xs">
            Transactions
          </p>
          <p className="text-lg font-semibold">{recentTransactions.length}</p>
        </div>
      </div>
    </section>
  );
}
