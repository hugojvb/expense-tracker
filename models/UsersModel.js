const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please insert a Username"],
    unique: true,
    trim: true,
    maxlength: [15, "Username cannot be longer than 10 characters"],
  },
  password: {
    type: String,
    required: [true, "Please insert a Username"],
    unique: false,
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
    match: [
      /^[0-9a-zA-Z]{6,}$/,
      "Password can only contain numbers and letters",
    ],
  },
});

module.exports = mongoose.model("UsersModel", UserSchema);
