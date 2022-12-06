require("dotenv").config();
const path = require("node:path");
const secret = process.env.CHIMONEY_WEBHOOK_SIGNATURE;

/**
 * This function creates a redeemLink from a chi reference
 * @param {string} chiRef This represents the
 * @returns a redeem
 */
function buildRedeemLink(chiRef) {
  if (!chiRef) throw Error("chiRef is required");

  // Get redeem base url from environment variable
  const baseLink = "https://dash.chimoney.io/redeem";

  // Append chiRef to base redeem url
  const redeemLink = baseLink + `?chi=${chiRef}`;

  return redeemLink;
}

/**
 * This function verifies that a webhook is coming from the ChiMoney server
 * @param {object} body Http request body
 * @param {object} headers Http request headers
 * @returns payload on success and error e.g {payload, error}
 */

/**
 * This function returns the message that is sent to the beneficiary of a discord payout
 * @param {string} chimoney Amount of chimoney received
 * @param {number} valueInUSD Value of funds received in USD
 * @param {string} discordSenderId Discord ID of the funds sender
 * @param {string} chiRef The chiRef of the transaction
 * @returns The message to be sent to the beneficiary
 */
function buildReceiverMessage(chimoney, valueInUSD, discordSenderId, chiRef) {
  const redeemLink = buildRedeemLink(chiRef);

  return `Congrats!!!, You've received ${chimoney} Chimoney ($${valueInUSD}) from <@${discordSenderId}>. Redeem to bank account, mobile money (momo), airtime, crypto, gift cards or others options.\nRedeem Now:${redeemLink}`;
}

/**
 * This function returns the message that is sent to the initiator of a discord payout
 * @param {number} valueInUSD The value paid in USD
 * @param {string} discordSender The discord sender's id
 * @returns The message to be sent to the sender
 */
function buildSenderMessage(valueInUSD, discordReceiver) {
  return `You have successfully sent $${valueInUSD} to <@${discordReceiver}>`;
}
module.exports = {
  buildRedeemLink,
  buildReceiverMessage,
  buildSenderMessage,
};
