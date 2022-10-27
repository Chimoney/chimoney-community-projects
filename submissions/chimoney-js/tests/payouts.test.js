const { ValueError, ChiMoneyError } = require("../Errors");
require("dotenv").config();
const { payouts } = require("../index")(process.env.TEST_API_KEY);

describe("Payouts", () => {
  test("airtime: should return error from Chi Money", async () => {
    try {
      await payouts.airtime();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("banks: should return error from Chi Money", async () => {
    try {
      await payouts.bank();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("chimoney: should return error from Chi Money", async () => {
    try {
      await payouts.chimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("giftCard: should return error from Chi Money", async () => {
    try {
      await payouts.giftCard();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("mobileMoney: should return error from Chi Money", async () => {
    try {
      await payouts.mobileMoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("intitiateChimoney: should return error from Chi Money", async () => {
    try {
      await payouts.initiateChimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("status: should return error from Chi Money", async () => {
    try {
      await payouts.status();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
