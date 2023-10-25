const core = require("@actions/core");
const github = require("@actions/github");
const chimoney = require("chimoneyjs")();

const token = process.env.GITHUB_TOKEN;
const githubRestClient = github.getOctokit(token).rest;

// Entry point
async function main() {
  try {
    // Get input amount
    const { username, amount } = parseInputs(core);

    // Resolve username into an email
    const user = await githubRestClient.users.getByUsername({ username });

    if (!user) {
      throw Error(`Couldn't find a user with username: ${username}`);
    }

    const email = user.data.email;

    // Email must be public to be visible
    if (!email) {
      throw Error(`Email for ${username} is private`);
    }

    const chiResponse = await chimoney.payouts.initiateChimoney([
      { valueInUSD: amount, email },
    ]);

    // Return payment link as output
    core.setOutput("paymentLink", chiResponse.data.paymentLink);
  } catch (error) {
    core.setFailed(error.message);
  }
}

/**
 * Validate and retrieve inputs
 * @param {*} core
 * @returns {{amount: Number, username: String}}
 */
function parseInputs(core) {
  let amount = core.getInput("amount", {
    required: true,
    trimWhitespace: true,
  });

  amount = Number(amount);

  if (isNaN(amount)) {
    throw Error("amount must be a valid number");
  }

  if (amount < 1 || amount > 10) {
    throw Error("amount must be at a minimum of $1 and a maximum of $10");
  }

  const username = core.getInput("username", {
    required: true,
    trimWhitespace: true,
  });

  return { amount, username };
}

main();
