// src/api/chimoneyClient.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// wrapper functions - call your backend which proxies Chimoney
export const createWalletApi = (payload) => client.post("/v0.2/multicurrency-wallets/create", payload);
export const transferFundsApi = (payload) => client.post("/v0.2/multicurrency-wallets/transfer", payload);
export const verifyPaymentApi = (payload) => client.post("/v0.2/payment/verify", payload);

export default client;
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../features/wallet/walletSlice";
import transferReducer from "../features/transfer/transferSlice";
import verifyReducer from "../features/verify/verifySlice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    transfer: transferReducer,
    verify: verifyReducer,
  },
});
// src/features/wallet/walletSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createWalletApi } from "../../api/chimoneyClient";

export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createWalletApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: { creating: false, wallet: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWallet.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.creating = false;
        state.wallet = action.payload;
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
// src/features/wallet/WalletCreateForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWallet } from "./walletSlice";

export default function WalletCreateForm() {
  const dispatch = useDispatch();
  const { creating, wallet, error } = useSelector((s) => s.wallet);

  const [reference_id, setReferenceId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [currency, setCurrency] = useState("USD");

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      reference_id,
      customer: { first_name },
      currency,
    };
    dispatch(createWallet(payload));
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
      <h3>Create Wallet</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Reference id</label>
          <input value={reference_id} onChange={(e) => setReferenceId(e.target.value)} required />
        </div>
        <div>
          <label>First name</label>
          <input value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option>USD</option>
            <option>EUR</option>
            <option>NGN</option>
          </select>
        </div>
        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create"}
        </button>
      </form>

      {wallet && (
        <div style={{ marginTop: 12, background: "#f8f8f8", padding: 8 }}>
          <strong>Created wallet response:</strong>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(wallet, null, 2)}</pre>
        </div>
      )}
      {error && <div style={{ color: "red" }}>Error: {JSON.stringify(error)}</div>}
    </div>
  );
}
// src/features/transfer/transferSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transferFundsApi } from "../../api/chimoneyClient";

export const transferFunds = createAsyncThunk(
  "transfer/transferFunds",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await transferFundsApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState: { sending: false, result: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transferFunds.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.sending = false;
        state.result = action.payload;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      });
  },
});

export default transferSlice.reducer;
// src/features/transfer/TransferForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferFunds } from "./transferSlice";

export default function TransferForm() {
  const dispatch = useDispatch();
  const { sending, result, error } = useSelector((s) => s.transfer);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [reference, setReference] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { from, to, amount: Number(amount), currency, reference };
    dispatch(transferFunds(payload));
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}>
      <h3>Transfer Funds</h3>
      <form onSubmit={onSubmit}>
        <div><label>From (wallet id)</label><input value={from} onChange={e => setFrom(e.target.value)} required /></div>
        <div><label>To (wallet id)</label><input value={to} onChange={e => setTo(e.target.value)} required /></div>
        <div><label>Amount</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} required /></div>
        <div><label>Currency</label><input value={currency} onChange={e => setCurrency(e.target.value)} /></div>
        <div><label>Reference</label><input value={reference} onChange={e => setReference(e.target.value)} /></div>
        <button type="submit" disabled={sending}>{sending ? "Sending..." : "Transfer"}</button>
      </form>

      {result && <div style={{ marginTop: 12 }}><strong>Transfer result:</strong><pre>{JSON.stringify(result, null, 2)}</pre></div>}
      {error && <div style={{ color: "red" }}>Error: {JSON.stringify(error)}</div>}
    </div>
  );
}
// src/features/verify/verifySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { verifyPaymentApi } from "../../api/chimoneyClient";

export const verifyPayment = createAsyncThunk(
  "verify/verifyPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await verifyPaymentApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: { verifying: false, result: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.verifying = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifying = false;
        state.result = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload;
      });
  },
});

export default verifySlice.reducer;
// src/features/verify/VerifyForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyPayment } from "./verifySlice";

export default function VerifyForm() {
  const dispatch = useDispatch();
  const { verifying, result, error } = useSelector((s) => s.verify);

  const [payment_reference, setPaymentReference] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyPayment({ payment_reference }));
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16 }}>
      <h3>Verify Payment</h3>
      <form onSubmit={onSubmit}>
        <div><label>Payment reference</label><input value={payment_reference} onChange={e => setPaymentReference(e.target.value)} required /></div>
        <button type="submit" disabled={verifying}>{verifying ? "Verifying..." : "Verify"}</button>
      </form>

      {result && <div style={{ marginTop: 12 }}><strong>Verify result:</strong><pre>{JSON.stringify(result, null, 2)}</pre></div>}
      {error && <div style={{ color: "red" }}>Error: {JSON.stringify(error)}</div>}
    </div>
  );
}
// src/App.js
import React from "react";
import WalletCreateForm from "./features/wallet/WalletCreateForm";
import TransferForm from "./features/transfer/TransferForm";
import VerifyForm from "./features/verify/VerifyForm";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Redux Wallet — Chimoney P2P Demo</h1>
      <p>Make sure your backend is running and reachable at <code>{process.env.REACT_APP_API_BASE}</code>.</p>
      <WalletCreateForm />
      <TransferForm />
      <VerifyForm />
    </div>
  );
}
// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
