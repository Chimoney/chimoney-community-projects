import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (userId: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chimoney Wallet
          </h1>
          <p className="text-gray-600">Enter your wallet ID to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wallet ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your wallet ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Access Wallet
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo users: user1, user2, user3</p>
        </div>
      </div>
    </div>
  );
}
