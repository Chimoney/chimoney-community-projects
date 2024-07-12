const { ValueError, ChiMoneyError, TypeError } = require("../Errors");
const { redeem } = require("../index")();

describe("Redeem", () => {
  test("airtime: should return throw value error", async () => {
    try {
      await redeem.airtime();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("airtime: should return throw Chi Money error", async () => {
    try {
      await redeem.airtime("testprevious", "test", "test");
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("any: should throw Chi Money Error", async () => {
    try {
      await redeem.any("test", []);
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("any: should throw value error", async () => {
    try {
      await redeem.any();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("chimoney: should throw Chi Money Error", async () => {
    try {
      await redeem.chimoney([]);
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("chimoney: should throw value error", async () => {
    try {
      await redeem.chimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("mobileMoney: should throw Chi Money Error", async () => {
    try {
      await redeem.mobileMoney("testref", {});
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("mobileMoney: should throw value error", async () => {
    try {
      await redeem.mobileMoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("giftCard: should throw Chi Money Error", async () => {
    try {
      await redeem.giftCard("testref", {});
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("mobileMoney: should throw value error", async () => {
    try {
      await redeem.giftCard();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
