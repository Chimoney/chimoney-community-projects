import React, { Children, useState } from "react";
import { ChimoneyInput } from "./components/chimoneyInput";
import { ChimoneyButton } from "./components/chimoneyButton";
import "./styles/tailwind.css";

// PaymentForm component
export const PaymentForm = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState({
    valueInUSD: "",
    payerEmail: "",
    currency: "USD",
    amount: "",
    redirect_url: "",
    walletID: "",
    narration: "",
    subAccount: "",
    meta: {
      turnOffNotification: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      meta:
        name === "turnOffNotification"
          ? { ...prevData.meta, [name]: checked }
          : prevData.meta,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className=""></div>
    // <form onSubmit={handleSubmit} className={` ${className || ""}`}>
    //   <div className=" bg-orange-300">
    //     <label className="flex text-sm font-medium text-orange-700">
    //       Value in USD
    //     </label>
    //     <ChimoneyInput
    //       type="number"
    //       name="valueInUSD"
    //       value={formData.valueInUSD}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-sm font-medium text-gray-700">
    //       Payer Email *
    //     </label>
    //     <ChimoneyInput
    //       type="email"
    //       name="payerEmail"
    //       value={formData.payerEmail}
    //       onChange={handleChange}
    //       required
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="currency"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Currency
    //     </label>
    //     <input
    //       type="text"
    //       id="currency"
    //       name="currency"
    //       value={formData.currency}
    //       onChange={handleChange}
    //       placeholder="e.g., USD, CAD"
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="amount"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Amount
    //     </label>
    //     <input
    //       type="text"
    //       id="amount"
    //       name="amount"
    //       value={formData.amount}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="redirect_url"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Redirect URL
    //     </label>
    //     <input
    //       type="url"
    //       id="redirect_url"
    //       name="redirect_url"
    //       value={formData.redirect_url}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="walletID"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Wallet ID
    //     </label>
    //     <input
    //       type="text"
    //       id="walletID"
    //       name="walletID"
    //       value={formData.walletID}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="narration"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Narration
    //     </label>
    //     <input
    //       type="text"
    //       id="narration"
    //       name="narration"
    //       value={formData.narration}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="subAccount"
    //       className="block text-sm font-medium text-gray-700"
    //     >
    //       Sub Account
    //     </label>
    //     <input
    //       type="text"
    //       id="subAccount"
    //       name="subAccount"
    //       value={formData.subAccount}
    //       onChange={handleChange}
    //       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //     />
    //   </div>

    //   <div className="flex items-center">
    //     <input
    //       type="checkbox"
    //       id="turnOffNotification"
    //       name="turnOffNotification"
    //       checked={formData.meta.turnOffNotification}
    //       onChange={handleChange}
    //       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //     />
    //     <label
    //       htmlFor="turnOffNotification"
    //       className="ml-2 block text-sm text-gray-900"
    //     >
    //       Turn off notifications
    //     </label>
    //   </div>
    //   {/* <Children></Children> */}

    //   <button
    //     type="submit"
    //     className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //   >
    //     Submit Payment
    //   </button>
    // </form>
  );
};

// TransactionList component
export const TransactionList = ({ transactions, className }) => {
  return (
    <ul className={`space-y-2   ${className || ""}`}>
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
