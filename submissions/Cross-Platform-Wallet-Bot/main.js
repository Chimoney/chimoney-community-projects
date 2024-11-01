const { isUserNew, saveNewUser, updateUserAcceptance, getUserInfo, deletePendingRecipient, setUserPendingAction, updateUserBalance, getPendingRecipient, getUserDataByAccountId, savePendingRecipient, checkUserAcceptance, updateUserName } = require('./saver');
require('dotenv').config();
const { createWallet } = require('./chimoney/createWallet');
const fs = require("fs");
const { fundWallet } = require('./chimoney/fundWallet');
const { updateBalance } = require('./chimoney/updateBalance');
const { sendFund } = require('./chimoney/sendFund');


const TOC_URL = process.env.TOC_URL;

const newMessage = async (messageData) => {
  const chatId = messageData.chat_id;

  if (messageData.type === 'fund_wallet') {
    setUserPendingAction(chatId, 'fund_wallet');
    return {
      message: 'Please enter the amount you want to add to your wallet:',
    };
  }



  if (messageData.type === 'send_fund') {
    const user = await getUserData(chatId);

    if (user.balance <= 0) {
      return { message: "You don't have sufficient funds in your wallet to send." };
    }

    await setUserPendingAction(chatId, 'send_fund_account');

    return {
      message: "Please enter the recipient's account number to send funds to:",
    };
  }





  if (messageData.type === 'send_fund_account_input') {
    const recipientAccountId = messageData.msgText;

    if (!isValidAccountNumber(recipientAccountId)) {
      return { message: "Invalid account number. Please enter a 10-digit number." };
    }

    const recipient = await getUserDataByAccountId(recipientAccountId);

    if (!recipient) {
      return { message: "No user found with that account ID. Please try again." };
    }

    await savePendingRecipient(chatId, recipient);

    await setUserPendingAction(chatId, 'send_fund_amount');
    return {
      message: `Recipient found: ${recipient.first_name} ${recipient.last_name}.\nPlease enter the amount to send:`,
    };
  }


  if (messageData.type === 'send_fund_amount_input') {
    const amount = parseFloat(messageData.msgText);
    const platform = messageData.platformType;


    if (isNaN(amount) || amount <= 0) {
      return { message: "Please enter a valid amount to send." };
    }

    const user = await getUserData(chatId);
    var recipient = await getPendingRecipient(chatId);
    var recipient = recipient.recipient;

    if (amount > user.balance) {
      return { message: "You don't have enough balance to send this amount." };
    }

    var recaccChiUid = recipient.accChiUid;
    await sendFund(accChiUid, amount, recaccChiUid, platform, recipient.chatId);
    await updateBalance(chatId);

    await setUserPendingAction(chatId, null);
    await deletePendingRecipient(recipient.chat_id);

    return {
      message: `Successfully sent $${amount} to ${recipient.first_name} ${recipient.last_name}.`,
    };
  }



  if (messageData.type === 'fund_wallet_amount') {
    const amount = parseFloat(messageData.msgText);
    const platform = messageData.platformType;

    if (!/^\d+$/.test(amount) || amount <= 1) {
      return { message: 'Please enter a valid amount to fund your wallet.' };
    }


    var fundingInfo = await getUserInfo(chatId);


    var accChiId = fundingInfo.accChiId;
    var firstName = fundingInfo.first_name;

    setUserPendingAction(chatId, null);
    var payInfo = await fundWallet(accChiId, amount, firstName, chatId, platform);

    return {
      message: `Click the link below to fund your wallet with $${amount}:\n${payInfo.data.paymentLink}`,
    };
  }

  if (messageData.type === 'user_name_input') {
    const uName = messageData.msgText;


    if (!isValidName(uName)) {
      setUserPendingAction(chatId, 'user_name');
      return {
        message: 'Please enter a valid name:',
      };
    }


    await updateUserName(chatId, uName);
    await setUserPendingAction(chatId, null);
    const user = getUserData(chatId);


    return {
      sendButton: true,
      message: `Welcome ${uName}:`,
      title: `${user.first_name} ${user.last_name}\nAccount Number: ${user.accNo}\nCurrent Balance: $${user.balance}`,
      buttons: [
        { type: 'callback', body: 'Fund Wallet', caption: "Fund Wallet", action_name: "fund_wallet" },
        { type: 'callback', body: 'Send Funds', caption: "Send Funds", action_name: "send_fund" }
      ]
    };
  }


  if (messageData.type === 'accept_toc') {
    const userAccepted = checkUserAcceptance(chatId);
    if (!userAccepted) {
      updateUserAcceptance(chatId, true);
      const user = getUserData(chatId);
      await setUserPendingAction(chatId, 'user_name');
      return {
        message: `Thank you for accepting the Terms of Service.\n\n Enter your real name:`
      };
    } else {
      const user = getUserData(chatId);
      return {
        sendButton: true,
        message: `You have already accepted the Terms of Service.\n\nYour balance: $${user.balance}\nName: ${user.first_name} ${user.last_name}`,
        buttons: [
          { type: 'callback', caption: "Send Money", action_name: "fund_wallet" },
          { type: 'callback', caption: "Send Funds", action_name: "send_fund" }
        ]
      };
    }
  }

  if (isUserNew(chatId)) {

    var accChiId = `user_${chatId}`;

    var userWallet = await createWallet(accChiId);

    var accChiUid = userWallet.data.uid;
    var bal = await updateBalance(accChiUid);
    var accNo = generateRandom10DigitNumber();

    saveNewUser({
      chat_id: chatId,
      accChiId: accChiId,
      accChiUid: accChiUid,
      first_name: messageData.msgFromFirstName || '',
      last_name: messageData.msgFromLastName || '',
      username: messageData.msgFromUsername || '',
      platform: messageData.platformType,
      created_at: new Date(),
      accepted_toc: false,
      balance: bal,
      chiId: "",
      accNo: accNo
    });

    if (messageData.canSendButton) {

      const userAccepted = checkUserAcceptance(chatId);
      if (!userAccepted) {
        return {
          sendButton: true,
          title: "Terms of Service",
          buttons: [
            { type: 'url', body: TOC_URL, caption: "View Terms of Service", action_name: "view_toc" },
            { type: 'callback', body: 'Accept ToC', caption: "Accept", action_name: "accept_tos" }
          ]
        };
      }
    }
  }



  const user = getUserData(chatId);


  return {
    sendButton: true,
    title: `Account Summary\n\n${user.first_name} ${user.last_name}\nAccount Number: ${user.accNo}\nCurrent Balance: $${user.balance}`,
    buttons: [
      { type: 'callback', caption: "Fund Wallet", action_name: "fund_wallet" },
      { type: 'callback', caption: "Send Funds", action_name: "send_fund" }
    ]
  };
};

const getUserData = (chatId) => {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  return users[chatId] || {};
};

function isValidName(uName) {
  const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
  return namePattern.test(uName);
}

function generateRandom10DigitNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

function isValidAccountNumber(accountNumber) {
  return /^\d{10}$/.test(accountNumber);
}


module.exports = {
  newMessage,
  getUserData
};
