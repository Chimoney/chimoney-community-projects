import React, { useState } from "react";
import { saveUserCred, userExists } from "./SecureAuth";

export default function Signup({ onSuccess }: { onSuccess: () => void }) {
  const [walletId, setWalletId] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!walletId || !password || password !== repeat) {
      setError("Check wallet ID and passwords again!");
      return;
    }

    if (await userExists(walletId)) {
      setError("Wallet ID already exists. Please log in.");
      return;
    }

    try {
      await saveUserCred(walletId, password);
      // Do NOT auto-login here — redirect user to login page
      onSuccess();
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-xl flex flex-col gap-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input className="border p-2 rounded" placeholder="Wallet ID" value={walletId} onChange={(e) => setWalletId(e.target.value)} />
      <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="border p-2 rounded" type="password" placeholder="Repeat Password" value={repeat} onChange={(e) => setRepeat(e.target.value)} />
      {error && <div className="text-red-500">{error}</div>}
      <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
}
