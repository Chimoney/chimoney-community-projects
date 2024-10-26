import { useState } from "react";
import {
  ChimoneyPayment,
  ChimoneyTransactionList,
  UserAccountForm,
} from "chimoney-react-components";
import "chimoney-react-components/styles.css";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    {
      receiver: "kitongabenj343@gmail.com",
      amount: 50.0,
      currency: "USD",
      initiator: "Benjamin Kitonga",
      fee: 1,
      paymentStatus: "redeemed",
      deliveryStatus: "-",
      transactionDate: "10/25/2024, 08:04:02 AM",
      ref: "0831d653-3489-4db9-9bc2-dcd393478f5a",
    },
    {
      receiver: "+254799381115",
      amount: 100.0,
      currency: "USD",
      initiator: "Benjamin Kitonga",
      fee: 1,
      paymentStatus: "paid",
      deliveryStatus: "-",
      transactionDate: "10/25/2024, 07:58:08 AM",
      ref: "1250eaad-fcb2-4c26-9fc2-34958929929",
    },
    {
      receiver: "+254799381115",
      amount: 100.0,
      currency: "USD",
      initiator: "Benjamin Kitonga",
      fee: 1,
      paymentStatus: "redeemed",
      deliveryStatus: "success",
      transactionDate: "10/25/2024, 07:42:26 AM",
      ref: "6ef83423-6039-43a0-aebd-d1eb282754e",
    },
    {
      receiver: "kitongabenj343@gmail.com",
      amount: 100.0,
      currency: "USD",
      initiator: "Benjamin Kitonga",
      fee: 1,
      paymentStatus: "redeemed",
      deliveryStatus: "success",
      transactionDate: "10/25/2024, 07:35:56 AM",
      ref: "86695f04-6757-49d1-ab42-7859f3b0f378a",
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleAccountUpdate = (userData: unknown) => {
    // In a real app, you would send this data to your backend
    console.log("Updating user account:", userData);
  };

  return (
    <div className=" w-screen p-12 ">
      <div className="p-4">
        <ChimoneyPayment
          onSubmit={handlePayment}
          testMode={false} // Set to false for production
          className="px-6 flex flex-col gap-4"
        />
      </div>

      <ChimoneyTransactionList transactions={transactions} />
      <h2>Update Account</h2>
      <UserAccountForm onSubmit={handleAccountUpdate} className={""} />
    </div>
  );
}

export default App;
