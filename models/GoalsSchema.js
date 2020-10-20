const mongoose = require("mongoose");

const GoalsSchema = mongoose.Schema({
  goal: {
    type: Number,
    unique: false,
    required: [true, "Please enter a goal."],
    trim: true,
  },
  date: {
    type: Date,
    unique: false,
    required: [true, "Please enter a date."],
    trim: true,
  },
});

module.exports = mongoose.model("Goals", GoalsSchema);
