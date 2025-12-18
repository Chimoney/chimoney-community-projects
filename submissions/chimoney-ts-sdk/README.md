# Chimoney TypeScript SDK

A fully typed TypeScript SDK for the Chimoney API, providing a developer-friendly interface for integrating Chimoney's payment services into TypeScript and JavaScript applications.

## Features

- ✅ **Full TypeScript Support** - Complete type definitions for all API operations
- ✅ **All API Modules** - Complete coverage of Chimoney's API endpoints
- ✅ **Error Handling** - Proper error types and handling
- ✅ **Sandbox Support** - Easy switching between sandbox and production
- ✅ **Modern ES6+** - Built with modern JavaScript features
- ✅ **Zero Dependencies** - Only axios and dotenv as runtime dependencies

## Installation

### Local Development
```bash
cd submissions/chimoney-ts-sdk
npm install
npm run build
```

### Usage in Your Project
```bash
# After building, you can import from the dist folder
import { createChimoneyClient } from './dist';
```

## Quick Start

```typescript
import { createChimoneyClient } from 'chimoney-ts-sdk';

// Initialize the client
const chimoney = createChimoneyClient({ 
  apiKey: process.env.CHIMONEY_API_KEY!, 
  sandbox: true 
});

// Get available assets
const assets = await chimoney.info.assets();
console.log('Available assets:', assets.data);

// Send airtime
const airtimeResult = await chimoney.payouts.airtime([
  {
    countryToSend: "Nigeria",
    phoneNumber: "+2348123456789",
    valueInUSD: 3
  }
]);
console.log('Airtime sent:', airtimeResult.data);
```

## API Modules

### 1. Info Module
Get information about available services, countries, banks, and currency conversions.

```typescript
// Get available assets (gift cards, etc.)
const assets = await chimoney.info.assets();

// Get countries that support airtime
const countries = await chimoney.info.airtimeCountries();

// Get banks in a specific country
const banks = await chimoney.info.banks('NG'); // Nigeria

// Convert USD to local currency
const conversion = await chimoney.info.usdInLocalAmount('NGN', 10);

// Convert local currency to USD
const usdAmount = await chimoney.info.localAmountInUSD('NGN', 5000);

// Get mobile money codes
const mobileCodes = await chimoney.info.mobileMoneyCodes();
```

### 2. Payouts Module
Send money through various channels.

```typescript
// Send airtime
await chimoney.payouts.airtime([
  {
    countryToSend: "Nigeria",
    phoneNumber: "+2348123456789",
    valueInUSD: 3
  }
]);

// Send bank transfer
await chimoney.payouts.bank([
  {
    countryToSend: "Nigeria",
    account_bank: "044",
    account_number: "0690000031",
    valueInUSD: 10,
    reference: "payment-123"
  }
]);

// Send Chimoney
await chimoney.payouts.chimoney([
  {
    valueInUSD: 5,
    email: "user@example.com",
    twitter: "@username"
  }
]);

// Send mobile money
await chimoney.payouts.mobileMoney([
  {
    countryToSend: "Nigeria",
    phoneNumber: "+2348123456789",
    valueInUSD: 2,
    reference: "momo-123"
  }
]);

// Send gift card
await chimoney.payouts.giftCard([
  {
    email: "user@example.com",
    valueInUSD: 15,
    redeemData: {
      productId: "3",
      countryCode: "NG",
      valueInLocalCurrency: 1000
    }
  }
]);

// Check payout status
const status = await chimoney.payouts.status("chi_ref_123");

// Initiate Chimoney with crypto payments
await chimoney.payouts.initiateChimoney({
  chimoneys: [{ valueInUSD: 5, email: "user@example.com" }],
  turnOffNotification: false,
  crypto_payments: []
});
```

### 3. Wallet Module
Manage wallets and transfers.

```typescript
// List all wallets
const wallets = await chimoney.wallet.list();

// Get wallet details
const walletDetails = await chimoney.wallet.details("wallet_id");

// Transfer between wallets
await chimoney.wallet.transfer({
  receiver: "receiver_id",
  wallet: "wallet_type",
  amount: 10
});
```

### 4. Account Module
Manage account transactions.

```typescript
// Get all transactions
const transactions = await chimoney.account.getAllTransactions();

// Get transactions by issue ID
const issueTransactions = await chimoney.account.getTransactionsByIssueID("issue_123");

// Get specific transaction
const transaction = await chimoney.account.getTransactionByID("transaction_id");

// Transfer from account
await chimoney.account.accountTransfer({
  receiver: "receiver_id",
  amount: 25,
  wallet: "wallet_type"
});

// Delete unpaid transaction
await chimoney.account.deleteUnpaidTransaction("chi_ref_123");
```

### 5. Redeem Module
Redeem various payment types.

```typescript
// Redeem airtime
await chimoney.redeem.airtime({
  chiRef: "chi_ref_123",
  phoneNumber: "+2348123456789",
  countryToSend: "Nigeria"
});

// Redeem gift card
await chimoney.redeem.giftCard({
  chiRef: "chi_ref_123",
  redeemOptions: { productId: "3", countryCode: "NG" }
});

// Redeem mobile money
await chimoney.redeem.mobileMoney({
  chiRef: "chi_ref_123",
  redeemOptions: { phoneNumber: "+2348123456789" }
});

// Redeem any type
await chimoney.redeem.any({
  chiRef: "chi_ref_123",
  redeemData: [{ countryCode: "NG", productId: 1 }]
});

// Redeem Chimoney
await chimoney.redeem.chimoney({
  chimoneys: [{ field: "data" }]
});
```

### 6. Mobile Money Collections Module
Collect mobile money payments.

```typescript
// Get all mobile money transactions
const momoTransactions = await chimoney.mobileMoney.getAllTransactions();

// Make mobile money payment
const payment = await chimoney.mobileMoney.makePayment({
  amount: 1000,
  currency: "NGN",
  phoneNumber: "+2348123456789",
  fullname: "John Doe",
  country: "Nigeria",
  email: "john@example.com",
  txRef: "payment-123"
});

// Verify mobile money payment
const verification = await chimoney.mobileMoney.verifyPayment("payment_id");
```

### 7. SubAccount Module
Manage sub-accounts.

```typescript
// Create sub-account
const newSubAccount = await chimoney.subAccount.create({
  name: "My Sub Account",
  email: "sub@example.com"
});

// Get all sub-accounts
const subAccounts = await chimoney.subAccount.getAll();

// Get sub-account details
const subAccountDetails = await chimoney.subAccount.getDetails("sub_account_id");

// Delete sub-account
await chimoney.subAccount.deleteAccount("sub_account_id");
```

## Configuration

### Environment Variables
Create a `.env` file in your project root:
```env
CHIMONEY_API_KEY=your_api_key_here
```

### Client Options
```typescript
const chimoney = createChimoneyClient({
  apiKey: "your_api_key",           // Required
  sandbox: true,                    // Optional: Use sandbox environment
  baseUrlOverride: "custom_url"     // Optional: Custom API base URL
});
```

## Error Handling

The SDK provides typed errors for better error handling:

```typescript
try {
  const result = await chimoney.payouts.airtime([...]);
} catch (error) {
  if (error instanceof AuthKeyError) {
    console.error('Invalid API key');
  } else if (error instanceof ChiMoneyError) {
    console.error('API error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Available Error Types

- `AuthKeyError` - Invalid or missing API key
- `ValueError` - Invalid input parameters
- `TypeValidationError` - Type validation failures
- `ChiMoneyError` - API-specific errors

## Development

### Build
```bash
npm run build
```

### Run Examples
```bash
# Quick start example
npm run example

# Comprehensive example
node dist/examples/comprehensive.js
```

### Project Structure
```
src/
├── index.ts                 # Main exports
├── internal/
│   ├── client.ts           # Main client factory
│   ├── http.ts             # HTTP client
│   └── errors.ts           # Error classes
├── modules/
│   ├── info/               # Information endpoints
│   ├── payouts/            # Payout operations
│   ├── wallet/             # Wallet management
│   ├── account/            # Account transactions
│   ├── redeem/             # Redemption operations
│   ├── mobile-money/       # Mobile money collections
│   └── sub-account/        # Sub-account management
└── examples/
    ├── quickstart.ts       # Basic usage example
    └── comprehensive.ts    # Full API example
```

## Contributing

This is a community project for Hacktoberfest 2024. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue in this repository
- Check the [Chimoney API documentation](https://chimoney.readme.io/)
- Join the [Chimoney Discord community](https://discord.gg/chimoney)
