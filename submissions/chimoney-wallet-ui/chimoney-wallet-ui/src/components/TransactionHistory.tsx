import React, { useState } from "react";
import { useWalletTheme } from "./WalletContainer";

// Status and category mappings with Tailwind classes
const statusColors: Record<string, string> = {
  Success: "text-green-500 bg-green-50 border-green-200",
  Pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Failed: "text-red-500 bg-red-50 border-red-200",
};

// Category icons
const categoryIcons: Record<string, string> = {
  Transfer: "↔️",
  Cash: "💵",
  Food: "🍽️",
  Bills: "📄",
  Payroll: "💰",
  Shopping: "🛍️",
};

// Transaction interface
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

interface TransactionHistoryProps {
  transactions?: Transaction[];
  textPrimary?: string;
  textSecondary?: string;
}

export default function TransactionHistory({
  transactions = [],
  textPrimary,
  textSecondary,
}: TransactionHistoryProps) {
  const theme = useWalletTheme();
  const [filter, setFilter] = useState<"all" | "income" | "expenses" | "pending">("all");

  const filteredTransactions = transactions.filter((txn) => {
    if (!txn) return false;
    if (filter === "all") return true;
    if (filter === "income") return (txn.amount || 0) > 0;
    if (filter === "expenses") return (txn.amount || 0) < 0;
    if (filter === "pending") return (txn.status || "").toLowerCase() === "pending";
    return true;
  });

  // Use passed textPrimary/textSecondary or theme defaults
  const textPrimaryClass = textPrimary || theme.textPrimary;
  const textSecondaryClass = textSecondary || theme.textSecondary;

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${textPrimaryClass}`}>
          Transaction History
        </h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "income" | "expenses" | "pending")}
          className={`text-xs px-2 py-1 rounded-lg border ${textSecondaryClass} bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className={`${theme.card} rounded-2xl p-4 max-h-80 overflow-y-auto`}>
        {filteredTransactions.length === 0 ? (
          <p className={`text-center ${textSecondaryClass} py-8`}>
            No transactions found
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((txn, index) => (
              <div
                key={txn.id || index}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:shadow-sm ${theme.card}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-xl">
                    {categoryIcons[txn.category || ""] || "💳"}
                  </div>
                  <div>
                    <h4 className={`font-medium ${textPrimaryClass} text-sm`}>
                      {txn.type || "Transaction"}
                    </h4>
                    <p className={`text-xs ${textSecondaryClass} truncate max-w-32`}>
                      {txn.description || "No description"}
                    </p>
                    <p className={`text-xs ${textSecondaryClass}`}>
                      {txn.date || "Unknown date"} • {txn.time || "Unknown time"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      (txn.amount || 0) > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {(txn.amount || 0) > 0 ? "+" : ""}
                    ${Math.abs(txn.amount || 0).toLocaleString()}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs border ${
                      statusColors[txn.status || ""] ||
                      "text-gray-500 bg-gray-50 border-gray-200"
                    }`}
                  >
                    {txn.status || "Unknown"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
