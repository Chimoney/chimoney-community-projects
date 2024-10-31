require("dotenv").config();
const client = require("../bot-client");
const { verifyWebhook, buildSenderMessage, buildReceiverMessage } = require("../utils/helpers");
const { account } = require("chimoneyjs")();
const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" })
  ]
});

// Utility function to handle async requests and errors
function handleAsync(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      logger.error("Error in webhook handling:", { message: error.message, stack: error.stack });
      return res.status(500).json({ status: "error", error: error.message });
    }
  };
}

// Main webhook handler
const handleWebhook = handleAsync(async (req, res) => {
  // Step 1: Verify the webhook signature
  const { payload, error } = verifyWebhook(req.body, req.headers);
  if (error) return res.status(400).json({ error: "Invalid webhook signature" });

  // Extract event type and issue ID from the payload
  const { eventType, issueID } = payload;

  // Step 2: Ignore unrelated event types
  if (eventType.toLowerCase() !== "chimoney.payment.completed") {
    return res.status(200).json({ message: "Event type ignored" });
  }

  // Step 3: Fetch transaction details using the Chimoney API
  const { data: transactions } = await account.getTransactionsByIssueID(issueID);

  // Return 404 if no transactions are found for the given issueID
  if (!transactions || transactions.length === 0) {
    logger.error("No transaction found", { issueID });
    return res.status(404).json({ message: "No transaction found", issueID });
  }

  const { status, meta, valueInUSD, chiRef, chimoney } = transactions[0];

  // Step 4: Process only completed payments
  if (status !== "paid") return res.status(200).json({ message: "Transaction not paid" });

  // Step 5: Ensure the transaction was initiated via Discord
  if (!meta.isDiscord) return res.status(200).json({ message: "Non-Discord transaction" });

  const { discordSender, discordReceiver } = meta;

  // Step 6: Notify the Discord sender about payment success
  await client.users.send(
    discordSender,
    buildSenderMessage(valueInUSD, discordReceiver)
  );

  // Step 7: Send redeem link to the Discord receiver
  await client.users.send(
    discordReceiver,
    buildReceiverMessage(chimoney, valueInUSD, discordSender, chiRef)
  );

  return res.status(200).json({ message: "Webhook processed successfully" });
});

module.exports = { handleWebhook };

