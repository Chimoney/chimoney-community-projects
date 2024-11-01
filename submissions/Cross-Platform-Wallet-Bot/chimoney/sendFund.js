const axios = require("axios");
const fs = require("fs").promises;
require('dotenv').config({ path: '../.env' });


async function sendFund(accChiUid, amount, receiverChiUid, platform, recId) {
    const CHIMONEY_BASE_URL = process.env.CHIMONEY_BASE_URL;

    const url = `${CHIMONEY_BASE_URL}/multicurrency-wallets/transfer`;


    const payload = {
        "sender": accChiUid,
        "amountToSend": amount,
        "originCurrency": "USD",
        "destinationCurrency": "USD",
        "receiver": receiverChiUid
    }
    

    try {
        const walResponse = await axios.post(url, payload, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": process.env.API_KEY,
            },
        });




        const { id, valueInUSD, redeemData, issueID } = walResponse.data.data;

        const transactionData = {
            id,
            amount: amount,
            userId: recId,
            accChiId: "",
            issueID,
            platform: platform
        };

        let existingData = [];
        try {
            const data = await fs.readFile("transaction.json");
            existingData = JSON.parse(data);
        } catch (error) {
            console.log("No existing transaction data found, starting fresh.");
        }

        existingData.push(transactionData);

        await fs.writeFile("transaction.json", JSON.stringify(existingData, null, 2));

        return;
    } catch (error) {
        console.error("Error occurred:", error.response ? error.response.data : error.message);
    throw error; 
    }
}

module.exports = {
    sendFund,
};
