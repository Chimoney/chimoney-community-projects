const { ValueError, TypeError } = require("../Errors");
const {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
} = require("../utils/helpers");
const Joi = require("joi");

/**
 * This function returns an array of all mobile money(momo) transactions
 * @param {string} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function getAllTransactions(subAccount = null) {
  const payload = {};

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/collections/mobile-money/all",
  });
}

/**
 * This function enables a user to make payment with mobile money (momo)
 * @param {{amount:number, currency:string, phone_number:string, fullname:string, country:string, tx_ref:string}} paymentDetails An object with the appropriate payment details
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function makePayment(paymentDetails, subAccount = null) {
  // Define validation schema
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    phone_number: Joi.string().required(),
    fullname: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().required(),
    tx_ref: Joi.string().required(),
  }).exist();

  // Validate input
  const { value, error } = schema.validate(paymentDetails, {
    abortEarly: false,
  });

  if (error) throw new ValueError("invalid input(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/collections/mobile-money/collect",
  });
}

/**
 * This function enables the user to verify mobile money payments
 * @param {string} id The transaction id
 * @param {string} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function verifyPayment(id, subAccount = null) {
  if (!id) throw new ValueError("id is required");

  if (typeof id !== "string") throw new TypeError("id must be of type string");

  const payload = { id };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/collections/mobile-money/verify",
  });
}

module.exports = {
  getAllTransactions,
  makePayment,
  verifyPayment,
};
