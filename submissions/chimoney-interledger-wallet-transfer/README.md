# Chimoney Interledger Wallet Transfer

A Next.js 15 application that enables peer-to-peer wallet transfers using Chimoney's Interledger API. This project demonstrates how to integrate Chimoney's payment infrastructure for seamless cross-wallet money transfers.

## Features

- 💸 **Wallet-to-Wallet Transfers**: Send money to any Interledger wallet address
- 📊 **Transaction History**: View past transactions with status tracking
- ✅ **Transaction Confirmation**: Review transfer details before confirming
- 🔄 **Real-time Status Updates**: Loading, success, and error state handling
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 🔐 **Secure API Handling**: Environment-based API key management
- ✨ **TypeScript**: Full type safety across the application
- 🧪 **Testing**: Comprehensive test coverage with Vitest

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **Testing**: Vitest + Testing Library

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Chimoney API key ([Get it here](https://chimoney.io/developers))

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Chimoney/chimoney-community-projects.git
cd chimoney-community-projects/submissions/chimoney-interledger-wallet-transfer
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Chimoney API key:

```env
CHIMONEY_API_KEY=your_chimoney_api_key_here
NEXT_PUBLIC_API_BASE_URL=/api
```

To get your API key:
1. Visit [Chimoney Developer Portal](https://chimoney.io/developers)
2. Sign up or log in
3. Navigate to API Keys section
4. Copy your API key

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Running Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui
```

## Usage Guide

### Sending a Transfer

1. **Enter Recipient Wallet Address**
   - Must be a valid Interledger payment pointer (starts with `$`) or wallet URL (starts with `https://`)
   - Examples:
     - `$ilp.example.wallet/username`
     - `https://ilp-sandbox.chimoney.com/89800372`

2. **Enter Amount**
   - Specify amount in USD
   - Minimum amount: $0.01

3. **Review and Confirm**
   - Click "Send Money"
   - Review transaction details in confirmation dialog
   - Click "Confirm Transfer" to proceed

4. **View Result**
   - Success: Transaction ID and details displayed
   - Failure: Error message with details

### Viewing Transaction History

The transaction history section displays:
- Recipient wallet addresses
- Transfer amounts
- Transaction status (success, failed, pending)
- Timestamps
- Currency information

## Project Structure

```
chimoney-interledger-wallet-transfer/
├── app/
│   ├── api/
│   │   ├── transfer/          # Transfer API route
│   │   └── transactions/      # Transaction history API route
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Main page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── TransferForm.tsx       # Main transfer form component
│   ├── TransactionHistory.tsx # Transaction history component
│   └── Providers.tsx          # React Query provider
├── lib/
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── __tests__/                 # Test files
│   ├── TransferForm.test.tsx
│   ├── utils.test.ts
│   └── api/
│       └── transfer.test.ts
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest configuration
└── package.json               # Dependencies and scripts
```

## API Integration

### Chimoney Transfer Endpoint

The application uses Chimoney's `/payouts/interledger-wallet-address` endpoint (Sandbox API v2):

```typescript
POST https://api-v2-sandbox.chimoney.io/v0.2.4/payouts/interledger-wallet-address

Headers:
  X-API-KEY: your_api_key
  Content-Type: application/json

Body:
{
  "debitCurrency": "USD",
  "interledgerWallets": [
    {
      "interledgerWalletAddress": "$ilp.example.wallet/username",
      "currency": "USD",
      "amountToDeliver": 50.00,
      "narration": "Payment description"
    }
  ]
}
```

### API Routes

#### POST /api/transfer
Initiates a wallet-to-wallet transfer.

**Request Body:**
```json
{
  "recipientWalletAddress": "$ilp.example.wallet/username",
  "amount": 50.00,
  "currency": "USD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transfer completed successfully",
  "data": {
    "transactionId": "txn_123456",
    "amount": 50.00,
    "recipientWalletAddress": "$ilp.example.wallet/username",
    "status": "success",
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

#### GET /api/transactions
Retrieves transaction history (currently returns mock data).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "txn_001",
      "recipientWalletAddress": "$ilp.example.wallet/alice",
      "amount": 50.00,
      "currency": "USD",
      "status": "success",
      "timestamp": "2025-01-01T12:00:00Z"
    }
  ]
}
```

## Testing

The project includes comprehensive tests:

### Component Tests
- Transfer form rendering and validation
- User interaction flows
- Dialog state management

### API Tests
- Input validation
- Error handling
- API key verification
- Wallet address format validation

### Utility Tests
- Class name merging
- Tailwind CSS conflict resolution

Run tests with:
```bash
npm test
```

## Security Considerations

- API keys are stored in environment variables (never commit `.env.local`)
- API calls are made server-side to protect credentials
- Input validation on both client and server
- Wallet address format validation
- Amount validation (positive numbers only)

## Error Handling

The application handles various error scenarios:

- **Missing API Key**: Returns 500 error with configuration message
- **Invalid Input**: Returns 400 error with validation details
- **Invalid Wallet Format**: Validates payment pointer format
- **Network Errors**: Displays user-friendly error messages
- **API Errors**: Passes through Chimoney API error messages

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Persistent transaction history (database integration)
- [ ] Multiple currency support
- [ ] Transaction search and filtering
- [ ] Email notifications for transfers
- [ ] Webhook integration for real-time updates
- [ ] Rate limiting and fraud detection
- [ ] Integration with Issue #527 (wallet creation)

## Contributing

This project is part of the Chimoney Community Projects initiative. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Resources

- [Chimoney API Documentation](https://chimoney.io/developers)
- [Next.js Documentation](https://nextjs.org/docs)
- [Interledger Protocol](https://interledger.org/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Query Documentation](https://tanstack.com/query/latest)

## License

MIT

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Visit [Chimoney Community Discord](https://discord.gg/chimoney)
- Check [Chimoney Documentation](https://chimoney.io/developers)

---

Built with ❤️ for the Chimoney Community

**Related Issues:**
- Issue #528: Wallet-to-Wallet Transfer (this project)
- Issue #527: Create and Manage Interledger Wallets
