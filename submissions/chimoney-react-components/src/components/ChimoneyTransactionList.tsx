import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns,
  ChevronUp,
  X,
} from "lucide-react";

import React, { useState } from "react";
// TransactionList component
export const ChimoneyTransactionList = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
  const TransactionModal = ({ transaction, onClose }) => {
    const [isRawDataOpen, setIsRawDataOpen] = useState(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md mx-4">
          <div className="p-6 space-y-4">
            <button
              onClick={onClose}
              className="w-full py-2 text-center border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
            >
              Close
            </button>

            <div className="text-2xl font-bold">
              ${transaction.amount.toFixed(2)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Receiver:</span>
                <span className="font-medium">{transaction.receiver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date Initiated:</span>
                <span className="font-medium">
                  {transaction.transactionDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium">{transaction.paymentStatus}</span>
              </div>
              {transaction.redeemUrl && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Redeem URL:</span>
                  <span className="font-medium break-all">
                    {transaction.redeemUrl}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsRawDataOpen(!isRawDataOpen)}
              className="w-full py-2 text-center border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
            >
              Download Receipt
            </button>

            <div className="border rounded-lg">
              <button
                onClick={() => setIsRawDataOpen(!isRawDataOpen)}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium">Raw Data</span>
                {isRawDataOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {isRawDataOpen && (
                <div className="p-4 border-t bg-gray-50">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(transaction, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.ref}
                onClick={() => setSelectedTransaction(transaction)}
                className={`
                  border-t cursor-pointer
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

      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};
