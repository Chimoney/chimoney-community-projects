import React, { useState } from "react";
import { ChimoneyInput } from "./chimoneyInput";
import { ChimoneyButton } from "./chimoneyButton";

interface ChimoneyPaymentProps {
  onSubmit: (data: {
    amount: string;
    emails: string[];
    paymentType: "email" | "phone";
  }) => void;
  className?: string;
  testMode?: boolean;
}

export const ChimoneyPayment: React.FC<ChimoneyPaymentProps> = ({
  onSubmit,
  className = "",
  testMode = false,
}) => {
  const [paymentType, setPaymentType] = useState<"email" | "phone">("email");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emails = recipients
      .split("\n")
      .filter((email) => email.trim() !== "");
    onSubmit({
      amount,
      emails,
      paymentType,
    });
  };

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-3xl shadow-lg  flex  p-4  ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-800 ">
            Send Chimoney
          </h2>

          <p className="text-sm text-purple-500">
            to anyone, anywhere, securely.
          </p>
        </div>

        {/* Payment Type Selector */}
        <div className="flex rounded-full py-2 gap-4">
          <button
            onClick={() => setPaymentType("email")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium  hover:bg-violet-500 hover:text-white
              ${
                paymentType === "email"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:bg-white/50"
              }`}
          >
            To Emails
          </button>
          <button
            onClick={() => setPaymentType("phone")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium  hover:bg-violet-500 hover:text-white
              ${
                paymentType === "phone"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:bg-white/50"
              }`}
          >
            To Phone numbers
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Amount to send
            </label>
            <div className="flex gap-4">
              <div className="pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <ChimoneyInput
                type="number"
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                className=" border-[1px] px-4 outline-none rounded-md border-gray-100"
                placeholder="0.00"
              />
              <div className="">
                <select
                  name="Currency"
                  className=" bg-white text-gray-800 outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="KES">KES</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recipients Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {paymentType === "email"
                ? "Emails to pay"
                : "Phone numbers to pay"}
            </label>
            <ChimoneyInput
              value={recipients}
              onChange={(e: any) => setRecipients(e.target.value)}
              className="block w-full border-[1px] px-4 border-gray-100 rounded-md  outline-none"
              type="type"
              placeholder={`Enter ${
                paymentType === "email" ? "emails" : "phone numbers"
              } (1 per line)`}
            />
          </div>

          {/* Test Mode Notice */}
          {testMode && (
            <p className="text-sm text-gray-500 italic">
              *You'll not be charged for this test Payout. You'll receive
              follow-up emails.
            </p>
          )}

          {/* Submit Button */}
          <ChimoneyButton
            type="submit"
            className={`w-full py-3 px-4 rounded-full text-center text-sm font-medium
              ${
                testMode
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            buttonName={testMode ? "Send Test Payout" : "Send Payment"}
            onClick={undefined}
          ></ChimoneyButton>
        </form>
      </div>
    </div>
  );
};

// Export additional types if needed
export type ChimoneyPaymentType = "email" | "phone";

export interface ChimoneyPaymentData {
  amount: string;
  emails: string[];
  paymentType: ChimoneyPaymentType;
}
