import React, { useState, FormEvent, ChangeEvent } from "react";

interface WalletIdEntryProps {
  onSubmit: (walletId: string) => void;
}

const WalletIdEntry: React.FC<WalletIdEntryProps> = ({ onSubmit }) => {
  const [inputId, setInputId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputId.trim().length < 8) {
      setError("Please enter a valid Wallet ID.");
      return;
    }
    setError(null);
    onSubmit(inputId.trim());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto p-6 bg-white/80 rounded-2xl shadow-lg flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Access Your Wallet
      </h2>
      <input
        type="text"
        placeholder="Enter Wallet ID"
        value={inputId}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-3"
      />
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg mt-2 shadow transition hover:scale-105 hover:shadow-xl"
      >
        View Wallet
      </button>
    </form>
  );
};

export default WalletIdEntry;
