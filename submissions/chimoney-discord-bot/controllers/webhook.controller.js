require("dotenv").config();
const client = require("../bot-client");
const { verifyWebhook, buildSenderMessage, buildReceiverMessage } = require("../utils/helpers");
const { account } = require("chimoneyjs")();

// Utility function to handle async requests and errors
function handleAsync(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error("Error in webhook handling:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  };
}

// Main webhook handler
const handleWebhook = handleAsync(async (req, res) => {
  const { payload, error } = verifyWebhook(req.body, req.headers);

  // Return 400 for verification errors
  if (error) return res.status(400).json({ error: "Invalid webhook signature" });

  const { eventType, issueID } = payload;

  // Ignore events that are not "chimoney.payment.completed"
  if (eventType.toLowerCase() !== "chimoney.payment.completed") {
    return res.status(200).json({ message: "Event type ignored" });
  }

  // Fetch transaction details from Chimoney API
  const { data: transactions } = await account.getTransactionsByIssueID(issueID);
  
  if (!transactions || transactions.length === 0) {
    return res.status(404).json({ message: "No transaction found" });
  }

  const { status, meta, valueInUSD, chiRef, chimoney } = transactions[0];

  // Only process completed payments
  if (status !== "paid") return res.status(200).json({ message: "Transaction not paid" });

  // Ensure the transaction was initiated via Discord
  if (!meta.isDiscord) return res.status(200).json({ message: "Non-Discord transaction" });

  const { discordSender, discordReceiver } = meta;

  // Notify Discord sender about payment success
  await client.users.send(
    discordSender,
    buildSenderMessage(valueInUSD, discordReceiver)
  );

  // Send redeem link to Discord receiver
  await client.users.send(
    discordReceiver,
    buildReceiverMessage(chimoney, valueInUSD, discordSender, chiRef)
  );

  return res.status(200).json({ message: "Webhook processed successfully" });
});

module.exports = { handleWebhook };
