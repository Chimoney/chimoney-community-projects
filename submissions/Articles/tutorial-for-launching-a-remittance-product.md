# Building a Cross-Border Remittance App: A Step-by-Step Tutorial Using the Chimoney API

## Introduction

Building a remittance product offers a significant opportunity, but developers face challenges like navigating multiple payment rails, international compliance, and currency conversions. Chimoney simplifies this with a single API, providing a comprehensive payment infrastructure with multi-currency wallets, a global payout network, and seamless currency conversion.

This tutorial provides a step-by-step guide to building a functional proof-of-concept remittance application, covering:

- Environment Setup
- User Wallet Creation
- International Bank Payout
- Transaction Verification
- Advanced Features (FX rates and notifications)

---

## Part 1: Preparing Your Development Environment

A correctly configured environment is the foundation for a successful integration.

### 1.1 Prerequisites

Ensure the following software is installed:

- Node.js
- A Code Editor (e.g., Visual Studio Code)
- Git

### 1.2 Onboarding with the Chimoney Sandbox

Chimoney provides a sandbox environment that mirrors production functionality, allowing for development and testing without moving real funds. Create a developer account at sandbox.chimoney.io to access the Developer Dashboard.

### 1.3 Generating and Securing Your API Key

API keys authenticate your requests. Generate one from the "Developers" tab in the Chimoney Dashboard. To prevent exposing keys, use environment variables. Create a `.env` file in your project's root and add it to `.gitignore`.

```
CHIMONEY_API_KEY="YOUR_API_KEY_HERE"
```

Use a library like dotenv (`npm install dotenv`) to load these variables.

### 1.4 Setting Up Your Project

To follow along with the code examples, you'll need a basic Node.js project.

**Create a Project Directory:**

```bash
mkdir chimoney-remittance-app
cd chimoney-remittance-app
```

**Initialize a Node.js Project:**

```bash
npm init -y
```

**Install Dependencies:**

```bash
npm install axios dotenv
```

This will set up a new project and install axios for making HTTP requests and dotenv for managing your API key.

---

## Part 2: Programmatic User Wallet Creation

The first functional step is onboarding users by creating a secure wallet.

### 2.1 Understanding Chimoney's Wallet-as-a-Service (WaaS)

Chimoney's Wallet-as-a-Service (WaaS) allows platforms to programmatically issue multi-currency wallets for users, backed by an infrastructure that handles regulatory requirements like KYC. For a scalable architecture, use the subAccount feature to create a unique sub-account for each user and issue a wallet to that sub-account, ensuring proper separation of funds.

### 2.2 API Endpoint: POST /v0.2.4/multicurrency-wallets/create

This endpoint provisions a new user wallet.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subAccount": "ID_OF_THE_USERS_SUBACCOUNT" 
}
```

### 2.3 Implementation: Creating a User Wallet

This function uses Node.js and axios to create a new wallet.

```javascript
const axios = require('axios');
require('dotenv').config();

async function createUserWallet(userName, userEmail, subAccountId) {
  const CHIMONEY_API_KEY = process.env.CHIMONEY_API_KEY;
  const API_BASE_URL = 'https://api-v2-sandbox.chimoney.io';

  try {
    const response = await axios.post(
      `${API_BASE_URL}/v0.2.4/multicurrency-wallets/create`,
      { name: userName, email: userEmail, subAccount: subAccountId },
      {
        headers: {
          'X-API-KEY': CHIMONEY_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Wallet created successfully:', response.data);
    // Securely store the returned wallet ID (`response.data.data.id`)
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error.response? error.response.data : error.message);
    return null;
  }
}
```

---

## Part 3: Initiating an International Bank Payout

With wallets established, the next step is sending money to a beneficiary's bank account.

### 3.1 The Anatomy of a Global Payout

International payout requirements vary by country. To build a user-friendly interface, first call the `GET /info/beneficiary-rules/{countryCode}` endpoint. This provides a schema to dynamically generate the payout form, ensuring users are prompted for the correct information, which reduces errors and ensures compliance.

### 3.2 API Endpoint: POST /v0.2/payouts/bank

This is the central endpoint for executing a bank transfer.

**Request Body:**

```json
{
  "subAccount": "SUB_ACCOUNT_ID_OF_SENDER",
  "banks": []
}
```

### 3.3 Implementation: Executing the Payout

This function sends the bank payout request. It's critical to capture the issueID from the response for transaction tracking.

```javascript
async function executeBankPayout(subAccountId, payoutDetails) {
  const CHIMONEY_API_KEY = process.env.CHIMONEY_API_KEY;
  const API_BASE_URL = 'https://api-v2-sandbox.chimoney.io';

  try {
    const response = await axios.post(
      `${API_BASE_URL}/v0.2.4/payouts/bank`,
      { subAccount: subAccountId, banks: payoutDetails },
      {
        headers: {
          'X-API-KEY': CHIMONEY_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Payout initiated successfully:', response.data);
    const issueID = response.data.data.issueID;
    // Store this issueID in your database
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error executing bank payout:', error.response? error.response.data : error.message);
    return { success: false, error: error };
  }
}
```

---

## Part 4: Verifying Transaction Status

Providing clear, real-time status updates is fundamental to building user trust.

### 4.1 API Endpoint: POST /v0.2.4/payment/verify

Chimoney's dedicated endpoint for checking transaction status is `POST /v0.2.4/payment/verify`. It uses the issueID from the payout call.

**Request Body:**

```json
{
  "id": "YOUR_ISSUE_ID_FROM_PAYOUT"
}
```

### 4.2 Implementation: Checking the Status

The following function queries the verification endpoint. The response will contain a status field with values such as processing, paid, or failed.

```javascript
async function verifyTransactionStatus(issueID) {
  const CHIMONEY_API_KEY = process.env.CHIMONEY_API_KEY;
  const API_BASE_URL = 'https://api-v2-sandbox.chimoney.io';

  try {
    const response = await axios.post(
      `${API_BASE_URL}/v0.2.4/payment/verify`,
      { id: issueID },
      {
        headers: {
          'X-API-KEY': CHIMONEY_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Transaction status verified successfully:', response.data);
    // Update your application's UI with the status
    return response.data;
  } catch (error) {
    console.error(`Error verifying transaction status for issueID ${issueID}:`, error.response? error.response.data : error.message);
    return null;
  }
}
```

---

## Part 5: Advanced Capabilities

Enhance your app with features that provide a transparent and reliable user experience.

### 5.1 Tip 1: Transparent Foreign Exchange (FX) Conversion

Before a transaction, users need to know the exchange rate and the final amount the beneficiary will receive. Chimoney provides endpoints for this transparency. Use `GET /v0.2.4/info/exchange-rates` for indicative rates or `POST /multicurrency-wallets/transfer-quote` for a precise quote before the user confirms the payout.

### 5.2 Tip 2: Real-Time Notifications with Webhooks

Instead of repeatedly polling for status updates, use webhooks for real-time, event-driven notifications. Webhooks allow the Chimoney platform to send an HTTP POST request to your application when an event occurs (e.g., a transaction is completed). Community articles confirm a "Webhooks" tab in the developer dashboard for setup.

---

## Conclusion and Further Exploration

This tutorial has provided a blueprint for building a cross-border remittance application using the Chimoney API, covering wallet creation, bank payouts, transaction verification, and advanced features. By leveraging Chimoney's unified API, developers can build sophisticated payment solutions with speed and simplicity. For further exploration, refer to the [official documentation](https://chimoney.readme.io/reference/introduction) and the sample projects in the Chimoney Community Projects GitHub repository.