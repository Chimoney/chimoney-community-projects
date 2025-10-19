import React, { useState } from "react";
import { authenticateUser } from "./SecureAuth";

export default function Login({ onSuccess }: { onSuccess: (walletId: string) => void }) {
  const [walletId, setWalletId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = await authenticateUser(walletId, password);
    if (!valid) setError("Login failed. Check Wallet ID and password.");
    else onSuccess(walletId);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-xl flex flex-col gap-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input className="border p-2 rounded" placeholder="Wallet ID" value={walletId} onChange={e => setWalletId(e.target.value)} />
      <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div className="text-red-500">{error}</div>}
      <button className="bg-green-600 text-white py-2 px-4 rounded" type="submit">
        Login
      </button>
    </form>
  );
}
