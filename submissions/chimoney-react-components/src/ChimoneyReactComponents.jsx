import React, { useState } from "react";
import { ChimoneyInput } from "./components/chimoneyInput";
import { ChimoneyButton } from "./components/chimoneyButton";

// PaymentForm component
export const PaymentForm = ({ onSubmit, className }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, currency });
  };

  return (
    <form onSubmit={handleSubmit} className={`${className || ""}`}>
      <ChimoneyInput
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className=" outline-none border-gray-100 rounded-sm"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <ChimoneyButton
        type="submit"
        className="bg-blue-300 w-full p-12"
        buttonName={"Pay now"}
      />
    </form>
  );
};

// TransactionList component
export const TransactionList = ({ transactions, className }) => {
  return (
    <ul className={`space-y-2  ${className || ""}`}>
      {transactions.map((transaction) => (
        <li key={transaction.id} className="px-4 py-2 bg-gray-100 rounded-md">
          {transaction.amount} {transaction.currency} - {transaction.date}
        </li>
      ))}
    </ul>
  );
};

// UserAccountForm component
export const UserAccountForm = ({ onSubmit, className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className || ""}`}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className=" "
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Update Account
      </button>
    </form>
  );
};
