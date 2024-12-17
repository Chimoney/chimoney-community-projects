require('dotenv').config();
const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const { setUserPendingAction } = require('./saver');
const { newMessage, getUserData } = require('./main');
const { chiPayment } = require('./webhook/chiPayment');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const user = getUserData(message.author.id);
    const msgData = {
        chat_id: message.author.id,
        msgId: message.id,
        msgFromId: message.author.id,
        msgFromFirstName: message.author.username || '',
        msgType: message.channel.type,
        canSendImage: "true",
        canSendText: "true",
        canSendButton: "true",
        platformType: "Discord",
    };

    if (user && user.pendingAction) {

        const data = fs.readFileSync('pendingAction.json', 'utf8');
        const actionList = JSON.parse(data);
        const userNameAction = actionList.find(item => item.name === user.pendingAction);

        if (userNameAction) {
            const new_type = userNameAction.action;

            const response = await newMessage({
                type: new_type,
                ...msgData,
                msgText: message.content,
                datetime: new Date(),
            });

            if (response && response.message) {
                if (response.sendButton) {
                    sendMsgButton(message.channel, response);
                } else {
                    message.channel.send(response.message);
                }
            }
        } else {
            console.log('Action not found.');
            message.channel.send("An error occurred, please try again later.");
        }
    } else {

        const response = await newMessage({
            type: 'message',
            ...msgData,
            msgText: message.content,
            datetime: new Date(),
        });
        
        if (response.sendButton) {
            sendMsgButton(message.channel, response);
        } else if (response.message) {
            message.channel.send(response.message);
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const action = interaction.customId;
    const msgData = {
        chat_id: interaction.user.id,
        msgFromId: interaction.user.id,
        msgFromFirstName: interaction.user.username || '',
        msgType: interaction.channel.type,
        canSendImage: "true",
        canSendText: "true",
        canSendButton: "true",
        platformType: "Discord",
    };

    if (action === 'accept_tos') {
        const response = await newMessage({ type: 'accept_toc', ...msgData, datetime: new Date() });
        if (response.message) {
            if (response.sendButton) {
                sendMsgButton(interaction.channel, response);
            } else {
                interaction.reply(response.message);
            }
        }
    } else if (action === 'fund_wallet') {
        const response = await newMessage({ type: 'fund_wallet', ...msgData, datetime: new Date() });
        if (response.message) {
            if (response.sendButton) {
                sendMsgButton(interaction.channel, response);
            } else {
                interaction.reply(response.message);
            }
        }
    } else if (action === 'send_fund') {
        const response = await newMessage({ type: 'send_fund', ...msgData, datetime: new Date() });
        if (response.message) {
            if (response.sendButton) {
                sendMsgButton(interaction.channel, response);
            } else {
                interaction.reply(response.message);
            }
        }
    }
});

function sendMsgButton(channel, response) {
    const buttons = response.buttons.map((btn) => {
        if (btn.type === 'url') {
            return new ButtonBuilder()
                .setLabel(btn.caption)
                .setURL(btn.body)
                .setStyle(ButtonStyle.Link);
        } else if (btn.type === 'callback') {
            return new ButtonBuilder()
                .setLabel(btn.caption)
                .setCustomId(btn.action_name)
                .setStyle(ButtonStyle.Primary);
        }
        return null;
    }).filter(Boolean);

    const row = new ActionRowBuilder().addComponents(buttons);

    channel.send({
        content: response.title,
        components: [row]
    });
}

async function processWebhook() {
    const sendClient = client;
    const [userId, msg, platform] = await chiPayment(sendClient);
    if (platform === "Discord") {
        await sendClient.users.fetch(userId).then(user => user.send(msg));
    }
}
processWebhook();
client.login(process.env.DISCORD_BOT_TOKEN);
