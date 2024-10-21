import { useState } from "react";
import {
  ChimoneyPayment,
  TransactionList,
  UserAccountForm,
} from "chimoney-react-components";
import "chimoney-react-components/styles.css";
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
    <div className=" w-screen p-12 ">
      <h1>Chimoney Sample App</h1>

      <h2 className=" text-green-400">Make a Payment</h2>
      <div className="p-4">
        <ChimoneyPayment
          onSubmit={handlePayment}
          testMode={false} // Set to false for production
          className="px-6 flex flex-col gap-4"
        />
      </div>

      <TransactionList
        transactions={transactions}
        className={" w-full flex flex-col"}
      />

      <h2>Update Account</h2>
      <UserAccountForm onSubmit={handleAccountUpdate} className={""} />
    </div>
  );
}

export default App;
