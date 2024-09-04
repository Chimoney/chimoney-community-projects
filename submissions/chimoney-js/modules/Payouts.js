const Joi = require("joi");
const { ValueError, TypeError } = require("../Errors");
const {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
} = require("../utils/helpers");

/**
 * This function handles the Chi Money airtime API.
 * @param {Array<object>} airtimes An array of object containing the airtime details
 * @example
 *  const airtimes = [
 *  	{
 *			countryToSend: "Nigeria",
 *			phoneNumber: "+2348123456789",
 *			valueInUSD: 3
 *		}
 *	]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function airtime(airtimes = [], subAccount = null) {
  if (!airtimes) throw ValueError("airtimes is required");

  if (!Array.isArray(airtimes))
    throw TypeError("airtimes must be an array of objects");

  const payload = { airtime: airtimes };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/airtime",
  });
}

/**
 * This function handles the bank API
 * @param {Array<object>} banks An array of objects containing the bank details
 * @example
 * const banks = [
 * 		{
 * 			countryToSend: "Nigeria",
 * 			account_bank: "044",
 * 			account_number: "0690000031",
 * 			valueInUSD: 1,
 * 			reference: "1234567890"
 * 		}
 * 	]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from Chi Money API
 */
async function bank(banks = [], subAccount = null) {
  if (!banks) throw new ValueError("banks is required");

  if (!Array.isArray(banks))
    throw new TypeError("banks must be an array of objects");

  const payload = { bank: banks };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/bank",
  });
}

/**
 * This functions handles the chimoney API
 * @param {Array<object>} chimoneys An array of objects containing the chimoney details.
 * @example
 * 	const chimoneys = [
 * 		{
 * 			valueInUSD: 1,
 * 			email: "text@example.com",
 * 			twitter: "@tester"
 * 		}
 * 	]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function chimoney(chimoneys = [], subAccount = null) {
  if (!chimoneys) throw new ValueError("chimoneys is required");

  if (!Array.isArray(chimoneys))
    throw new TypeError("chimoneys must be an array of objects");

  const payload = { chimoneys };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/chimoney",
  });
}

/**
 * This function handles mobile money API
 * @param {Array<object>} momos An array of objects containing the mobile money details
 * @example
 * const momos = [
 * 		{
 * 			countryToSend: "Nigeria",
 * 			phoneNumber: "+2348123456789",
 * 			valueInUSD: 1,
 * 			reference: "1234567890"
 * 		}
 * ]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function mobileMoney(momos = [], subAccount = null) {
  if (!momos) throw new ValueError("momos is required");

  if (!Array.isArray(momos))
    throw new TypeError("momos must be an array of objects");

  const payload = { momo: momos };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/mobile-money",
  });
}

/**
 * This function handles the gift card API
 * @param {Array<object>} giftCards An array of objects containing the gift card details
 * @example
 * const giftCards = [
 * 		{
 * 			email: "test@example.com",
 * 			valueInUSD: 1,
 * 			redeemData: {
 * 				productId: "3",
 * 				countryCode: "NG",
 * 				valueInLocalCurrency: 1000
 * 			}
 * 		}
 * ]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function giftCard(giftCards = [], subAccount = null) {
  if (!giftCards) throw new ValueError("giftCards is required");

  if (!Array.isArray(giftCards))
    throw new TypeError("gitCards must be an array of objects");

  const payload = { gift_card: giftCards };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/gift-card",
  });
}

/**
 * This function handles the status API
 * @param {string} chiRef The Chi Money reference
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function status(chiRef, subAccount = null) {
  if (!chiRef) throw new ValueError("chiRef is required");

  if (typeof chiRef !== "string")
    throw new TypeError("chiRef must be a string");

  const payload = { chiRef };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    path: "/v0.2/payouts/status",
    payload,
  });
}

/**
 * This function handles the initiate chimoney API
 * @param {Array<object>} chimoneys An array of objects containing the chimoney details
 * @example
 * const chimoneys = [
 * 		{
 * 			valueInUSD: 1,
 * 			email: "text@example.com",
 * 			twitter: "@tester"
 * 		}
 * 	]
 * @param {Array<object>} crypto_payments An array of objects containing the crypto payment details
 * @example
 * const crypto_payments = [
 * 		{
 * 			xrpl: {
 * 				address: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
 * 				issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
 * 				currency: "XRP",
 *
 * 			}
 * 		}
 * 	]
 *
 * @param {boolean?} turnOffNotification if true, it turns off email notification
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function initiateChimoney(
  chimoneys = [],
  turnOffNotification = false,
  crypto_payments,
  subAccount = null
) {
  // Define validation schema
  const schema = Joi.object({
    turnOffNotification: Joi.boolean().default(false),
    crypto_payments: Joi.array().optional().default([]),
    chimoneys: Joi.array().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    { turnOffNotification, crypto_payments, chimoneys },
    { abortEarly: false }
  );

  // Handle validation errors
  if (error) throw new ValueError("Invalid input(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payouts/initiate-chimoney",
  });
}

module.exports = {
  mobileMoney,
  airtime,
  initiateChimoney,
  status,
  giftCard,
  chimoney,
  bank,
};
