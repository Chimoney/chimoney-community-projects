# Building an Automated Vendor Payout System with Chimoney API

## Overview

This tutorial will guide you through building a complete automated vendor payout system using the Chimoney API. By the end, you'll have a working system that can onboard vendors, process automated payments, verify transactions, and generate detailed reports.

**What you'll build:**
- Sub-account management for vendor payouts
- Vendor wallet creation and management
- Automated payout processing
- AI-generated invoices
- Payment verification system
- Transaction reporting dashboard

**Time to complete:** ~30 minutes

---

## Prerequisites

Before starting, make sure you have:

1. **Node.js** (v14 or higher) installed on your machine
2. **Chimoney API Key** - [Get your API key here](https://chimoney.io/developers)
3. Basic knowledge of JavaScript and async/await
4. A code editor (VS Code, Sublime, etc.)

### Environment Setup

Create a new project directory and initialize it:

```bash
mkdir chimoney-vendor-payout
cd chimoney-vendor-payout
npm init -y
npm install node-fetch dotenv
```

Create a `.env` file in your project root:

```env
CHIMONEY_API_KEY=your_api_key_here
CHIMONEY_BASE_URL=https://api-v2-sandbox.chimoney.io
```

Create a `config.js` file to load your environment variables:

```javascript
require('dotenv').config();

module.exports = {
  apiKey: process.env.CHIMONEY_API_KEY,
  baseUrl: process.env.CHIMONEY_BASE_URL || 'https://api-v2-sandbox.chimoney.io'
};
```

---

## Step 1: Create a Sub-Account for Vendor Payments

**Why?** Sub-accounts allow you to separate vendor payments from your main account, making accounting and tracking much easier.

**Endpoint:** `POST /v0.2/sub-account/create`

Create a file called `01-create-subaccount.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function createSubAccount() {
  const url = `${config.baseUrl}/v0.2/sub-account/create`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({
      name: 'Vendor Payouts',
      email: 'vendor.payouts@yourcompany.com',
      firstName: 'Vendor',
      lastName: 'Payments',
      phoneNumber: '+1234567890'
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('✅ Sub-account created successfully!');
      console.log('📋 Sub-account ID:', data.data.id);
      console.log('\n💡 Save this ID - you\'ll need it for payouts!');
      return data.data.id;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

createSubAccount();
```

**Run it:**
```bash
node 01-create-subaccount.js
```

**Expected Output:**
```
✅ Sub-account created successfully!
📋 Sub-account ID: sub_abc123xyz
💡 Save this ID - you'll need it for payouts!
```

**📝 Note:** Copy the `Sub-account ID` - you'll need it in Step 3.

---

## Step 2: Create Vendor Wallets

**Why?** Each vendor needs their own Chimoney wallet to receive payments. This creates a secure, trackable payment destination.

**Endpoint:** `POST /v0.2/multicurrency-wallets/create`

Create a file called `02-create-vendor-wallet.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function createVendorWallet(vendorInfo) {
  const url = `${config.baseUrl}/v0.2/multicurrency-wallets/create`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({
      name: vendorInfo.name,
      email: vendorInfo.email,
      firstName: vendorInfo.firstName,
      lastName: vendorInfo.lastName,
      phoneNumber: vendorInfo.phoneNumber
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log(`✅ Wallet created for ${vendorInfo.name}`);
      console.log('💳 Wallet ID:', data.data.id);
      console.log('\n💡 Save this Wallet ID for payouts!');
      return data.data.id;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Create wallet for a vendor
const vendor = {
  name: 'Acme Design Studios',
  email: 'payments@acmedesign.com',
  firstName: 'Jane',
  lastName: 'Smith',
  phoneNumber: '+1234567891'
};

createVendorWallet(vendor);
```

**Run it:**
```bash
node 02-create-vendor-wallet.js
```

**Expected Output:**
```
✅ Wallet created for Acme Design Studios
💳 Wallet ID: wallet_xyz789abc
💡 Save this Wallet ID for payouts!
```

**📝 Note:** Copy the `Wallet ID` - you'll need it in Step 3.

---

## Step 3: Automate Vendor Payouts

**Why?** This is the core of the system - automatically sending payments from your sub-account to vendor wallets.

**Endpoint:** `POST /v0.2/payouts/wallet`

Create a file called `03-process-payout.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function processVendorPayout(subAccountId, walletId, amount, description) {
  const url = `${config.baseUrl}/v0.2/payouts/wallet`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({
      wallets: [
        {
          receiver: walletId,
          valueInUSD: amount,
          narration: description,
          collectionPaymentIssueID: `INV-${Date.now()}`
        }
      ],
      subAccount: subAccountId,
      turnOffNotification: false
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('✅ Payout processed successfully!');
      console.log('💰 Amount:', `$${amount}`);
      console.log('📄 Description:', description);
      console.log('🆔 Transaction ID:', data.data.chimoneys[0].id);
      console.log('\n💡 Save this Transaction ID to verify payment later!');
      return data.data.chimoneys[0].id;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Process a vendor payout
// Replace these with your actual IDs from Steps 1 and 2
const SUB_ACCOUNT_ID = 'your_sub_account_id_here';
const VENDOR_WALLET_ID = 'your_vendor_wallet_id_here';

processVendorPayout(
  SUB_ACCOUNT_ID,
  VENDOR_WALLET_ID,
  1000,
  'Payment for Q1 2025 services'
);
```

**Run it:**
```bash
node 03-process-payout.js
```

**Expected Output:**
```
✅ Payout processed successfully!
💰 Amount: $1000
📄 Description: Payment for Q1 2025 services
🆔 Transaction ID: chi_pay123xyz
💡 Save this Transaction ID to verify payment later!
```

**📝 Note:** Copy the `Transaction ID` - you'll need it in Step 5.

---

## Step 4: Generate AI-Powered Invoices

**Why?** Vendors can automatically generate professional invoices using AI, which can then be used to request or document payments.

**Endpoint:** `POST /v0.2/ai/invoice/generate`

Create a file called `04-generate-invoice.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function generateAIInvoice(instruction) {
  const url = `${config.baseUrl}/v0.2/ai/invoice/generate`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({ instruction })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('✅ Invoice generated successfully!\n');
      console.log('📋 Invoice Details:');
      console.log(JSON.stringify(data.data, null, 2));
      return data.data;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Generate an invoice
const invoiceRequest = `Create an invoice from Acme Design Studios to TechCorp Inc. 
for Web Development Services provided for 3 months at $2500/month, 
UI/UX Design work for $1500, and Project Management services for $1000. 
Apply a 5% tax rate and include payment terms of Net 30.`;

generateAIInvoice(invoiceRequest);
```

**Run it:**
```bash
node 04-generate-invoice.js
```

**Expected Output:**
```
✅ Invoice generated successfully!

📋 Invoice Details:
{
  "invoiceNumber": "INV-2025-001",
  "from": "Acme Design Studios",
  "to": "TechCorp Inc.",
  "items": [
    {
      "description": "Web Development Services",
      "quantity": 3,
      "rate": 2500,
      "amount": 7500
    },
    ...
  ],
  "subtotal": 9000,
  "tax": 450,
  "total": 9450
}
```

---

## Step 5: Create Payment Requests

**Why?** Vendors can send payment requests with detailed quotes directly to clients.

**Endpoint:** `POST /v0.2/payment/initiate`

Create a file called `05-payment-request.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function createPaymentRequest(subAccountId, amount, payerEmail, currency = 'USD') {
  const url = `${config.baseUrl}/v0.2/payment/initiate`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({
      subAccount: subAccountId,
      valueInUSD: amount,
      payerEmail: payerEmail,
      currency: currency
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('✅ Payment request created!');
      console.log('🔗 Payment Link:', data.data.paymentLink);
      console.log('\n💡 Share this link with the payer to complete payment');
      return data.data;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Create a payment request
const SUB_ACCOUNT_ID = 'your_sub_account_id_here';

createPaymentRequest(
  SUB_ACCOUNT_ID,
  5000,
  'client@techcorp.com'
);
```

---

## Step 6: Verify Payment Status

**Why?** Track payment statuses to ensure vendors receive their payments and maintain accurate records.

**Endpoint:** `POST /v0.2/payment/verify`

Create a file called `06-verify-payment.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function verifyPayment(transactionId) {
  const url = `${config.baseUrl}/v0.2/payment/verify`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({ id: transactionId })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      const status = data.data.status;
      const statusEmoji = {
        'paid': '✅',
        'redeemed': '💰',
        'pending': '⏳',
        'failed': '❌'
      };
      
      console.log(`${statusEmoji[status] || '📋'} Payment Status: ${status.toUpperCase()}`);
      console.log('📊 Transaction Details:');
      console.log(JSON.stringify(data.data, null, 2));
      return data.data;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Verify a payment
// Replace with your Transaction ID from Step 3
const TRANSACTION_ID = 'your_transaction_id_here';

verifyPayment(TRANSACTION_ID);
```

**Run it:**
```bash
node 06-verify-payment.js
```

**Possible Statuses:**
- ✅ **paid** - Payment successfully sent to vendor
- 💰 **redeemed** - Vendor has withdrawn/used the funds
- ⏳ **pending** - Payment is being processed
- ❌ **failed** - Payment failed (check error details)

---

## Step 7: Generate Transaction Reports

**Why?** Generate comprehensive reports of all vendor payments for accounting and reconciliation.

**Endpoint:** `POST /v0.2/accounts/transactions`

Create a file called `07-generate-report.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');

async function generateTransactionReport(subAccountId) {
  const url = `${config.baseUrl}/v0.2/accounts/transactions`;
  
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'X-API-KEY': config.apiKey
    },
    body: JSON.stringify({ subAccount: subAccountId })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.status === 'success') {
      console.log('📊 Transaction Report Generated\n');
      console.log(`Total Transactions: ${data.data.length}`);
      
      // Calculate totals
      const totalPaid = data.data.reduce((sum, tx) => {
        return sum + (tx.valueInUSD || 0);
      }, 0);
      
      console.log(`💰 Total Amount Paid: $${totalPaid.toFixed(2)}\n`);
      console.log('Recent Transactions:');
      console.log('─'.repeat(80));
      
      data.data.slice(0, 10).forEach(tx => {
        console.log(`Date: ${new Date(tx.createdAt).toLocaleDateString()}`);
        console.log(`Amount: $${tx.valueInUSD}`);
        console.log(`Status: ${tx.status}`);
        console.log(`Description: ${tx.narration || 'N/A'}`);
        console.log('─'.repeat(80));
      });
      
      return data.data;
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

// Example: Generate report for your sub-account
const SUB_ACCOUNT_ID = 'your_sub_account_id_here';

generateTransactionReport(SUB_ACCOUNT_ID);
```

**Run it:**
```bash
node 07-generate-report.js
```

---

## Building a Complete Application

Now let's combine everything into a single application with a menu-driven interface.

Create a file called `vendor-payout-system.js`:

```javascript
const fetch = require('node-fetch');
const config = require('./config');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store IDs for the session
const session = {
  subAccountId: null,
  vendorWalletId: null,
  transactionId: null
};

function showMenu() {
  console.log('\n' + '='.repeat(60));
  console.log('🏦 CHIMONEY VENDOR PAYOUT SYSTEM');
  console.log('='.repeat(60));
  console.log('1. Create Sub-Account');
  console.log('2. Create Vendor Wallet');
  console.log('3. Process Payout');
  console.log('4. Generate AI Invoice');
  console.log('5. Create Payment Request');
  console.log('6. Verify Payment');
  console.log('7. Generate Transaction Report');
  console.log('8. Exit');
  console.log('='.repeat(60));
  
  rl.question('Select an option (1-8): ', handleMenuChoice);
}

async function handleMenuChoice(choice) {
  switch (choice) {
    case '1':
      await createSubAccount();
      break;
    case '2':
      await createVendorWallet();
      break;
    case '3':
      await processPayout();
      break;
    case '4':
      await generateInvoice();
      break;
    case '5':
      await createPaymentRequest();
      break;
    case '6':
      await verifyPayment();
      break;
    case '7':
      await generateReport();
      break;
    case '8':
      console.log('👋 Goodbye!');
      rl.close();
      return;
    default:
      console.log('❌ Invalid option');
  }
  
  showMenu();
}

// Implementation of each function would go here
// (Use the code from previous steps)

// Start the application
console.log('🚀 Starting Chimoney Vendor Payout System...\n');
showMenu();
```

---

## Advanced Tips & Customizations

### 1. **Batch Payouts**
Process multiple vendor payments at once:

```javascript
const batchPayouts = [
  { receiver: 'wallet_1', valueInUSD: 1000, narration: 'Vendor A' },
  { receiver: 'wallet_2', valueInUSD: 2000, narration: 'Vendor B' },
  { receiver: 'wallet_3', valueInUSD: 1500, narration: 'Vendor C' }
];

// Send all in one request
await processVendorPayout(subAccountId, batchPayouts);
```

### 2. **Scheduled Payouts**
Use `node-cron` for automated scheduled payouts:

```bash
npm install node-cron
```

```javascript
const cron = require('node-cron');

// Run every Friday at 5 PM
cron.schedule('0 17 * * 5', () => {
  console.log('🕐 Running scheduled vendor payouts...');
  processWeeklyPayouts();
});
```

### 3. **Webhook Integration**
Set up webhooks to receive real-time payment notifications:

```javascript
const express = require('express');
const app = express();

app.post('/webhooks/chimoney', express.json(), (req, res) => {
  const event = req.body;
  
  if (event.type === 'payment.success') {
    console.log('✅ Payment successful:', event.data);
    // Update your database, send notifications, etc.
  }
  
  res.status(200).send('OK');
});

app.listen(3000);
```

### 4. **Error Handling & Retries**
Implement robust error handling:

```javascript
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Retry ${i + 1}/${maxRetries}...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

## Troubleshooting

### Common Issues

**❌ "Invalid API Key"**
- Check your `.env` file has the correct API key
- Ensure no extra spaces in the API key
- Verify you're using the sandbox key for testing

**❌ "Sub-account not found"**
- Make sure you've saved the sub-account ID from Step 1
- Verify the ID is correctly copied (no extra characters)

**❌ "Insufficient funds"**
- For sandbox testing, ensure your test account has sufficient balance
- Contact Chimoney support to add test funds

**❌ "Rate limit exceeded"**
- Add delays between requests
- Implement exponential backoff for retries

---

## Next Steps

Now that you have a working vendor payout system:

1. **Explore the Full API** - Check out [Chimoney API Documentation](https://chimoney.io/docs)
2. **Review the Use Case Guide** - Read the [Automate Vendor Payout Use Case Guide](https://chimoney.io/use-cases/vendor-payout)
3. **Join the Community** - Connect with other developers building on Chimoney
4. **Build Your App** - Customize this system for your specific business needs

---

## Resources

- 📚 [Chimoney API Documentation](https://chimoney.io/docs)
- 🎯 [Vendor Payout Use Case Guide](https://chimoney.io/use-cases/vendor-payout)
- 💬 [Developer Community](https://discord.gg/chimoney)
- 🐛 [Report Issues](https://github.com/Chimoney/chimoney-community-projects/issues)
- 📧 [Support Email](mailto:support@chimoney.io)

---

**Built with ❤️ using Chimoney API**
