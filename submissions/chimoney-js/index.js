const { AuthKeyError, TypeError } = require("./Errors");
const account = require("./modules/Account");
const info = require("./modules/Info");
const payouts = require("./modules/Payouts");

module.exports = function (apiKey) {
  // apikey must exist
  if (!apiKey) throw new AuthKeyError("apikey is required");

  // apikey must be a string
  if (typeof apiKey !== "string")
    throw new TypeError("apikey must be of type string");

  // Set CHIMONEY_API_KEY environment variable
  process.env.CHIMONEY_API_KEY = apiKey;

  // Return modules
  return { account, info, payouts };
};
