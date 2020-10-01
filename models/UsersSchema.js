const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please insert an email"],
    unique: true,
    trim: true,
    match: [
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
      "Please insert a valid email",
    ],
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

// hash password
UserSchema.pre("save", async (next) => {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// setting up jsonwebtoken as a schema method
UserSchema.methods.getSignedJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("UsersSchema", UserSchema);
