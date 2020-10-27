const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please insert an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please insert a Username"],
    unique: false,
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
});

// hash password
UsersSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// jwt set up
UsersSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, "saofihqweogivweonhvw", {
    expiresIn: "30d",
  });
};

// validate password
UsersSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", UsersSchema);
