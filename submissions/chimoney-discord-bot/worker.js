require("dotenv").config();
const mongoConnectionString = process.env.MONGO_URI;
const Transaction = require("./Models/transaction");
const bot = require("./bot-client");
const { account } = require("chimoneyjs")();
const Agenda = require("agenda");
const { connectDB } = require("./Database");
const { buildReceiverMessage, buildSenderMessage } = require("./utils/helpers");

const agenda = new Agenda({
  db: { address: mongoConnectionString },
});

agenda.define("send-redeem-links", async (job) => {
  try {
    // Get all unpaid transactions
    const transactions = await Transaction.find({ isRedeemed: false });

    transactions.forEach(async (transaction) => {
      // Get transaction from chimoney
      const chimoneyTransaction = await account.getTransactionByID(
        transaction.transactionId
      );

      const { status, meta, chiRef, valueInUSD, chimoney } =
        chimoneyTransaction.data;
      const { isDiscord, discordSender, discordReceiver } = meta;

      // Check if transaction was initiated by discordBot
      if (!isDiscord) return;

      // Check if transaction is paid
      if (status !== "paid") return;

      // Reply to discordSender
      await bot.users.send(
        discordSender,
        buildSenderMessage(valueInUSD, discordReceiver)
      );

      // Send Redeem Link to discord receiver
      await bot.users.send(
        discordReceiver,
        buildReceiverMessage(chimoney, valueInUSD, discordSender, chiRef)
      );

      // Update transaction in database to be redeemed
      await Transaction.findByIdAndUpdate(transaction._id, {
        isRedeemed: true,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
});

// This fired when the bot starts
bot.once("ready", async () => {
  console.log("bot logged in");

  // Connect to database
  await connectDB();

  // Start scheduler
  await agenda.start();

  await agenda.every("3 minutes", "send-redeem-links");
});

// Login bot instance
bot.login(process.env.BOT_TOKEN);
