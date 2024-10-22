import React, { Children, useState } from "react";
import { ChimoneyInput } from "./components/chimoneyInput";
import { ChimoneyButton } from "./components/chimoneyButton";
import "./styles/tailwind.css";
// TransactionList component
export const TransactionList = ({ transactions, className }) => {
  return (
    <table className={`space-y-2 w-full    ${className || ""}`}>
      <tr className=" flex gap-4 space-x-2 justify-between">
        <th>Date</th>
        <th>Payment to</th>
        <th>Type</th>
        <th>Currency</th>
        <th>Amount</th>
        <th>Intial Amount</th>
        <th>Balance Amount</th>
      </tr>
      {/* map all the transaction */}
      {transactions.map((transaction) => (
        <tr
          key={transactions.id}
          className=" flex justify-between flex-1 text-left"
        >
          <td>{transaction.date}</td>
          <td>{transaction.paymentTo}</td>
          <td>{transaction.type}</td>
          <td>{transaction.currency}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.initialAmount}</td>
          <td>{transaction.balAmount}</td>
        </tr>
      ))}
    </table>
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
    <form
      onSubmit={handleSubmit}
      className={` space-y-4 mt-4 flex flex-col justify-center items-centers ${
        className || ""
      }`}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="outline-none  "
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className=" px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Update Account
      </button>
    </form>
  );
};
