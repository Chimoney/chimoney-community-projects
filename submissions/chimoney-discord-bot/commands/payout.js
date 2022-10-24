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
  async execute(interaction, client) {
    // Get amount and user parameters from command option
    const amount = interaction.options.get("amount");
    const beneficiary = interaction.options.get("beneficiary");

    await interaction.reply({
      content: `Check your DM <@${interaction.user.id}>`,
    }); // Ephemeral replies can only be seen by the sender

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

    // Send payment link in a DM to the user
    await client.send(interaction.user.id, {
      content: `Hello, this is a payment link for you. Please pay the amount specified to the address specified. If you have any questions, please contact
      support@chimoney.io.
      [Payment Link](${data.paymentLink})
      ChiRef: ${data.chiRef}`,
    });
  },
};
