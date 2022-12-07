const Transaction = require("../Models/transaction");

const createTransaction = async (payload) => {
  const { discordSender, discordReceiver, transactionId } = payload;

  if (!discordReceiver || !discordSender || !transactionId)
    throw new Error(
      "discordSender, discordReceiver and transactionId are required"
    );

  // Create new transaction
  const transaction = new Transaction({
    discordReceiver,
    discordSender,
    transactionId,
  });

  // Save new transaction
  await transaction.save();

  return transaction;
};

module.exports = {
  createTransaction,
};
