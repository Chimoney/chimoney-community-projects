import { useState } from "react";
import {
  PaymentForm,
  TransactionList,
  UserAccountForm,
} from "chimoney-react-components";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: 100,
      currency: "USD",
      date: "2/3/2024",
    },
    {
      id: 2,
      amount: 140,
      currency: "USD",
      date: "2/8/2024",
    },
    {
      id: 3,
      amount: 200,
      currency: "USD",
      date: "2/9/2024",
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePayment = (paymentData: { amount: any; currency: any }) => {
    // In a real app, you would send this data to your backend
    console.log("Processing payment:", paymentData);
    // For demo purposes, we'll add it to our transactions
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        amount: paymentData.amount,
        currency: paymentData.currency,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const handleAccountUpdate = (userData: unknown) => {
    // In a real app, you would send this data to your backend
    console.log("Updating user account:", userData);
  };

  return (
    <div className="App">
      <h1>Chimoney Sample App</h1>

      <h2>Make a Payment</h2>
      <PaymentForm
        onSubmit={handlePayment}
        customStyle={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "5px",
        }}
      />

      <h2>Transaction History</h2>
      <TransactionList
        transactions={transactions}
        customStyle={{ listStyle: "none", padding: 0 }}
      />

      <h2>Update Account</h2>
      <UserAccountForm
        onSubmit={handleAccountUpdate}
        customStyle={{
          backgroundColor: "#e0e0e0",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          gap: "10px",
          flex: "column",
        }}
      />
    </div>
  );
}

export default App;
