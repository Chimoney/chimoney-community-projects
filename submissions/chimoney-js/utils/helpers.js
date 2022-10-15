require("dotenv").config();
const { default: axios } = require("axios");
const Joi = require("joi");
const APIKEY = process.env.APIKEY;

const BASEURL = "https://api.chimoney.io";

const HTTPMETHODS = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
};

const schema = Joi.object({
  method: Joi.valid(Object.values(HTTPMETHODS)).default(HTTPMETHODS.GET),
  path: Joi.string().default(""),
  payload: Joi.object().default({}),
  params: Joi.object().default({}),
});

/**
 * This function handles requests to the Chi Money API
 * @param {{method: String, path: String, payload: {}, params: {any} }} requestOptions
 * @returns The response from the Chi Money API
 */
const handleRequest = async (requestOptions) => {
  try {
    // Check if api key is set
    if (!APIKEY) throw Error("API key is required");

    // Validate request options
    const { value, error } = schema.validate(requestOptions);

    // Throw error if requestOptions fails validator checks
    if (error) throw Error(error.details);

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

    // Handle Response
    if ([200, 201].includes(response.status)) return response.data;
  } catch (error) {
    // If server responded with status code that falls out of 2xx
    if (error.response) {
      return response.data;
    } else {
      // Throw other errors
      throw error;
    }
  }
};

module.exports = {
  handleRequest,
  HTTPMETHODS,
};
