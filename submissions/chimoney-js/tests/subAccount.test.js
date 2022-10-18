const { ValueError } = require("../Errors");
const { subAccount } = require("../index")();
const testEmail = "test@example.com"; // Place your test email here
const testId = "yourtestid"; // Place your test id here
const testDeleteId = "yourdeletetestid"; // Test id of subAccount to be deleted

describe("SubAccount", () => {
  test("create: should successfully create a new subAccount", async () => {
    const response = await subAccount.create("mysub", testEmail);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("create: should throw value error", async () => {
    try {
      await subAccount.create();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("getAll: should successfully return data from Chi Money API", async () => {
    const response = await subAccount.getAll();
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("getDetails: should successfully get details of single subAccount from Chi Money", async () => {
    const response = await subAccount.getDetails(testId);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("getDetails: should throw value error for invalid inputs", async () => {
    try {
      await subAccount.getDetails();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("deleteAccount: should successfully delete SubAccount of single subAccount from Chi Money", async () => {
    const response = await subAccount.deleteAccount(testDeleteId);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });

  test("deleteAccount: should throw value error for invalid inputs", async () => {
    try {
      await subAccount.deleteAccount();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
