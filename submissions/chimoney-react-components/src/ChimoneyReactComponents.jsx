import React, { Children, useState } from "react";
import { ChimoneyInput } from "./components/chimoneyInput";
import { ChimoneyButton } from "./components/chimoneyButton";
import "./styles/tailwind.css";
import { ChevronDown, ChevronLeft, ChevronRight, Columns } from "lucide-react";
// TransactionList component
export const TransactionList = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

  const [columns, setColumns] = useState([
    { id: "receiver", label: "Receiver", visible: true },
    { id: "amount", label: "Amount", visible: true },
    { id: "currency", label: "Currency", visible: true },
    { id: "debitCredit", label: "Debit/Credit", visible: true },
    { id: "narration", label: "Narration", visible: true },
    { id: "initiator", label: "Initiator", visible: true },
    { id: "fee", label: "Fee", visible: true },
    { id: "paymentStatus", label: "Payment Status", visible: true },
    { id: "deliveryStatus", label: "Delivery Status", visible: true },
    { id: "transactionDate", label: "Transaction Date", visible: true },
    { id: "ref", label: "Ref", visible: true },
  ]);

  const toggleColumn = (columnId) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const toggleAllColumns = (value) => {
    setColumns(columns.map((col) => ({ ...col, visible: value })));
  };
  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent</h2>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              className="px-3 py-2 border rounded flex items-center gap-2 hover:bg-gray-50"
            >
              <Columns className="h-4 w-4" />
              Columns
            </button>

            {isColumnMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Find column"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {columns.map((column) => (
                    <label
                      key={column.id}
                      className="flex items-center px-4 py-2 hover:bg-purple-50 cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => toggleColumn(column.id)}
                          className="w-4 h-4 border-purple-600 text-purple-600 rounded"
                        />
                        <div className="ml-2 text-sm">{column.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="p-2 border-t flex justify-between">
                  <button
                    onClick={() => toggleAllColumns(false)}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Hide all
                  </button>
                  <button
                    onClick={() => toggleAllColumns(true)}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Show all
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50">
            Download Statement
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns
                .filter((col) => col.visible)
                .map((column) => (
                  <th
                    key={column.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    {column.label}
                    {column.id === "transactionDate" && (
                      <ChevronDown className="inline-block ml-1 h-4 w-4" />
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.ref}
                className={`
                  border-t
                  ${
                    transaction.paymentStatus === "paid"
                      ? "bg-pink-50"
                      : "bg-white"
                  }
                  hover:bg-gray-50
                `}
              >
                {columns
                  .filter((col) => col.visible)
                  .map((column) => (
                    <td
                      key={column.id}
                      className="px-4 py-3 text-sm text-gray-900"
                    >
                      {column.id === "debitCredit" ? (
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                      ) : (
                        transaction[column.id]
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">1 row selected</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="text-sm text-gray-700">1-4 of 4</div>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// UserAccountForm component
export const UserAccountForm = ({ onSubmit, className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={` space-y-4 mt-4 flex flex-col justify-center items-centers ${
        className || ""
      }`}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="outline-none  "
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className=" px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Update Account
      </button>
    </form>
  );
};
