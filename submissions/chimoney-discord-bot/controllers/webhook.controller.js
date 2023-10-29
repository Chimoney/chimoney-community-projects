require("dotenv").config();
const client = require("../bot-client");
const {
  verifyWebhook,
  buildSenderMessage,
  buildReceiverMessage,
} = require("../utils/helpers");
const { account } = require("chimoneyjs")();

const handleWebhook = handleAsync(async (req, res) => {
  const { payload, error } = verifyWebhook(req.body, req.headers);

  if (error) return res.status(400).json({});

  const { eventType, issueID } = payload;

  // Bot should ignore all events except payment completed
  if (!(eventType.toLowerCase() === "chimoney.payment.completed"))
    return res.status(200).json({});

  // Get transaction from Chi money api
  const response = await account.getTransactionsByIssueID(issueID);

  const { status, meta, valueInUSD, chiRef, chimoney } = response.data[0];

  // If transaction isn't paid respond with 200 to avoid retries
  if (status !== "paid") return res.status(200).json({});

  // Check if transaction was initiated via chimoney discord bot
  if (!meta.isDiscord) return res.status(200).json({});

  const { discordSender, discordReceiver } = meta;

  // Reply to discordSender
  await client.users.send(
    discordSender,
    buildSenderMessage(valueInUSD, discordReceiver)
  );

  // Send Redeem Link to discord receiver
  await client.users.send(
    discordReceiver,
    buildReceiverMessage(chimoney, valueInUSD, discordSender, chiRef)
  );

  return res.status(200).json({});
});

function handleAsync(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      // Handle errors
      res.status(500).json({ status: "error", error: error.message });
      console.log(error);
    }
  };
}

module.exports = { handleWebhook };
