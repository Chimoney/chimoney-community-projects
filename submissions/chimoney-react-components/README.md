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
npm install chimoney-react-payment

# or using yarn

yarn add chimoney-react-payment
Required Imports
Make sure to import both the component and the required styles in your application:
Import the styles (required)
import "chimoney-react-components/styles.css";

// Import the components
import {
ChimoneyPayment,
UserAccountForm,

```
ChimoneyTransactionList
} from 'chimoney-react-payment';
```

⚠️ Important: The styles.css import is required for proper component styling and functionality.
Quick Start

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
Components
ChimoneyPayment
The main payment form component with support for multiple recipients and payment types.
Props
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
ChimoneyInput
Custom input component used within the payment form.
interface ChimoneyInputProps {
type: string;
value: string;
onChange: (e: React.ChangeEvent) => void;
className?: string;
placeholder?: string;
}

# ChimoneyButton

Custom button component for form submission.
interface ChimoneyButtonProps {
type: "submit" | "button";
className?: string;
buttonName: string;
onClick?: () => void;
}
Usage Examples
Basic Payment Form
import { ChimoneyPayment } from 'chimoney-react-payment';

function PaymentForm() {
const handlePayment = (paymentData) => {
const { amount, emails, paymentType } = paymentData;
console.log(`Sending ${amount} to ${emails.length} recipients via ${paymentType}`);
// Process payment
};

return (
<ChimoneyPayment
      onSubmit={handlePayment}
      className="max-w-lg mx-auto p-4"
    />
);
}
Test Mode with Custom Styling
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
User Account Form
jsxCopyimport { UserAccountForm } from 'chimoney-react-payment';

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
Development
Prerequisites

Node.js
React
TypeScript
Tailwind CSS

Setup
bashCopy# Clone the repository
git clone git@github.com:Benjamin-23/chimoney-community-projects.git

# Install dependencies

npm install

# Run development server

npm run dev

# Build for production

npm run build

# Run tests

npm test
Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Support

📫 Report a bug
💬 Request a feature
📧 Email: kitongabenja34@gmail.com

Acknowledgments

Built with React and TypeScript
Styled with Tailwind CSS
Inspired by modern payment interfaces

```

```
