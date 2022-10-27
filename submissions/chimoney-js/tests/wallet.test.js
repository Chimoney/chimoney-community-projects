const { ValueError, ChiMoneyError, TypeError } = require("../Errors");
require("dotenv").config();
const { wallet } = require("../index")();
const testWalletId = "yourtestwalletid"; // Place your test wallet id here
const testReceiver = "yourtestreceiverid"; // Place your test receiver id here

describe("Wallet", () => {
  test("list: should successfully return data from Chi Money API", async () => {
    const response = await wallet.list();
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("details: should successfully return data from Chi Money API", async () => {
    const response = await wallet.details(testWalletId);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("details: should throw value error", async () => {
    try {
      await wallet.details();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("transfer: should successfully transfer funds to receiver using Chi Money API", async () => {
    const response = await wallet.transfer(testReceiver, "chi", 2);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("transfer: should throw value error for invalid inputs", async () => {
    try {
      await wallet.transfer();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
