const Joi = require("joi");
const { ValueError, TypeError } = require("../Errors");
const {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
} = require("../utils/helpers");

/**
 * This function returns a list of countries that support airtime
 * @returns The response from Chi Money API
 */
async function airtimeCountries() {
  return handleRequest({
    method: HTTPMETHODS.GET,
    path: "/v0.2/info/airtime-countries",
  });
}

/**
 * This function returns a list of supported assets
 * @returns The response from the Chi Money API
 */
async function assets() {
  return handleRequest({
    method: HTTPMETHODS.GET,
    path: "/v0.2/info/assets",
  });
}

/**
 *
 * @param {string} country The country code, default is Nigeria(NG).
 * @returns The response from Chi Money API
 */
async function banks(country = "NG") {
  // country is required
  if (!country) throw new ValueError("country is required");

  // country must be a string
  if (typeof country !== "string")
    throw new TypeError("country must be of type string");

  return handleRequest({
    method: HTTPMETHODS.GET,
    params: { countryCode: country },
    path: "/v0.2/info/country-banks",
  });
}

/**
 * This function returns the equivalent of local currency in USD
 * @param {string} originCurrency The source currency
 * @param {number} amountInOriginCurrency The amount in the origin currency
 * @returns The response from the Chi Money API
 */
async function localAmountInUSD(originCurrency, amountInOriginCurrency) {
  // Define validation schema
  const schema = Joi.object({
    originCurrency: Joi.string().required(),
    amountInOriginCurrency: Joi.number().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    {
      originCurrency,
      amountInOriginCurrency,
    },
    { abortEarly: false }
  );

  // Handle validation errors
  if (error) throw new ValueError("Invalid input(s)", formatJoiErrors(error));

  return handleRequest({
    method: HTTPMETHODS.GET,
    params: { ...value },
    path: "/v0.2/info/local-amount-in-usd",
  });
}

/**
 * This function returns a list of supported mobile money codes
 * @returns The response from the Chi Money API
 */
async function mobileMoneyCodes() {
  return handleRequest({
    method: HTTPMETHODS.GET,
    path: "/v0.2/info/mobile-money-codes",
  });
}

/**
 * This function returns the equivalent of USD in the destination currency.
 * @param {string} destinationCurrency The destination currency
 * @param {number} amountInUSD The amount in USD
 * @returns The response from the Chi Money API
 */
async function usdInLocalAmount(destinationCurrency, amountInUSD) {
  // Define validation schema
  const schema = Joi.object({
    destinationCurrency: Joi.string().required(),
    amountInUSD: Joi.number().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    {
      destinationCurrency,
      amountInUSD,
    },
    { abortEarly: false }
  );

  // Handle validation errors
  if (error) throw new ValueError("Invalid input(s)", formatJoiErrors(error));

  return handleRequest({
    method: HTTPMETHODS.GET,
    params: { ...value },
    path: "/v0.2/info/usd-amount-in-local",
  });
}

module.exports = {
  mobileMoneyCodes,
  usdInLocalAmount,
  localAmountInUSD,
  assets,
  airtimeCountries,
  banks,
};
