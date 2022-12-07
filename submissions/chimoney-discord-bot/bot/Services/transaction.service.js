const { axiosPrivate } = require("../utils/helpers");

const createTransaction = async (payload) => {
  const { discordSender, discordReceiver, transactionId } = payload;

  if (!discordReceiver || !discordSender || !transactionId)
    throw new Error(
      "discordSender, discordReceiver and transactionId are required"
    );

  // Send API request to create new transaction
  const response = await axiosPrivate.post("/transactions", {
    discordReceiver,
    discordSender,
    transactionId,
  });

  const { transaction } = response.data;

  return transaction;
};

module.exports = {
  createTransaction,
};
