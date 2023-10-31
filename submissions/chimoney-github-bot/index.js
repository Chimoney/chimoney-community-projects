const commands = require("probot-commands");
const { payouts } = require("chimoneyjs")();
const {
  findMaintainer,
  addComment,
  getCollaboratorPermissions,
  resolveUsernameToEmail,
  extractPayoutCommandArgs,
} = require("./utils");
const MIN_PAYOUT = 1;
const MAX_PAYOUT = 100;

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here

  app.on("pull_request.closed", pullRequestClosedHandler);

  commands(app, "payout", payoutCommandHandler);
};

async function payoutCommandHandler(context, command) {
  const { amount, username } = extractPayoutCommandArgs(command.arguments);

  // Invalid amount
  if (isNaN(amount)) {
    return await addComment(
      context,
      "Please provide a valid amount. Usage: /payout $10"
    );
  }

  // Amount out of range
  if (amount < MIN_PAYOUT || amount > MAX_PAYOUT) {
    return await addComment(
      context,
      `Please enter an amount between ${MIN_PAYOUT} and ${MAX_PAYOUT}.`
    );
  }

  const commenterUsername = context.payload.sender.login;
  const permissions = await getCollaboratorPermissions(
    context,
    commenterUsername
  );

  const isAdminOrMaintainer = permissions?.admin || permissions?.maintain;

  if (!isAdminOrMaintainer) {
    return await addComment(
      context,
      "You don't have the required permissions to use this command."
    );
  }

  // Contributor is pull request author
  const contributor = context.payload.issue.user.login;
  const recepientUsername = username || contributor;

  const recepientEmail = await resolveUsernameToEmail(
    context,
    recepientUsername
  );

  if (!recepientEmail) {
    return await addComment(context, "Unable to retrieve contributor's email");
  }

  const response = await payouts.initiateChimoney([
    { valueInUSD: amount, email: recepientEmail },
  ]);

  const message = `@${commenterUsername}, you have initiated a reward payment of $${amount} using the\
Chimoney GitHub bot.\nPlease, click on the payment link to complete the Payment using Chimoney. ${response.data.paymentLink}`;

  await addComment(context, message);
}

async function pullRequestClosedHandler(context) {
  const maintainer = await findMaintainer(context);

  if (!maintainer) {
    app.log.warn(context.payload, "No maintainer or admin found.");
    return;
  }

  const contributor = context.payload.issue.user.login;

  // Notify maintainer that PR has been merged
  const issueComment = context.issue({
    body: `@${maintainer.login}, PR merged. Please send a chimoney.io reward to @${contributor}`,
  });

  await context.octokit.issues.createComment(issueComment);
}
