const router = require("express").Router();
const { Webhook } = require("svix");
const client = require("../bot-client");
const { buildRedeemLink } = require("../utils/helpers");
const secret = process.env.CHIMONEY_WEBHOOK_SIGNATURE;
const { account } = require("chimoneyjs")();
const bodyparser = require("body-parser");

router.post(
  "/",
  bodyparser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const { headers, body } = req;

      const wh = new Webhook(secret);
      let payload;

      // Verify that request is coming from chimoney api
      try {
        payload = wh.verify(body, headers);
      } catch (error) {
        return res.status(400).json({});
      }

      const { eventType, issueID } = payload;

      // Bot should handle any payout handle events i.e payout.chimoney.completed, payout.wallet.completed
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
        `You have successfully sent $${valueInUSD} to <@${discordSender}>`
      );

      const redeemLink = buildRedeemLink(chiRef);

      // Send Redeem Link to discorde receiver
      await client.users.send(
        discordReceiver,
        `You've received ${chimoney} Chimoney ($${valueInUSD}) from <@${discordSender}>. Redeem to bank account, mobile money (momo), airtime, crypto, gift cards or others options.\nRedeem Now:${redeemLink}`
      );

      return res.status(200).json({});
    } catch (error) {
      // This would cause the chiMoney webhook service to retry
      res.status(500).json({ status: "error", error: error.message });
      console.log(error);
    }
  }
);

module.exports = router;
