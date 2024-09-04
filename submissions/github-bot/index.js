const axios = require("axios")
const fs = require("fs");

const PORT = process.env.PORT;
const bot_url = process.env.BOT_URL;
const api_key = process.env.API_KEY;
const redirect_url = process.env.REDIRECT_URL;
const chimoney_base_url = process.env.CHIMONEY_BASE_URL;
const chimoney_base_host = process.env.CHIMONEY_BASE_HOST;
const default_email = process.env.DEFAULT_EMAIL;


const app = express();


(async function () {
    var get_Args = process.argv[2];
    var mentioneduser = get_Args.split(" ")[0]

    var mentioned_user = mentioneduser.slice(1)
    var amount = get_Args.split(" ")[1]

    var get_email = "";

    axios.get(`https://api.github.com/users/${mentioned_user}/events/public`)
        .then(response => response.data)
        .then(events => {
            const commits = [].concat.apply([], events
                .filter(event => event.type === 'PushEvent')
                .map(event => event.payload.commits.map(commit => commit.author.email))
            );
            const uniqueEmails = [...new Set(commits)][0];
        get_email = uniqueEmails;
        })
        .catch(error => console.error(error));

        await sleep(5000)


    if (amount.length === 0) {
        console.log("Please add amount")
        return;
    }

    if (!isValidInteger(amount)) {
        console.log("Invalid amount")
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
            payment_details.amount = amount;
            payment_details.receiverEmail = get_email;
            payment_details.receiverName = mentioned_user;
            payment_details.chiRef = chiRef;
            payment_details.payLink = payLink;
            payment_details.issueDate = issueDate;
            payment_details.issueID = chiRef;
            payment_details.paymentRef = paymentRef;

            const readPayFile = JSON.parse(fs.readFileSync("payments.json", "utf8"));
            readPayFile.push(payment_details);
            await fs.writeFileSync("payments.json", JSON.stringify(readPayFile, null, 2));

            var msgg = `You are about to send $${amount} to @${mentioned_user} Use below link to pay now: ${response.data.data.paymentLink}`;

            console.log(msgg)

        })
        .catch(function (error) {
            console.error('Error:', error);
        });


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
                var receiverEmail = findPay.receiverEmail;
                var amount = findPay.amount;
    
                var redeemLink = "https://dash.chimoney.io/redeem?chiRef=" + findPay.chiRef;

                //Send Email to receiver 
              //I cant do this part because i dont have a server (or vps) to test sending of email
    
            }
        }
        res.redirect(bot_url);
    });
    
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
        console.log(`Server is running on port ${PORT}`);
    });

})();
