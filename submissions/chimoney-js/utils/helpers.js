require("dotenv").config();
const {
  AuthKeyError,
  ValueError,
  TypeError,
  ChiMoneyError,
} = require("../Errors");
const axios = require("axios");
const Joi = require("joi");

const BASEURL = "https://api.chimoney.io";

const HTTPMETHODS = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
};

/**
 * This function handles requests to the Chi Money API
 * @param {{method: String, path: String, payload: {}, params: {any} }} requestOptions
 * @returns The response from the Chi Money API
 */
const handleRequest = async (requestOptions) => {
  const APIKEY = process.env.CHIMONEY_API_KEY;

  // Define validation schema for requestOptions
  const schema = Joi.object({
    method: Joi.valid(...Object.values(HTTPMETHODS)).default(HTTPMETHODS.GET),
    path: Joi.string().default(""),
    payload: Joi.object().default({}),
    params: Joi.object().default({}),
  });

  try {
    // Check if api key is set
    if (!APIKEY) throw new AuthKeyError("Missing auth key");

    // Validate request options using validation schema
    const { value, error } = schema.validate(requestOptions);

    // Throw error if requestOptions fails validator checks
    if (error)
      throw new TypeError("Invalid type provided", formatJoiErrors(error));

    const { method, path, payload, params } = value;

    // Build url
    const url = BASEURL + path;

    // Set headers for requests
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": APIKEY,
    };

    // Make request
    const response = await axios({
      method,
      url,
      data: payload,
      params,
      headers,
    });

    // On success, send responses
    if ([200, 201].includes(response.status)) return response.data;
  } catch (error) {
    // If server responded with status code that falls out of 2xx
    if (error.response) {
      // Handle Chimoney error
      if (error.response.data.status?.toLowerCase() === "error")
        throw new ChiMoneyError(error.response.data.error);
    }
    // Throw other errors
    throw error;
  }
};

function formatJoiErrors(error) {
  return error.details.reduce((prev, current) => {
    return {
      ...prev,
      [current.path]: current.message,
    };
  }, {});
}
module.exports = {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
};
