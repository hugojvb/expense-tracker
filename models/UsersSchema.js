const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
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
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// setting up jsonwebtoken as a schema method
UserSchema.methods.getSignedJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// validate password
UserSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("UsersSchema", UserSchema);
