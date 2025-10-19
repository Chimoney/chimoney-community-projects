import React, { useState } from "react";
import { useWalletTheme } from "./WalletContainer";

interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  fee: string;
  time: string;
  min: number;
  max: number;
}

interface WithdrawData {
  amount: number;
  method: string;
  timestamp: string;
}

interface WithdrawOptionsProps {
  onWithdraw?: (data: WithdrawData) => Promise<void> | void;
  balance?: number;
  disabled?: boolean;
}

const withdrawalMethods: WithdrawalMethod[] = [
  { id: "bank", name: "Bank Account", icon: "🏦", fee: "Free", time: "1-2 days", min: 1, max: 25000 },
  { id: "instant", name: "Instant Transfer", icon: "⚡", fee: "$1.50", time: "30 mins", min: 1, max: 5000 }
];

export default function WithdrawOptions({
  onWithdraw,
  balance = 0,
  disabled = false,
}: WithdrawOptionsProps) {
  const theme = useWalletTheme();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [error, setError] = useState("");
  const isGlass = theme.name && theme.name.toLowerCase().includes("glass");
  const handleWithdraw = async () => {
    setError("");

    const withdrawAmount = parseFloat(amount);

    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > balance) {
      setError("Insufficient balance");
      return;
    }

    const method = withdrawalMethods.find(m => m.id === selectedMethod);
    if (method && (withdrawAmount < method.min || withdrawAmount > method.max)) {
      setError(`Amount must be between $${method.min} and $${method.max.toLocaleString()}`);
      return;
    }

    const withdrawData: WithdrawData = {
      amount: withdrawAmount,
      method: selectedMethod,
      timestamp: new Date().toISOString()
    };

    setLoading(true);
    try {
      if (onWithdraw) {
        await onWithdraw(withdrawData);
      }
      setShowModal(false);
      setAmount("");
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Withdrawal failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled || balance <= 0}
        className={`w-full py-3 px-4 font-semibold rounded-2xl shadow-lg focus:outline-none transform transition-all duration-300 
        ${theme.buttonBg} ${theme.buttonText} hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        💸 Withdraw Funds
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${theme.card} rounded-3xl p-6 w-full max-w-md ${theme.shadow}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Withdraw Funds</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setAmount("");
                }}
                className={`text-2xl ${theme.textSecondary} hover:${theme.textPrimary} transition-colors`}
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-600">Available Balance</p>
              <p className="text-2xl font-bold text-blue-700">${balance.toLocaleString()}</p>
            </div>

            <div className="mb-6">
              <label className={`block text-sm ${theme.textSecondary} mb-2`}>
                Withdrawal Amount
              </label>
              <div className="relative">
                <span className={`absolute left-3 top-3 ${theme.textSecondary}`}>$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  max={balance}
                  step="0.01"
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border ${theme.textPrimary} text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm ${theme.textSecondary} mb-3`}>Withdrawal Method</label>


<div className="space-y-2">
  {withdrawalMethods.map(method => {
    const isSelected = selectedMethod === method.id;
    return (
      <label
        key={method.id}
        className={[
          "flex items-center p-3 rounded-xl border cursor-pointer transition-all",
          isSelected
            ? isGlass
              ? "border-slate-900 bg-slate-800 text-white"
              : "border-blue-500 bg-blue-50 text-blue-900"
            : isGlass
              ? "border-slate-600 bg-white/10 text-white"
              : "border-gray-200 bg-white text-gray-900"
        ].join(" ")}
      >
        <input
          type="radio"
          name="method"
          value={method.id}
          checked={isSelected}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="sr-only"
        />
        <span className="text-2xl mr-3">{method.icon}</span>
        <div className="flex-1">
          <p className="font-medium">{method.name}</p>
          <p className="text-sm opacity-80">{method.time} • {method.fee}</p>
          <p className="text-xs opacity-70">Limit: ${method.min} - ${method.max.toLocaleString()}</p>
        </div>
      </label>
    );  
  })}
</div>

            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setAmount("");
                }}
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-xl border border-gray-300 ${theme.textPrimary} hover:bg-gray-50 transition-colors disabled:opacity-50`}
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading || !amount || parseFloat(amount) <= 0}
                className={`w-full py-3 px-4 font-semibold rounded-2xl shadow-lg focus:outline-none transform transition-all duration-300 
                ${theme.buttonBg} ${theme.buttonText} hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
