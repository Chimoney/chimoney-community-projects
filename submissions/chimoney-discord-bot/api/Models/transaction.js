const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  discordSender: {
    type: String,
    required: true,
  },
  discordReceiver: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  isRedeemed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
