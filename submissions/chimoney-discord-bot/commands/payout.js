require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { payouts } = require("chimoneyjs")();

module.exports = {
  // Create new discord slash command for bot i.e /payout
  data: new SlashCommandBuilder()
    .setName("payout")
    .setDescription("Lets you send $x to @user")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to send in dollars ($)")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("beneficiary")
        .setDescription("Receiver of the funds")
        .setRequired(true)
    )
    .setDMPermission(true),

  // Code to execute when command is initiated
  async execute(interaction) {
    // Get amount and user parameters from command option
    const amount = interaction.options.get("amount");
    const beneficiary = interaction.options.get("beneficiary");

    // Discord interaction are only valid for a few seconds, longer tasks require you to deferReply
    await interaction.deferReply({ ephemeral: true }); // Ephemeral replies can only be seen by the sender

    // Metadata to be sent in payload
    const meta = {
      discordSender: interaction.user.id,
      discordReceiver: beneficiary.user.id,
    };

    // Get payment link from chimoney API
    const { data } = await payouts.initiateChimoney(
      [
        {
          email: process.env.CHIMONEY_BOT_EMAIL,
          valueInUSD: amount.value,
          meta,
        },
      ],
      true
    );

    // Send link to the sender
    await interaction.editReply({
      content: `To complete this transaction click [here](${data.paymentLink}) `,
    });
  },
};
