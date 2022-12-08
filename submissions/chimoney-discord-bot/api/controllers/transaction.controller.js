const {
  getAllTransactions,
  getTransactionByID,
  createTransaction,
  editTransaction,
} = require("../services/transaction.service");
const { handleAsync } = require("../utils/helpers");

const handleGetTransactions = handleAsync(async (req, res) => {
  const filter = req.query;

  // Get all matching transactions
  const transactions = await getAllTransactions(filter);

  res.status(200).json({ transactions, success: true });
});

const handleGetTransactionById = handleAsync(async (req, res) => {
  const { transactionId } = req.params;

  // Get transaction from the database
  const transaction = await getTransactionByID(transactionId);

  res.status(200).json({ transaction, success: true });
});

const handleCreateTransaction = handleAsync(async (req, res) => {
  // Create a new transaction
  const transaction = await createTransaction(req.body);

  res.status(200).json({ transaction, success: true });
});

const handleEditTransaction = handleAsync(async (req, res) => {
  const { transactionId } = req.params;

  // Update transaction in the database
  const transaction = await editTransaction(transactionId, req.body);

  res.status(200).json({ transaction, success: true });
});

module.exports = {
  handleCreateTransaction,
  handleEditTransaction,
  handleGetTransactionById,
  handleGetTransactions,
};
