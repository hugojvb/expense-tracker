const mongoose = require("mongoose");

const TransactionsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: [true, "Please enter a name for this transaction."],
    trim: true,
    minlenght: 3,
  },
  amount: {
    type: Number,
    unique: false,
    required: [true, "Please enter an amount for this transaction."],
    trim: true,
  },
  date: {
    type: Date,
    unique: false,
    required: [true, "Please enter a date for this transaction."],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("Transactions", TransactionsSchema);
