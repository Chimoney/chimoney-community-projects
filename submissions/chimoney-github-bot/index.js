const commands = require("probot-commands");
const { payouts } = require("chimoneyjs")();
const {
  findMaintainer,
  addComment,
  getCollaboratorPermissions,
  resolveUsernameToEmail,
  extractPayoutCommandArgs,
} = require("./utils");

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
  } else if (amount < 1 || amount > 10) {
    return await addComment(
      context,
      "Minimum amount is 1 and Maximum amount is 10."
    );
  }

  const commenterUsername = context.payload.sender.login;
  const permissions = await getCollaboratorPermissions(
    context,
    commenterUsername
  );

  const hasPermission = permissions?.admin || permissions?.maintain;

  if (!hasPermission) {
    return await addComment(
      context,
      "You don't have the required permissions to use this command."
    );
  }

  const pullRequestAuthorUsername = context.payload.issue.user.login;
  const recepientUsername = username || pullRequestAuthorUsername;

  const recepientEmail = await resolveUsernameToEmail(
    context,
    recepientUsername
  );

  if (!recepientEmail) {
    return await addComment(context, "Unable to access contributor's email");
  }

  const response = await payouts.initiateChimoney([
    { valueInUSD: amount, email: recepientEmail },
  ]);

  await addComment(
    context,
    `@${commenterUsername} here's the payment link ${response.data.paymentLink}`
  );
}

async function pullRequestClosedHandler(context) {
  const maintainer = await findMaintainer(context);

  if (!maintainer) {
    app.log.warn(context.payload, "No maintainer or admin found");
    return;
  }

  // Notify maintainer that PR has been merged
  const issueComment = context.issue({
    body: `@${maintainer.login} PR merged`,
  });

  await context.octokit.issues.createComment(issueComment);
}
