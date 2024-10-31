A modern, flexible React component library for integrating Chimoney payment functionality. Send payments to multiple recipients via email or phone numbers with a beautiful, responsive interface.
Features

- 🎯 Multi-recipient payment support (email and phone)
- 💱 Multi-currency support (USD, KES, CAD)
- 🎨 Modern UI with Tailwind CSS styling
- 🧪 Test mode for development
- 📱 Fully responsive design
- ⌨️ TypeScript support
- 🔄 Real-time payment type switching

Installation

```
# Using npm

npm install chimoney-react-payment
```

# or using yarn

`yarn add chimoney-react-payment`

Required Imports
Make sure to import both the component and the required styles in your application:
Import the styles (required)

```
import "chimoney-react-components/styles.css";
```

```
// Import the components
import {
ChimoneyPayment,
UserAccountForm,
ChimoneyTransactionList
} from 'chimoney-react-payment';
```

⚠️ Important: The styles.css import is required for proper component styling and functionality.
Quick Start

```
import "chimoney-react-components/styles.css";
import { ChimoneyPayment } from 'chimoney-react-payment';

function App() {
const handlePayment = (paymentData) => {
console.log('Payment Data:', paymentData);
// Handle payment submission
};

return (
<ChimoneyPayment
      onSubmit={handlePayment}
      testMode={false}
      className="max-w-md mx-auto"
    />
);
}
```

# Components

## ChimoneyPayment

The main payment form component with support for multiple recipients and payment types.

## Props

```
interface ChimoneyPaymentProps {
onSubmit: (data: ChimoneyPaymentData) => void;
className?: string;
testMode?: boolean;
}


interface ChimoneyPaymentData {
amount: string;
emails: string[];
paymentType: "email" | "phone";
}
```

# ChimoneyInput

Custom input component used within the payment form.

```
interface ChimoneyInputProps {
type: string;
value: string;
onChange: (e: React.ChangeEvent) => void;
className?: string;
placeholder?: string;
}
```

# ChimoneyButton

Custom button component for form submission.

```
interface ChimoneyButtonProps {
type: "submit" | "button";
className?: string;
buttonName: string;
onClick?: () => void;
}
```

# Usage Examples

Basic transaction list component

# chimoney

```
import { ChimoneyPayment } from 'chimoney-react-payment';

function PaymentForm() {
 const [transactions, setTransactions] = useState([])
 const handlePayment = (paymentData: {
    amount: number;
    currency: string;
    paymentTo: string;
    emails: string;
  }) => {
    // In a real app, you would send this data to your backend
    console.log("Processing payment:", paymentData);
    // For demo purposes, we'll add it to our transactions
    setTransactions([
      ...transactions,
      {
        amount: paymentData.amount,
        currency: paymentData.currency,
        transactionDate: new Date().toISOString().split("T")[0],
        initiator: paymentData.paymentTo,
        receiver: paymentData.emails,
        fee: 0,
        paymentStatus: "",
        deliveryStatus: "",
        ref: "",
      },
    ]);
  };

return (
 <ChimoneyPayment
          onSubmit={handlePayment}
          testMode={false} // Set to false for production
          className="px-6 flex flex-col gap-4"
/>
)
}

export default PaymentForm;
```

Test Mode with Custom Styling

```
import { ChimoneyPayment } from 'chimoney-react-payment';

function TestPaymentForm() {
return (
<ChimoneyPayment
onSubmit={(data) => console.log('Test payment:', data)}
testMode={true}
className="bg-gray-50 p-8"
/>
);
}

interface ChimoneyTransactionListProps {
transactions: ChimoneyTransaction[];
className?: string;
}

interface ChimoneyTransaction {
amount: number;
currency: string;
transactionDate: string;
initiator: string;
receiver: string;
fee: number;
paymentStatus: string;
deliveryStatus: string;
ref: string;
}
```

# Usage Example

## ChimoneyTransactionList

```
import { ChimoneyTransactionList } from 'chimoney-react-payment';

function TransactionHistory() {
const transactions = [
{
amount: 100,
currency: "USD",
transactionDate: "2023-10-26",
initiator: "John Doe",
receiver: "Jane Doe",
fee: 0,
paymentStatus: "Completed",
deliveryStatus: "Delivered",
ref: "1234567890",
},
{
amount: 50,
currency: "KES",
transactionDate: "2023-10-25",
initiator: "Alice Smith",
receiver: "Bob Johnson",
fee: 0,
paymentStatus: "Pending",
deliveryStatus: "Pending",
ref: "9876543210",
},
];

return (
<ChimoneyTransactionList transactions={transactions} className="max-w-md mx-auto" />
);
}

```

User Account Form

```
import { UserAccountForm } from 'chimoney-react-payment';

function AccountPage() {
const handleAccountUpdate = (data) => {
console.log('Account Data:', data);
// Handle account update
};

return (
<UserAccountForm
      onSubmit={handleAccountUpdate}
      className="max-w-md mx-auto"
    />
);
}

```

# Development Prerequisites

- Node.js
- React
- TypeScript
- Tailwind CSS#
- Install Node.js
  https://nodejs.org/en/download/

# Install React

`npm install -g create-react-app`

# Install TypeScript

`npm install -g typescript`

# Install Tailwind CSS

`npm install -D tailwindcss postcss autoprefixer`

# Configuration

1. Create a new React project with TypeScript support:

`npx create-react-app my-chimoney-app --template typescript`

2. Initialize Tailwind CSS:

`npx tailwindcss init -p`

3. Add the following to your `tailwind.config.js` file:

```
module.exports = {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}`
```

4. Add the following to your `postcss.config.js` file:

```
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
}

```

5. Install the Chimoney React components:

`npm install chimoney-react-payment`

6. Import the styles in your `index.css` file:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```

import "chimoney-react-components/styles.css";

```

7. Start the development server:

`npm run dev`

# Building for Production

```

npm run build

```

# Testing

## Running Tests

```
npm test
```

Setup

```
Clone the repository
git clone git@github.com:Benjamin-23/chimoney-community-projects.git
cd chimoney-community-projects/submissions/chimoney-react-components

```

# Install dependencies

` npm install`

# Run development server

`npm run dev`

Contributing
We welcome contributions! Please follow these steps:

# Fork the repository

- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Support

- 📫 Report a bug
- 💬 Request a feature
- 📧 Email: kitongabenja34@gmail.com

Acknowledgments

Built with React and TypeScript
Styled with Tailwind CSS
Inspired by modern payment interfaces

```

```
