const { axiosPrivate } = require("../utils/helpers");
const Joi = require("joi");

const getAllTransactions = async (filter) => {
  // Define validation schema for filter
  const schema = Joi.object({
    discordSender: Joi.string(),
    discordReceiver: Joi.string(),
    isRedeemed: Joi.boolean(),
  });

  // Validate filter against schema
  const { error } = schema.validate(filter);

  if (error) throw new Error("Invalid filters provided");

  // Get all transactions that match filters for api
  const response = await axiosPrivate.get("/transactions", {
    params: { ...filter },
  });

  const { transactions } = response.data;

  return transactions;
};

const updateTransaction = async (transactionId, { isRedeemed }) => {
  // Validate inputs
  if (!transactionId || !isRedeemed)
    throw new Error("transactionId and isRedeemd are required");

  // Get all transactions that match filters for api
  const response = await axiosPrivate.patch(`/transactions/${transactionId}`, {
    isRedeemed,
  });

  const { transaction } = response.data;

  return transaction;
};

module.exports = {
  getAllTransactions,
  updateTransaction,
};
