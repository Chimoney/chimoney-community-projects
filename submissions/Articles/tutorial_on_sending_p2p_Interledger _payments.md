# Tutorial: Integrating Chimoney's Payment Pointer for Sending and Verifying Payments

This tutorial will guide you through the process of sending and verifying payments using Chimoney's API and Payment Pointers. We will cover setting up your environment, sending a payment to an Interledger Wallet Address, and verifying the transaction.

## 1. Environment Setup

Before you start, you'll need a Chimoney developer account and your API key.

### Getting Your API Key

1. Go to the Chimoney Developer Portal and create an account.
2. Log in and navigate to the "Developers" tab to create a new App.
3. Your API Key will be generated. Copy it and keep it safe.

**Note**: This tutorial covers all steps in sandbox mode. The sandbox base URL is https://api-v2-sandbox.chimoney.io/v0.2.4/ For those working on production, please replace the sandbox base URL with the production URL: https://api.chimoney.io/v0.2.4/

### Setting up your .env file

Create a `.env` file in your project's root directory to store your API key securely.

```
CHIMONEY_API_KEY="YOUR_API_KEY"
```

### Dependencies

This tutorial uses Node.js and the node-fetch library to make API requests. Make sure you have Node.js installed and then install node-fetch:

```bash
npm install node-fetch
```

## 2. Step-by-Step Guide On P2P Transfers

### Step 1: Send a Payment

To send a payment to an Interledger Wallet Address, you will use the `POST /v0.2.4/payouts/interledger-wallet-address` endpoint.

**EndPoint**:https://api.chimoney.io/v0.2.4/payouts/interledger-wallet-address

#### Explanation

This endpoint allows you to initiate a payout to a user's Interledger Payment Pointer. You need to specify the debit currency and provide a list of wallets to send to — including the recipient's Interledger Wallet Address, the currency, the amount, and a narration for the transaction.

#### Code Snippet (JavaScript)

```javascript
import fetch from 'node-fetch';

const sendPayment = async () => {
  const url = 'https://api-v2-sandbox.chimoney.io/v0.2.4/payouts/interledger-wallet-address';
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': process.env.CHIMONEY_API_KEY
    },
    body: JSON.stringify({
      debitCurrency: 'USD',
      interledgerWallets: [
        {
          interledgerWalletAddress: '$ilp.uphold.com/24NNrh1B32g4', // Example payment pointer
          currency: 'USD',
          amountToDeliver: 1,
          narration: 'Payment for services'
        }
      ]
    })
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.error('error:' + err);
  }
};

sendPayment();
```

### Step 2: Verify the Payment

After sending a payment, you will receive an `issueID`. You can use this ID to verify the status of your transaction with the `POST /v0.2.4/payment/verify` endpoint.

**EndPoint**:https://api.chimoney.io/v0.2.4/payment/verify

#### Explanation

This endpoint helps you confirm if a transaction was successful. You pass the issueID from the previous step in the request body. This endpoint is particularly useful for verifying the final status of the transaction, as it will confirm one of these four states: "failed", "expired", "fraud", or "paid".

#### Code Snippet (JavaScript)

```javascript
import fetch from 'node-fetch';

const verifyPayment = async (issueID) => {
  const url = 'https://api-v2-sandbox.chimoney.io/v0.2.4/payment/verify';
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': process.env.CHIMONEY_API_KEY
    },
    body: JSON.stringify({
      id: issueID
    })
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.error('error:' + err);
  }
};

// Replace with the issueID from your "Send Payment" response
const issueID = "YOUR_ISSUE_ID";
verifyPayment(issueID);
```

## 3. Optional Features

### Sending Payments in Multiple Currencies

Chimoney's API supports multiple currencies. To send a payment in a different currency, change the `debitCurrency` and the `currency` in the `interledgerWallets` array to your desired currency code (e.g., "CAD", "NGN").

### Transaction Notifications

For transaction notifications, you can set up a webhook in your Chimoney developer dashboard. This allows Chimoney to send real-time updates about your transactions to a URL you specify.

## 4. Conclusion and Further Resources

You have now learned the basic workflow for sending and verifying payments with Chimoney's Payment Pointer integration.

For more detailed information, refer to the official documentation:

- **Payment Pointer Integration Use Case Guide:**  
  https://chimoney.io/usecases/interledger-receive-and-send-payments/

- **Chimoney API Reference:**  
  https://chimoney.readme.io/reference/getting-started-with-your-api

- **Introductory Video:**  
  For a great introduction to the Chimoney API, check out this Payment API 101 video.
  https://www.youtube.com/watch?v=VItvZbPH9cU