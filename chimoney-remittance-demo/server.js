// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const CHI_API_KEY = process.env.CHIMONEY_API_KEY || '';
const CHI_BASE = process.env.CHIMONEY_BASE_URL || 'https://api.chimoney.io/v0.2.4';

// helper: chimoney axios instance
const chimoney = axios.create({
  baseURL: CHI_BASE,
  headers: {
    'Authorization': `Bearer ${CHI_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000
});

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

/**
 * Create multicurrency wallet
 * Expects body: { name, externalId, metadata? }
 */
app.post('/api/create-wallet', async (req, res) => {
  try {
    const payload = {
      name: req.body.name || 'Demo Wallet',
      externalId: req.body.externalId || `demo-${Date.now()}`,
      metadata: req.body.metadata || {}
    };
    const r = await chimoney.post('/multicurrency-wallets/create', payload);
    return res.json({ success: true, data: r.data });
  } catch (err) {
    console.error('create-wallet error', err?.response?.data || err.message);
    return res.status(err?.response?.status || 500).json({
      success: false,
      error: err?.response?.data || err.message
    });
  }
});


/**
 * Bank payout
 * Expects body: {
 *   amount,
 *   currency,
 *   beneficiary: { firstName, lastName, accountNumber, bankCode, country },
 *   metadata?
 * }
 */
app.post('/api/payout-bank', async (req, res) => {
  try {
    const body = {
      amount: req.body.amount,
      currency: req.body.currency,
      beneficiary: req.body.beneficiary,
      // optional fields: sourceWallet, externalId, metadata
      sourceWallet: req.body.sourceWallet, // optional
      externalId: req.body.externalId || `payout-${Date.now()}`,
      metadata: req.body.metadata || {}
    };
    const r = await chimoney.post('/payouts/bank', body);
    return res.json({ success: true, data: r.data });
  } catch (err) {
    console.error('payout-bank error', err?.response?.data || err.message);
    return res.status(err?.response?.status || 500).json({
      success: false,
      error: err?.response?.data || err.message
    });
  }
});


/**
 * Verify payment
 * Expects body: { paymentReference OR chiRef or payoutReference depending on flow }
 * We'll forward whatever the user sends to /payment/verify
 */
app.post('/api/verify-payment', async (req, res) => {
  try {
    const payload = req.body;
    const r = await chimoney.post('/payment/verify', payload);
    return res.json({ success: true, data: r.data });
  } catch (err) {
    console.error('verify-payment error', err?.response?.data || err.message);
    return res.status(err?.response?.status || 500).json({
      success: false,
      error: err?.response?.data || err.message
    });
  }
});

// Optionally: endpoint to request FX quote (if desired by user)
// POST /api/fx-quote { fromCurrency, toCurrency, amount }
app.post('/api/fx-quote', async (req, res) => {
  try {
    // Chimoney has a quote endpoint under multicurrency-wallets/quote or similar.
    // For a quick demo we will POST to multicurrency-wallets/quote if available.
    const payload = {
      fromCurrency: req.body.fromCurrency,
      toCurrency: req.body.toCurrency,
      amount: req.body.amount
    };
    const r = await chimoney.post('/multicurrency-wallets/quote', payload);
    return res.json({ success: true, data: r.data });
  } catch (err) {
    // If endpoint doesn't exist in your account, return predictable error payload
    return res.status(400).json({ success: false, error: err?.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chimoney demo server listening on http://localhost:${PORT}`));
