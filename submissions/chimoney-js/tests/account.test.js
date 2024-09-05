const { ValueError } = require("../Errors");
require("dotenv").config();
const { account } = require("../index")(process.env.TEST_API_KEY);
const transactionId = "1Pv6kmaio7RAEcuKINas";
const issuerId = "f7d68f1f-3637-47a7-8db5-d69091986b27";
const unpaidTransactionChiRef = "bcb71e77-b33d-4fc2-879e-52adb61e65f0";
const receiverId = "qkCUiLgevEhUYbGenSiZgVisjLc2";

describe("Account", () => {
  test("getAllTransactions: should successfully return all transactions on account from Chi Money API", async () => {
    const response = await account.getAllTransactions();

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("getTransactionByID: should successfully return transaction with Id from Chi Money API", async () => {
    const response = await account.getTransactionByID(transactionId);

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("getAccountByIssueID: should successfully return transaction by issueId from Chi Money API", async () => {
    const response = await account.getTransactionsByIssueID(issuerId);

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("deleteUnpaidTransaction: should successfully delete unpaid transaction", async () => {
    const response = await account.deleteUnpaidTransaction(
      unpaidTransactionChiRef
    );

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("accountTransfer: should successfully return transfer transactions on account from Chi Money API", async () => {
    const response = await account.accountTransfer(receiverId, 2, "chi");

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });
});
