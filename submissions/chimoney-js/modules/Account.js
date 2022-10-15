const Joi = require("joi");
const { ValueError, TypeError } = require("../Errors");
const {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
} = require("../utils/helpers");

/**
 * This function gets all transactions by IssueID
 * @param {string} issueId The issueID of the transaction
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function getTransactionsByIssueID(issueId, subAccount = null) {
  if (!issueId) throw new ValueError("issueId is required");

  if (typeof issueId !== "string")
    throw new TypeError("issueId must be a string");

  const payload = {};
  const params = { issueId };

  if (subAccount) payload.subAccount = subAccount;

  return await handleRequest({
    method: HTTPMETHODS.POST,
    path: "/v0.2/accounts/issue-id-transactions",
    params,
    payload,
  });
}

/**
 * This functions returns a list of transactions by account
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function getAllTransactions(subAccount = null) {
  const payload = {};

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    path: "/v0.2/accounts/transactions",
    payload,
  });
}

/**
 * This transaction transfers funds from wallet to receiver
 * @param {string} receiver - The receiver of the funds
 * @param {number} amount - The amount of funds
 * @param {string} wallet - The wallet to be transfered from
 * @param {string?} subAccount - The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function accountTransfer(receiver, amount, wallet, subAccount = null) {
  // Define validation schema for input
  const schema = Joi.object({
    receiver: Joi.string().required(),
    wallet: Joi.string().required(),
    amount: Joi.number().required(),
  });

  const { value, error } = schema.validate(
    { receiver, amount, wallet },
    { abortEarly: false }
  );

  // Handle error
  if (error)
    throw new ValueError(
      "Invalid or missing function argument(s)",
      formatJoiErrors(error)
    );

  const payload = { ...value };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/accounts/transfer",
  });
}

/**
 * This function deletes an unpaid transaction
 * @param {string} transactionId The ID of the transaction
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the ChiMoney API
 */
async function deleteUnpaidTransaction(transactionId, subAccount = null) {
  if (!transactionId) throw new ValueError("transactionId is required");

  if (typeof transactionId !== "string")
    throw new TypeError("transactionId must be a string");

  const payload = {};
  const params = { id: transactionId };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.DELETE,
    params,
    payload,
    path: "/v0.2/accounts/delete-unpaid-transaction",
  });
}

/**
 * This function gets a transaction by ID
 * @param {string} transctionId The ID of the transaction
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function getTransactionByID(transctionId, subAccount = null) {
  if (!transctionId) throw new ValueError("transactionId is required");

  if (typeof transctionId !== "string")
    throw new TypeError("transactionId must be a string");

  const payload = {};
  const params = { id: transctionId };

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    path: "/v0.2/accounts/transaction",
    params,
    payload,
  });
}

module.exports = {
  getAllTransactions,
  getTransactionsByIssueID,
  accountTransfer,
  deleteUnpaidTransaction,
  getTransactionByID,
};
