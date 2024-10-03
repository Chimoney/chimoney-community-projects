// ChimoneyReactComponents.js

import React, { useState } from "react";

// PaymentForm component
export const PaymentForm = ({ onSubmit, customStyle }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, currency });
  };

  return (
    <form onSubmit={handleSubmit} style={customStyle}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button type="submit">Pay</button>
    </form>
  );
};

// TransactionList component
export const TransactionList = ({ transactions, customStyle }) => {
  return (
    <ul style={customStyle}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          {transaction.amount} {transaction.currency} - {transaction.date}
        </li>
      ))}
    </ul>
  );
};

// UserAccountForm component
export const UserAccountForm = ({ onSubmit, customStyle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} style={customStyle}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Update Account</button>
    </form>
  );
};
