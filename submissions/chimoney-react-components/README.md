A modern, flexible React component library for integrating Chimoney payment functionality. Send payments to multiple recipients via email or phone numbers with a beautiful, responsive interface.

Features
🎯 Multi-recipient payment support (email and phone)
💱 Multi-currency support (USD, KES, CAD)
🎨 Modern UI with Tailwind CSS styling
🧪 Test mode for development
📱 Fully responsive design
⌨️ TypeScript support
🔄 Real-time payment type switching

Installation
npm install chimoney-react-payment

# or

yarn add chimoney-react-payment
Required Imports
Make sure to import both the component and the required styles in your application:
Import the styles (required)
import "chimoney-react-components/styles.css";

// Import the component
import { ChimoneyPayment } from 'chimoney-react-payment';
⚠️ Important: The styles.css import is required for proper component styling and functionality.

Quick Start
import "chimoney-react-components/styles.css";
import { ChimoneyPayment, UserAccountForm, ChimoneyTrasactionList } from 'chimoney-react-payment';

function App() {
const handlePayment = (paymentData) => {
console.log('Payment Data:', paymentData);
// Handle payment submission
};

return (
<ChimoneyPayment onSubmit={handlePayment} />
);
}

Components
ChimoneyPayment
The main payment form component with support for multiple recipients and payment types.

Props

ChimoneyPaymentProps {
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
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
className?: string;
placeholder?: string;
}

ChimoneyButton

Custom button component for form submission.
interface ChimoneyButtonProps {
type: "submit" | "button";
className?: string;
buttonName: string;
onClick?: () => void;
}
Usage Examples
Basic Payment Form
{ ChimoneyPayment } from 'chimoney-react-payment';

<!--  usage of payment component -->

function PaymentForm() {
const handlePayment = (paymentData) => {
const { amount, emails, paymentType } = paymentData;
console.log(`Sending ${amount} to ${emails.length} recipients via ${paymentType}`);
// Process payment
};

return (
<ChimoneyPayment onSubmit={handlePayment} />
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
)}

Development
Prerequisites

Node.js
React
TypeScript
Tailwind CSS
