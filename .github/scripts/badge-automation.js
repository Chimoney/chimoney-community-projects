const { Octokit } = require("@octokit/rest");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const BADGE_MESSAGES = {
  firstTime:
    "🎉 Congratulations on your first contribution! Your PR has been merged, and you've earned the First-Time Contributor Badge! Welcome to the Chimoney open-source community, and we can't wait to see what you'll build next! 🌟",
  everyMerge:
    "🚀 Congratulations! Your PR has been successfully merged, and here's your badge for a fantastic contribution. Keep up the great work, and thank you for being a part of the Chimoney community!",
  fourthMerge:
    "🌟 Outstanding achievement! You've successfully merged four PRs! Thank you for your continued contributions to the Chimoney community—we truly appreciate your dedication!",
};

async function getBadgeInfo(username) {
  const { data: prs } = await octokit.pulls.list({
    owner: process.env.GITHUB_REPOSITORY_OWNER,
    repo: process.env.GITHUB_REPOSITORY.split("/")[1],
    state: "closed",
    head: username,
  });

  const mergedPRs = prs.filter((pr) => pr.merged_at !== null);
  const prCount = mergedPRs.length;

  return {
    firstTime: prCount === 1,
    everyMerge: true && prCount > 1 && prCount < 4,
    fourthMerge: prCount === 4,
    prCount: prCount,
  };
}

async function postGitHubComment(issueNumber, message) {
  await octokit.issues.createComment({
    owner: process.env.GITHUB_REPOSITORY_OWNER,
    repo: process.env.GITHUB_REPOSITORY.split("/")[1],
    issue_number: issueNumber,
    body: message,
  });
}

async function sendEmail(email, message, badgeInfo) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const badgeAttachments = [];
  if (badgeInfo.firstTime) {
    badgeAttachments.push({
      filename: "PR1.png",
      path: path.join(__dirname, "../badges/PR1.png"),
    });
  }
  if (badgeInfo.everyMerge) {
    badgeAttachments.push({
      filename: "every-pr-badge.png",
      path: path.join(__dirname, "../badges/every-pr-badge.png"),
    });
  }
  if (badgeInfo.fourthMerge) {
    badgeAttachments.push({
      filename: "fourth-pr-badge.png",
      path: path.join(__dirname, "../badges/PR4.png"),
    });
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Congratulations on your merged PR!",
    text: message,
    attachments: badgeAttachments,
  });
}

async function getUserEmail(username) {
  try {
    const { data: user } = await octokit.users.getByUsername({ username });
    return user.email;
  } catch (error) {
    console.error(`Error fetching email for ${username}:`, error);
    return null;
  }
}

async function main() {
  const pr = JSON.parse(
    await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8")
  );
  const username = pr.pull_request.user.login;
  const issueNumber = pr.number;

  const badgeInfo = await getBadgeInfo(username);

  let commentMessage = "";
  if (badgeInfo.firstTime) commentMessage += BADGE_MESSAGES.firstTime + "\n\n";
  if (badgeInfo.fourthMerge)
    commentMessage += BADGE_MESSAGES.fourthMerge + "\n\n";
  commentMessage += BADGE_MESSAGES.everyMerge;

  await postGitHubComment(issueNumber, commentMessage);

  const userEmail = await getUserEmail(username);
  if (userEmail) {
    await sendEmail(userEmail, commentMessage, badgeInfo);
  }
}

main().catch(console.error);
