const { AuthKeyError, TypeError } = require("./Errors");
const account = require("./modules/Account");
const info = require("./modules/Info");
const payouts = require("./modules/Payouts");
const wallet = require("./modules/Wallet");
const redeem = require("./modules/Redeem");
const mobileMoney = require("./modules/MobileMoney");
const subAccount = require("./modules/SubAccount");

/**
 * This function sets up the chimoneyjs modules using an optional key or options
 * @param {string|Object?} options Chimoney API Key or Options
 * @returns The chimoneyjs Modules
 */
module.exports = function (options) {
  const { apiKey, sandbox } = parseArgs(options);

  if (!apiKey && !process.env.CHIMONEY_API_KEY) {
    throw new AuthKeyError("Missing auth key");
  }

  if (apiKey) {
    process.env.CHIMONEY_API_KEY = apiKey;
  }

  if (sandbox) {
    process.env.CHIMONEY_SDK_MODE = "sandbox";
  }

  // Return modules
  return { account, info, payouts, wallet, subAccount, redeem, mobileMoney };
};

function parseArgs(optionsOrAPIKey) {
  if (typeof optionsOrAPIKey === "string") {
    // args is an API Key
    return { apiKey: optionsOrAPIKey };
  } else if (typeof optionsOrAPIKey === "object") {
    // args represents options i.e { sandbox: Boolean, apiKey: String }
    const sandbox = optionsOrAPIKey.sandbox === true;
    const apiKey = optionsOrAPIKey.apiKey;

    if (apiKey && typeof apiKey !== "string") {
      throw new TypeError("apiKey must be a string");
    }

    return { apiKey, sandbox };
  }

  return {};
}
