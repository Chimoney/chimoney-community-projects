const { AuthKeyError, TypeError } = require("./Errors");
const account = require("./modules/Account");
const info = require("./modules/Info");
const payouts = require("./modules/Payouts");
const wallet = require("./modules/Wallet");
const redeem = require("./modules/Redeem");
const mobileMoney = require("./modules/MobileMoney");
const subAccount = require("./modules/SubAccount");

/**
 * This function sets up the chimoneyjs modules using an optional key
 * @param {string?} apiKey Chi Money API key
 * @returns The chimoneyjs Modules
 */
module.exports = function (apiKey) {
  if (apiKey) {
    // apikey must be a string
    if (typeof apiKey !== "string")
      throw new TypeError("apikey must be of type string");

    // Set CHIMONEY_API_KEY environment variable
    process.env.CHIMONEY_API_KEY = apiKey;
  }

  // Return modules
  return { account, info, payouts, wallet, subAccount, redeem, mobileMoney };
};
