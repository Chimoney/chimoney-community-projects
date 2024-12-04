require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { setUserPendingAction } = require('./saver');
const { newMessage, getUserData } = require('./main');
const { message } = require('telegraf/filters');
const fs = require('fs');
const { chiPayment } = require('./webhook/chiPayment');

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log("Logged in to telegram bot!")
bot.start((ctx) => ctx.reply('Welcome'));

bot.on(message('text'), async (ctx) => {
  const msg = ctx.message;
  const chatId = msg.chat.id;
  const user = getUserData(chatId);


  if (user && user.pendingAction) {

    const data = fs.readFileSync('pendingAction.json', 'utf8');

    const actionList = JSON.parse(data);

    const userNameAction = actionList.find(item => item.name === user.pendingAction);

    if (userNameAction) {
      var new_type = userNameAction.action;


      const response = await newMessage({
        type: new_type,
        chat_id: chatId,
        msgText: msg.text,
        datetime: new Date(),
        msgId: msg.message_id,
        msgFromId: msg.from.id,
        msgFromFirstName: msg.from.first_name || '',
        msgFromLastName: msg.from.last_name || '',
        msgFromUsername: msg.from.username || '',
        msgType: msg.chat.type,
        canSendImage: "true",
        canSendText: "true",
        canSendButton: "true",
        platformType: "Telegram",
      });

      if (response && response.message) {
        if (response && response.sendButton) {
          sendMsgButton(ctx, response);
        }

        else if (response && response.message) {
          ctx.reply(response.message);
        }
      }

    } else {
      console.log('Action not found.');
      ctx.reply("An error occured pls try again later");

    }

  }
  else {

    const messageData = {
      body: msg.text,
      type: 'message',
      datetime: new Date(),
      chat_id: msg.chat.id,
      msgId: msg.message_id,
      msgFromId: msg.from.id,
      msgFromFirstName: msg.from.first_name || '',
      msgFromLastName: msg.from.last_name || '',
      msgFromUsername: msg.from.username || '',
      msgType: msg.chat.type,
      msgText: msg.text,
      canSendImage: "true",
      canSendText: "true",
      canSendButton: "true",
      platformType: "Telegram",
    };


    const response = await newMessage(messageData);

    if (response && response.sendButton) {
      sendMsgButton(ctx, response);
    }

    else if (response && response.message) {
      ctx.reply(response.message);
    }

  }
});







bot.action('accept_tos', async (ctx) => {

  const messageData = {
    type: 'accept_toc',
    chat_id: ctx.chat.id,
    datetime: new Date(),
    msgId: msg.message_id,
    msgFromId: msg.from.id,
    msgFromFirstName: msg.from.first_name || '',
    msgFromLastName: msg.from.last_name || '',
    msgFromUsername: msg.from.username || '',
    msgType: msg.chat.type,
    canSendImage: "true",
    canSendText: "true",
    canSendButton: "true",
    platformType: "Telegram",
  };

  const response = await newMessage(messageData);

  if (response && response.message) {
    if (response && response.sendButton) {
      sendMsgButton(ctx, response);
    }

    else if (response && response.message) {
      ctx.reply(response.message);
    }
  }

});

bot.action('fund_wallet', async (ctx) => {
  const messageData = {
    type: 'fund_wallet',
    chat_id: ctx.chat.id,
    datetime: new Date(),
    msgId: msg.message_id,
    msgFromId: msg.from.id,
    msgFromFirstName: msg.from.first_name || '',
    msgFromLastName: msg.from.last_name || '',
    msgFromUsername: msg.from.username || '',
    msgType: msg.chat.type,
    canSendImage: "true",
    canSendText: "true",
    canSendButton: "true",
    platformType: "Telegram",
  };

  const response = await newMessage(messageData);
  if (response && response.message) {
    if (response && response.sendButton) {
      sendMsgButton(ctx, response);
    }

    else if (response && response.message) {
      ctx.reply(response.message);
    }
  }
});


bot.action('send_fund', async (ctx) => {
  const messageData = {
    type: 'send_fund',
    chat_id: ctx.chat.id,
    datetime: new Date(),
    msgId: msg.message_id,
    msgFromId: msg.from.id,
    msgFromFirstName: msg.from.first_name || '',
    msgFromLastName: msg.from.last_name || '',
    msgFromUsername: msg.from.username || '',
    msgType: msg.chat.type,
    canSendImage: "true",
    canSendText: "true",
    canSendButton: "true",
    platformType: "Telegram",
  };

  const response = await newMessage(messageData);
  if (response && response.message) {
    if (response && response.sendButton) {
      sendMsgButton(ctx, response);
    }

    else if (response && response.message) {
      ctx.reply(response.message);
    }
  }
});


function sendMsgButton(ctx, response) {
  const buttons = response.buttons.map((btn) => {
    if (btn.type === 'url') {
      return Markup.button.url(btn.caption, btn.body);
    } else if (btn.type === 'callback') {
      return Markup.button.callback(btn.caption, btn.action_name);
    }
    return [];
  });

  ctx.reply(
    response.title,
    Markup.inlineKeyboard(buttons)
  );
}


async function processWebhook() {
  var sendClient = bot.telegram;
  const [userId, msg, platform] = await chiPayment(sendClient);
  if (platform === "Telegram") {
    await sendClient.sendMessage(userId, msg);
  }
}

processWebhook()
bot.launch();
