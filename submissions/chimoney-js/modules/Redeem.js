const Joi = require("joi");
const { ValueError, TypeError } = require("../Errors");
const {
  formatJoiErrors,
  handleRequest,
  HTTPMETHODS,
} = require("../utils/helpers");

/**
 * This function allows you to redeem airtime transactions
 * @param {string} chiRef The Chi reference
 * @param {string} phoneNumber Phone number
 * @param {string} countryToSend Country to send to
 * @param {object?} meta Any data to be sent along the request
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function airtime(
  chiRef,
  phoneNumber,
  countryToSend,
  meta,
  subAccount = null
) {
  // Define validation schema
  const schema = Joi.object({
    chiRef: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    countryToSend: Joi.string().required(),
    meta: Joi.object().default({}),
  });

  // Validate input
  const { value, error } = schema.validate(
    { chiRef, phoneNumber, countryToSend, meta },
    { abortEarly: false }
  );

  if (error) throw new ValueError("invalid input(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/redeem/airtime",
  });
}

/**
 * This function allows you to redeem any transaction (chimoney, momo, airtime)
 * @param {string} chiRef The Chi reference
 * @param {array<object>} redeemData Any array of objects containing data needed to redeem the transaction. see example below
 * @example
 * const redeemData = [
 * 		{
 * 			countryCode: "NG",
 * 			productId: 1,
 * 			valueInLocalCurrency: 1000
 * 		}
 * ]
 * @param {object} [meta={}] Any data to be sent along with the request. defaults to an empty object
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function any(chiRef, redeemData, meta, subAccount = null) {
  // Define validation schema
  const schema = Joi.object({
    chiRef: Joi.string().required(),
    redeemData: Joi.array().required(),
    meta: Joi.object().default({}),
  });

  // Validate input
  const { value, error } = schema.validate(
    { chiRef, redeemData, meta },
    { abortEarly: false }
  );

  if (error) throw new ValueError("input error(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/redeem/any",
  });
}
/**
 * This function allows you to redeem chimoney
 * @param {array<object>} chimoneys An array of objects containing the redeem details
 * @example
 * const chimoneys = [
 * 		{
 * 			"field": "data"
 * 		}
 * ]
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function chimoney(chimoneys, subAccount = null) {
  if (!chimoneys) throw new ValueError("chimoneys is required");

  if (!Array.isArray(chimoneys))
    throw new TypeError("chimoneys must be an array of objects");

  const payload = { chimoneys };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/redeem/chimoney",
  });
}

/**
 * This function allows you to redeem giftcard
 * @param {string} chiRef The Chi reference
 * @param {object} redeemOptions The data needed to redeem the transaction
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function giftCard(chiRef, redeemOptions, subAccount = null) {
  // Define validation schema
  const schema = Joi.object({
    chiRef: Joi.string().required(),
    redeemOptions: Joi.object().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    { chiRef, redeemOptions },
    { abortEarly: false }
  );

  if (error) throw new ValueError("input error(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/redeem/gift-card",
  });
}

/**
 * This function allows you to redeem mobile money (momo)
 * @param {string} chiRef The Chi reference
 * @param {object} redeemOptions The data needed to redeem the transaction
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function mobileMoney(chiRef, redeemOptions, subAccount = null) {
  // Define validation schema
  const schema = Joi.object({
    chiRef: Joi.string().required(),
    redeemOptions: Joi.object().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    { chiRef, redeemOptions },
    { abortEarly: false }
  );

  if (error) throw new ValueError("input error(s)", formatJoiErrors(error));

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/redeem/mobile-money",
  });
}

module.exports = {
  airtime,
  mobileMoney,
  giftCard,
  any,
  chimoney,
};
