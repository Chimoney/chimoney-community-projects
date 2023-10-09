const { Telegraf, Markup } = require('telegraf');
const axios = require("axios")
const fs = require("fs")
const express = require('express');


const PORT = 3066;
const token = "";
const bot_url = "https://t.me/chi_amosayomide05_tg_bot"
const api_key = ""
const redirect_url = ""


const bot = new Telegraf(token);
const app = express();



app.get('/confirm', (req, res) => {
    const paymentRef = req.query.issueID;
    const status = req.query.status;

    if (status === "success") {
        const readPayFile = JSON.parse(fs.readFileSync("payments.json", "utf8"));
        var findPay = readPayFile.find(item => item.paymentRef === paymentRef);

        if (findPay) {

            var keyboard = Markup.inlineKeyboard([
                Markup.button.url("Message Me", bot_url + "?start=claim_" + paymentRef)
            ])
            var chatId = findPay.chatId;
            var receiverName = findPay.receiverName;
            var senderName = findPay.senderName;

            bot.telegram.sendMessage(chatId, `@${receiverName} You have received chimoney from @${senderName}, \n\nClick the below link to claim `, keyboard)
        }
    }
    res.redirect(bot_url);
});

app.listen(PORT, () => {
    console.log("http://localhost:3066")
    console.log(`Server is running on port ${PORT}`);
});



bot.start((ctx) => {

    const checkUsers = JSON.parse(fs.readFileSync("users.json", "utf8"));
    var searchUser = checkUsers.find(item => item.firstName === ctx.message.from.first_name);

    if (!searchUser) {
        var user_details = {}
        user_details.firstName = ctx.message.from.first_name;
        user_details.id = ctx.message.from.id;
        user_details.username = ctx.message.from.username;

        checkUsers.push(user_details);
        fs.writeFileSync("users.json", JSON.stringify(checkUsers, null, 2));

    }

    if (ctx.message.text.includes("claim_")) {
        var msg = ctx.message.text;

        var paymentRef = msg.slice(13)

        const readPayFile = JSON.parse(fs.readFileSync("payments.json", "utf8"));


        var findPay = readPayFile.find(item => (item.paymentRef === paymentRef) && (item.receiverName === ctx.message.from.username));

        if (findPay) {

            var redeemLink = "https://dash.chimoney.io/redeem?chiRef=" + findPay.chiRef

            var keyboard = Markup.inlineKeyboard([
                Markup.button.url("Redeem", redeemLink)
            ])

            var msg = `Congrats!!!, You've received $${findPay.amount} from @${findPay.senderName}.\n\nRedeem Now:`;
            ctx.reply(msg, keyboard)
        }
    }


});


bot.on('message', async (ctx) => {

    if (ctx.message.chat.type === "group" || ctx.message.chat.type === "supergroup") {
        if (ctx.message.text.toLowerCase().startsWith('/pay ')) {

            const checkUsers = JSON.parse(fs.readFileSync("users.json", "utf8"));
            var searchUser = checkUsers.find(item => item.firstName === ctx.message.from.first_name);

            if (!searchUser) {
                var keyboard = Markup.inlineKeyboard([
                    Markup.button.url("Message Me", bot_url + "?start=firstMsg")
                ])
                ctx.reply("Please message me first before you can send chimoney to any one", keyboard)
                return
            }
            var find_mentioned_user = ctx.message.entities.find(item => item.type === 'mention');

            if (find_mentioned_user) {
                var offset = find_mentioned_user.offset;
                var length = find_mentioned_user.length;
                var tagged_user = ctx.message.text.slice(6)

                var mentioned_user = tagged_user.substring(0, length - 1)
                var amount = tagged_user.slice(length);
                var msg_from_id = ctx.message.from.id;
                var msg_from_name = ctx.message.from.username;
                var chatId = ctx.message.chat.id;


                if (!isValidInteger(amount)) {
                    ctx.reply("Enter a valid amount");
                    return;
                }

                const config = {
                    method: 'post',
                    url: 'https://api-v2-sandbox.chimoney.io/v0.2/payment/initiate',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Host': 'api-v2-sandbox.chimoney.io',
                        'X-Api-Key': api_key
                    },
                    data: { "valueInUSD": amount, "payerEmail": "amosayomide2005@gmail.com", "redirect_url": redirect_url }
                };

                axios(config)
                    .then(function async(response) {
                        var res = response.data.data

                        var chiRef = res.chiRef
                        var payLink = res.paymentLink
                        var issueDate = res.issueDate
                        var issueID = res.issueID
                        var paymentRef = res.paymentRef


                        var payment_details = {};
                        payment_details.senderName = msg_from_name;
                        payment_details.senderId = msg_from_id;
                        payment_details.amount = amount;
                        payment_details.receiverName = mentioned_user;
                        payment_details.chiRef = chiRef;
                        payment_details.payLink = payLink;
                        payment_details.issueDate = issueDate;
                        payment_details.issueID = chiRef;
                        payment_details.paymentRef = paymentRef;
                        payment_details.chatId = chatId;

                        const readPayFile = JSON.parse(fs.readFileSync("payments.json", "utf8"));
                        readPayFile.push(payment_details);
                        fs.writeFileSync("payments.json", JSON.stringify(readPayFile, null, 2));

                        var msgg = `You are about to pay $${amount} \n\nPay Now`

                        var keyboard = Markup.inlineKeyboard([
                            Markup.button.url("Pay Now", response.data.data.paymentLink)
                        ])


                        bot.telegram.sendMessage(msg_from_id, msgg, keyboard)

                    })
                    .catch(function (error) {
                        console.error('Error:', error);
                    });

            }
            else {
                ctx.reply("Please Mention a user!!")
            }
        }
    }
    else {

        ctx.reply('Sorry, this bot works for only group for now');
    }
});

bot.launch()
