require("dotenv").config();
const Agenda = require("agenda");
const { account } = require("chimoneyjs")();
const { Client, GatewayIntentBits } = require("discord.js");
const {
  getAllTransactions,
  updateTransaction,
} = require("./services/transaction.service");
const { buildReceiverMessage, buildSenderMessage } = require("./utils/helpers");

// Instantiate new bot client
const bot = new Client({ intents: GatewayIntentBits.Guilds });

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI },
});

agenda.define("send-redeem-links", async (job) => {
  // Reset count for number of redeem links set in current job
  let redeemCount = 0;
  try {
    // Get all unredeemed transactions
    const transactions = await getAllTransactions({ isRedeemed: false });

    // Send redeem link for each paid unredeemed transaction
    transactions.forEach(async (transaction) => {
      try {
        // Get transaction from chimoney
        const chimoneyTransaction = await account.getTransactionByID(
          transaction._id
        );

        const { status, meta, chiRef, valueInUSD, chimoney } =
          chimoneyTransaction.data;

        // Check if meta is defined
        if (!meta) return;

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

        // Update transaction in database via api be redeemed
        await updateTransaction(transaction._id, { isRedeemed: true });

        redeemCount++;
      } catch (error) {
        console.log("Error: " + error.message);
      }
    });
    // Log total number redeem links sent in current job execution
    console.log(
      `${redeemCount} redeem links sent @${new Date().toDateString()}`
    );
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

// This fired when the bot starts
bot.once("ready", async () => {
  console.log("bot logged in");

  // Start scheduler
  await agenda.start();

  await agenda.every("3 minutes", "send-redeem-links");
});

// Login bot instance
bot.login(process.env.BOT_TOKEN);
