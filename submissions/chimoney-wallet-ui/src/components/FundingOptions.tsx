import React, { useState, useRef, useEffect } from "react";
import { useWalletTheme } from "./WalletContainer";

interface FundingMethod {
  id: string;
  name: string;
  icon: string;
  fee: string;
  time: string;
}
interface FundingOptionsProps {
  onFund?: (data: { amount: number; method: string; timestamp: string }) => Promise<void> | void;
  disabled?: boolean;
}

const fundingMethods: FundingMethod[] = [
  { id: "bank", name: "Bank Transfer", icon: "🏦", fee: "Free", time: "1-3 days" },
  { id: "debit", name: "Debit Card", icon: "💳", fee: "2.9%", time: "Instant" },
  { id: "credit", name: "Credit Card", icon: "💳", fee: "3.4%", time: "Instant" },
];

export default function FundingOptions({ onFund, disabled = false }: FundingOptionsProps) {
  const theme = useWalletTheme();
  const isGlass = (theme.name && theme.name.toLowerCase().includes("glass")); // reliably detect glassmorphic
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [error, setError] = useState("");
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (showModal) amountRef.current?.focus(); }, [showModal]);

  const handleFund = async () => {
    setError("");
    const fundAmount = parseFloat(amount);
    if (!amount?.trim() || isNaN(fundAmount) || fundAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    const fundingData = {
      amount: fundAmount,
      method: selectedMethod,
      timestamp: new Date().toISOString(),
    };
    setLoading(true);
    try {
      if (onFund) await onFund(fundingData);
      setShowModal(false);
      setAmount("");
      setSelectedMethod("bank");
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Funding failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className={`w-full py-3 px-4 font-semibold rounded-2xl shadow-lg focus:outline-none transform transition-all duration-300 
        ${theme.buttonBg} ${isGlass ? "text-white" : theme.buttonText} hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        💰 Fund Wallet
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${theme.card} rounded-3xl p-6 w-full max-w-md ${theme.shadow} animate-fadeIn`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Fund Wallet</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setAmount("");
                  setSelectedMethod("bank");
                }}
                className={`text-2xl ${theme.textSecondary} hover:${theme.textPrimary} transition-colors`}
              >
                ×
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className={`block text-sm ${theme.textSecondary} mb-2`}>Amount (USD)</label>
              <div className="relative">
                <span className={`absolute left-3 top-3 ${theme.textSecondary}`}>$</span>
                <input
                  ref={amountRef}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border ${theme.textPrimary} text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className={`block text-sm ${theme.textSecondary} mb-3`}>Payment Method</label>
              <div className="space-y-2">
  {fundingMethods.map((method) => {
    const isSelected = selectedMethod === method.id;
    return (
      <label
        key={method.id}
        className={[
          "flex items-center p-3 rounded-xl border cursor-pointer transition-all",
          isSelected
            ? isGlass
              // Dark highlight with strong white text
                ? "border-slate-900 bg-slate-800 text-white"
                : "border-blue-500 bg-blue-50 text-blue-900"
            : isGlass
                // Dim glass background, visible white text
                ? "border-slate-600 bg-white/10 text-white"
                : "border-gray-200 bg-white text-gray-900",
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
          <p className={"font-medium " + (isSelected ? " " : "")}>{method.name}</p>
          <p className="text-sm opacity-80">
            {method.time} • {method.fee}
          </p>
        </div>
      </label>
    );
  })}
</div>
</div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                  setAmount("");
                  setSelectedMethod("bank");
                }}
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-xl border border-gray-300 ${theme.textPrimary} hover:bg-gray-50 transition-colors disabled:opacity-50`}
              >
                Cancel
              </button>
              <button 
                onClick={handleFund}
                disabled={loading || !amount}
                className={`w-full py-3 px-4 font-semibold rounded-2xl shadow-lg focus:outline-none transform transition-all duration-300 
                ${theme.buttonBg} ${isGlass ? "text-white" : theme.buttonText} hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Processing..." : "Add Funds"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
