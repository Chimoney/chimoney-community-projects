# Quickstart Guide to Integrate Chimoney API

Welcome to the Chimoney Quickstart Guide! This guide will help you easily integrate the Chimoney API into your applications.

## Step 1: API Key Generation

To start using the Chimoney API, you need to sign up and generate an API key from the developer dashboard:

1. Go to the [Chimoney Developer Dashboard](https://dash.chimoney.io/auth/signin?next=/).
2. Sign up for an account or log in if you already have one.
3. Navigate to the "API Keys" section.
4. Click on "Generate New API Key" and save your key securely.

## Step 2: SDK Installation

Chimoney provides SDKs for popular programming languages to simplify integration. Below are instructions for installing the SDK for Node.js and Python.

### Node.js

To install the Chimoney SDK for Node.js, use npm:

```bash
npm install chimoney-sdk
```

### Python

To install the Chimoney SDK for Python, use pip:

```bash
pip install chimoney-sdk
```

## Step 3: Making a Sample Request

Here’s how to make a basic API call to initiate a payout using the Chimoney SDK.

### Node.js Example

```javascript
const Chimoney = require('chimoney-sdk');

const chimoney = new Chimoney('YOUR_API_KEY');

chimoney.payout({
    amount: 100,
    currency: 'USD',
    recipient: 'recipient@example.com',
})
.then(response => {
    console.log('Payout successful:', response);
})
.catch(error => {
    console.error('Error initiating payout:', error);
});
```

### Python Example

```python
from chimoney import Chimoney

chimoney = Chimoney(api_key='YOUR_API_KEY')

response = chimoney.payout(amount=100, currency='USD', recipient='recipient@example.com')

print('Payout successful:', response)
```

## Step 4: Overview of Key Features

The Chimoney API provides several key functionalities, including:

- **Payouts**: With Chimoney’s API, you can initiate seamless payouts to over 130 countries via bank, mobile money, airtime, or even Interledger-enabled accounts.
- **Multi-Currency Wallets**: Manage balances in multiple currencies, enabling smooth cross-border payments and better control over currency exchanges.
- **Payment Requests**: Request payments from customers or clients, making invoicing and collections easier with a streamlined API integration.
- **Redemption of Value**: Offer users the ability to redeem Chimoney through options such as bank transfers, Mobile Money, gift cards, or airtime.

For more detailed information, please refer to the [API Documentation](https://chimoney.io/developers-api/).

---

## Libraries & Plugins

Chimoney offers pre-written code packages (server-side helper libraries) to make using the API easier! Below are links to some popular SDKs available in the Chimoney community:

- **Python SDK**: [Chimoney-Python](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/Chimoney-Python)
- **PHP-Laravel SDK**: [Chiconnect Laravel Web App](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chiconnect-laravel-web-app)
- **JavaScript (NPM)**: [Chimoney-JS](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chimoney-js)
- **Flutter SDK**: [Chispend Widget](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chispend_widget)

## Use Cases

Here are a few implementations of the Chimoney API built and maintained by our Chimoney Community:

- **Instant Airtime Redemption Page**: [Redeem Airtime](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chimoney-redeem-airtime)
- **Payout using Chimoney Twitter Bot**: [Chisend](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/Chisend)
- **Payout Gift Card**: [Gift Card Payout](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chiconnect-giftcard-payout)
- **Mobile Money Payout**: [Mobile Money Payout](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chiconnect-mobile-money-payout)
- **Bank Payout**: [Bank API Payout](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chiconnect-bank-api-payoutt)
- **Paypaddy**: [Paypaddy](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/pay-paddy)
- **Secret Santa**: [Secret Santa](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/secret-santa)
- **Chimap**: [Chimap](https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/chimap)

For more examples and resources, visit the [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects).

## Author

# I’m Brijesh Thummar, a second-year Computer Science student (Class of 2027) and aspiring Quant Developer. I love coding, solving complex problems, and building innovative software solutions. Let’s connect and create something impactful
