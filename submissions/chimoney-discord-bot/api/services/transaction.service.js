const { default: mongoose } = require("mongoose");
const Transaction = require("../Models/transaction");
const { createApiError } = require("../utils/helpers");
const Joi = require("joi");

const createTransaction = async (payload) => {
  const { discordSender, discordReceiver, transactionId } = payload;

  if (!discordReceiver || !discordSender || !transactionId)
    throw createApiError(
      "discordSender, discordReceiver and transactionId are required",
      400
    );

  // Create new transaction
  const transaction = new Transaction({
    discordReceiver,
    discordSender,
    _id: transactionId,
  });

  // Save new transaction
  await transaction.save();

  return transaction;
};

const editTransaction = async (id, payload) => {
  // Validate id was provided
  if (!id) throw createApiError("A valid id is required", 400);

  const { isRedeemed } = payload;

  // Validate input
  if (typeof isRedeemed !== "boolean")
    throw createApiError("isRedeemed is required and must be a boolen", 400);

  // Find and update transaction from database
  const transaction = await Transaction.findByIdAndUpdate(
    id,
    { isRedeemed },
    { new: true }
  );

  // Transaction not found
  if (!transaction) throw createApiError(`Transaction with id:${id}`, 404);

  return transaction;
};

const getAllTransactions = async (filter) => {
  // Define validation schema
  const schema = Joi.object({
    discordSender: Joi.string(),
    discordReceiver: Joi.string(),
    isRedeemed: Joi.boolean(),
  });

  // Validate input via schema
  const { error } = schema.validate(filter);

  if (error) throw createApiError(error.message, 400);

  // Find transactions using filter
  const transactions = await Transaction.find(filter);

  return transactions;
};

const getTransactionByID = async (id) => {
  // Validate id was provided
  if (!id) throw createApiError("A valid id is required", 400);

  // Get transaction from database
  const transaction = await Transaction.findById(id);

  // Transaction not found
  if (!transaction) throw createApiError(`Transaction with id:${id}`, 404);

  return transaction;
};

module.exports = {
  createTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionByID,
};
