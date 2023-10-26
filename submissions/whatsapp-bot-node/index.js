const wppconnect = require("@wppconnect-team/wppconnect");
const express = require("express");
const fs = require("fs");
const axios = require("axios");

//wppconnect.defaultLogger.level = 'error'

async function start() {
    let client = await wppconnect.create({
        session: "chimoney-wa-bot",
        headless: true,
        useChrome: true,
        disableWelcome: true,
        updateLog: false,
        statusFind: (statusSession, session) => {

        }
    })
    return client;
}

const PORT = process.env.PORT;
const token = process.env.TOKEN;
const bot_url = process.env.BOT_URL;
const api_key = process.env.API_KEY;
const redirect_url = process.env.REDIRECT_URL;
const chimoney_base_url = process.env.CHIMONEY_BASE_URL;
const chimoney_base_host = process.env.CHIMONEY_BASE_HOST;
const default_email = process.env.DEFAULT_EMAIL;


const app = express();


(async function () {
    let client = await start();
    console.log("Chimoney Bot is ready!!");


    client.onMessage(async (message) => {
        if (message.type === "chat" && message.isFromTemplate === false && message.body.toLowerCase().startsWith("/chimoney_pay ")) {
            if (message.isGroupMsg) {

                var msg_from_id = message.sender.id;
                var msg_from_name = message.sender.pushname;
                var chatId = message.id;

                if (message.mentionedJidList.length > 1) {
                    await client.sendText(message.from, "You mentioned more than one user!")
                    return;
                }
                if (message.mentionedJidList.length < 1) {
                    await client.sendText(message.from, "Mention at least one user!")
                    return;
                }
                var mentioned_user = message.mentionedJidList[0]

                var mentioned_userlength = mentioned_user.slice(0, -5);
                var mentioned_user_length = mentioned_userlength.length;

                var amount_size = message.body.slice(15)
                var amountt = amount_size.slice(mentioned_user_length)
                var amount = amountt.slice(1)

                if (amount.length === 0) {
                    await client.sendText(message.from, "Please add amount")
                    return;
                }

                if (!isValidInteger(amount)) {
                    await client.sendText(message.from, "Invalid amount")
                    return;
                }

                const config = {
                    method: 'post',
                    url: chimoney_base_url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Host': chimoney_base_host,
                        'X-Api-Key': api_key
                    },
                    data: { "valueInUSD": amount, "payerEmail": default_email, "redirect_url": redirect_url }
                };

                axios(config)
                    .then(async function async(response) {
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
                        await fs.writeFileSync("payments.json", JSON.stringify(readPayFile, null, 2));

                        var msgg = `You are about to send $${amount} to @${mentioned_userlength} \n\nUse below link to pay now: \n\n ${response.data.data.paymentLink}`
                        await client.sendMentioned(message.sender.id, msgg, [`${mentioned_userlength}`])
                        
                    })
                    .catch(function (error) {
                        console.error('Error:', error);
                    });
            }
        }
    })

    function isValidInteger(text) {
        const intValue = parseInt(text, 10)
        if (!isNaN(intValue) && intValue.toString() === text) {
            return true;
        }
        else {
            return false;
        }
    }

    
app.get('/confirm', async (req, res) => {
    const paymentRef = req.query.issueID;
    const status = req.query.status;

    if (status === "success") {
        const readPayFile = JSON.parse(fs.readFileSync("payments.json", "utf8"));
        var findPay = readPayFile.find(item => item.paymentRef === paymentRef);

        if (findPay) {

            var receiverName = findPay.receiverName;
            var amount = findPay.amount;
            var senderName = findPay.senderName;

            var redeemLink = "https://dash.chimoney.io/redeem?chiRef=" + findPay.chiRef

            client.sendText(receiverName, `You have received chimoney ($${amount}) from ${senderName}, \n\nClick the below link to claim ${redeemLink}`)
        }
    }
    res.redirect(bot_url);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
    console.log(`Server is running on port ${PORT}`);
});


})();

